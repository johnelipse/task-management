import { StatusTypes, UserRole, Visibility } from "@prisma/client";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { db } from "./db";

async function main() {
  console.log("Starting seeding...");

  try {
    // Execute all database operations in a transaction
    await db.$transaction(async (tx) => {
      //first empty the db
      await deleteAllData(tx);

      // Create users
      const users = await createUsers(tx);

      // Create workspaces
      const workspaces = await createWorkspaces(tx, users);

      // Create boards
      const boards = await createBoards(tx, workspaces);

      // Create tasks
      await createTasks(tx, boards);

      // Create invitations
      // await createInvitations(tx, workspaces);

      console.log("Transaction completed successfully!");
    });

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

interface UserData {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  jobTitle: string;
}

interface CommonUserFields {
  emailVerified: Date;
  image: string;
  role: UserRole;
  password: string;
  status: boolean;
  isVerfied: boolean;
  token: string;
  WorkspaceIds: string[];
}

async function createUsers(
  tx: any
): Promise<Array<UserData & CommonUserFields & { id: string }>> {
  console.log("Creating users...");

  const users = [];

  // Create admin user
  const adminPassword = await hash("Admin123!", 10);
  const admin = await tx.user.create({
    data: {
      name: "John Admin",
      firstName: "John",
      lastName: "Admin",
      phone: "+1234567890",
      email: "admin@example.com",
      emailVerified: new Date(),
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      jobTitle: "System Administrator",
      role: UserRole.ADMIN,
      password: adminPassword,
      status: true,
      isVerfied: true,
      token: randomUUID(),
      WorkspaceIds: [],
    },
  });
  users.push(admin);

  // Create regular users
  const regularUserData: UserData[] = [
    {
      name: "Sarah Johnson",
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "+1987654321",
      email: "sarah@example.com",
      jobTitle: "Project Manager",
    },
    {
      name: "Michael Chen",
      firstName: "Michael",
      lastName: "Chen",
      phone: "+1122334455",
      email: "michael@example.com",
      jobTitle: "Senior Developer",
    },
    {
      name: "Emily Rodriguez",
      firstName: "Emily",
      lastName: "Rodriguez",
      phone: "+1555666777",
      email: "emily@example.com",
      jobTitle: "UX Designer",
    },
    {
      name: "David Kim",
      firstName: "David",
      lastName: "Kim",
      phone: "+1888999000",
      email: "david@example.com",
      jobTitle: "Product Owner",
    },
  ];

  const password = await hash("User@2025", 10);

  for (const userData of regularUserData) {
    const user = await tx.user.create({
      data: {
        ...userData,
        emailVerified: new Date(),
        image: `https://hrty.vercel.app/gOh0Am`,
        role: UserRole.USER,
        password: password,
        status: true,
        isVerfied: true,
        token: randomUUID(),
        WorkspaceIds: [],
      },
    });
    users.push(user);
  }

  console.log(`Created ${users.length} users`);
  return users;
}

async function deleteAllData(tx: any) {
  console.log("Deleting the existing data...");

  await tx.user.deleteMany({});
  console.log("deleted the users");

  await tx.workspace.deleteMany({});
  console.log("deleted the workspaces");

  await tx.board.deleteMany({});
  console.log("deleted the boards");

  await tx.task.deleteMany({});
  console.log("deleted the tasks");
}

async function createWorkspaces(
  tx: any,
  users: Array<UserData & CommonUserFields & { id: string }>
) {
  console.log("Creating workspaces...");

  const workspaces = [];
  const workspaceData = [
    {
      name: "Marketing Team",
      description: "Workspace for all marketing related projects and tasks",
      themeColor: "#FF5733",
      visibility: Visibility.private,
      ownerId: users[0].id,
    },
    {
      name: "Development Team",
      description: "Workspace for software development projects",
      themeColor: "#33A1FF",
      visibility: Visibility.private,
      ownerId: users[1].id,
    },
    {
      name: "Design Team",
      description: "Workspace for design projects and assets",
      themeColor: "#33FF57",
      visibility: Visibility.public,
      ownerId: users[2].id,
    },
    {
      name: "Product Team",
      description: "Workspace for product planning and roadmap",
      themeColor: "#F3FF33",
      visibility: Visibility.private,
      ownerId: users[3].id,
    },
  ];

  for (const [index, data] of workspaceData.entries()) {
    const workspace = await tx.workspace.create({
      data,
    });

    // Update the owner's WorkspaceIds
    await tx.user.update({
      where: { id: data.ownerId },
      data: {
        WorkspaceIds: {
          push: workspace.id,
        },
      },
    });

    // Add other users to some workspaces
    if (index < 2) {
      for (const user of users) {
        if (user.id !== data.ownerId) {
          await tx.user.update({
            where: { id: user.id },
            data: {
              WorkspaceIds: {
                push: workspace.id,
              },
            },
          });
        }
      }
    }

    workspaces.push(workspace);
  }

  console.log(`Created ${workspaces.length} workspaces`);
  return workspaces;
}

async function createBoards(tx: any, workspaces: Array<{ id: string }>) {
  console.log("Creating boards...");

  const boards = [];

  // Different board data for each workspace
  const workspaceBoardsData = [
    // Marketing Team boards
    [
      {
        name: "Campaign Planning",
        slug: "campaign-planning",
        description: "Plan marketing campaigns and content calendar",
        workspaceId: "",
      },
      {
        name: "Content Creation",
        slug: "content-creation",
        description:
          "Track content creation progress for blogs and social media",
        workspaceId: "",
      },
      {
        name: "Analytics Dashboard",
        slug: "analytics-dashboard",
        description: "Track marketing metrics and KPIs",
        workspaceId: "",
      },
    ],
    // Development Team boards
    [
      {
        name: "Sprint Planning",
        slug: "sprint-planning",
        description: "Plan current sprint tasks and assignments",
        workspaceId: "",
      },
      {
        name: "Bug Tracker",
        slug: "bug-tracker",
        description: "Track and prioritize software bugs",
        workspaceId: "",
      },
      {
        name: "Feature Development",
        slug: "feature-development",
        description: "Track progress on new feature development",
        workspaceId: "",
      },
    ],
    // Design Team boards
    [
      {
        name: "UI Components",
        slug: "ui-components",
        description: "Design and track UI component library",
        workspaceId: "",
      },
      {
        name: "User Research",
        slug: "user-research",
        description: "Organize and track user research projects",
        workspaceId: "",
      },
      {
        name: "Design System",
        slug: "design-system",
        description: "Maintain and update design system assets",
        workspaceId: "",
      },
    ],
    // Product Team boards
    [
      {
        name: "Roadmap",
        slug: "product-roadmap",
        description: "Product roadmap and feature prioritization",
        workspaceId: "",
      },
      {
        name: "Customer Feedback",
        slug: "customer-feedback",
        description: "Track and prioritize customer feedback items",
        workspaceId: "",
      },
      {
        name: "Release Planning",
        slug: "release-planning",
        description: "Plan and track product releases",
        workspaceId: "",
      },
    ],
  ];

  for (const [index, workspace] of workspaces.entries()) {
    // Get the appropriate board data for this workspace (or use default if index is out of bounds)
    const boardsData =
      index < workspaceBoardsData.length
        ? workspaceBoardsData[index]
        : workspaceBoardsData[0];

    for (const data of boardsData) {
      // Set the workspace ID
      data.workspaceId = workspace.id;

      // Create the board
      const board = await tx.board.create({
        data,
      });
      boards.push(board);
    }
  }

  console.log(`Created ${boards.length} boards`);
  return boards;
}

async function createTasks(
  tx: any,
  boards: Array<{ id: string; name: string }>
) {
  console.log("Creating tasks...");

  const priorities = ["High", "Medium", "Low"];
  const taskCount = [];

  for (const board of boards) {
    const tasksToCreate = Math.floor(Math.random() * 5) + 3; // 3-7 tasks per board

    for (let i = 0; i < tasksToCreate; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7)); // Start within a week

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 1); // End 1-14 days after start

      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const status =
        Object.values(StatusTypes)[
          Math.floor(Math.random() * Object.values(StatusTypes).length)
        ];

      await tx.task.create({
        data: {
          taskName: `Task ${i + 1} for ${board.name}`,
          priority,
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          status,
          boardId: board.id,
        },
      });

      taskCount.push(1);
    }
  }

  console.log(`Created ${taskCount.length} tasks`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
