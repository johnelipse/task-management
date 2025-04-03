// import { db } from "./db";
// // import bcrypt from "bcrypt";

// // Get current year for password generation
// // const currentYear = new Date().getFullYear();

// // Define all possible permissions
// const allPermissions = [
//   "dashboard.create",
//   "dashboard.read",
//   "dashboard.update",
//   "dashboard.delete",

//   "users.create",
//   "users.read",
//   "users.update",
//   "users.delete",

//   "roles.create",
//   "roles.read",
//   "roles.update",
//   "roles.delete",

//   "sales.create",
//   "sales.read",
//   "sales.update",
//   "sales.delete",

//   "customers.create",
//   "customers.read",
//   "customers.update",
//   "customers.delete",

//   "orders.create",
//   "orders.read",
//   "orders.update",
//   "orders.delete",

//   "reports.create",
//   "reports.read",
//   "reports.update",
//   "reports.delete",

//   "settings.create",
//   "settings.read",
//   "settings.update",
//   "settings.delete",

//   "categories.create",
//   "categories.read",
//   "categories.update",
//   "categories.delete",

//   "products.create",
//   "products.read",
//   "products.update",
//   "products.delete",

//   "blogs.create",
//   "blogs.read",
//   "blogs.update",
//   "blogs.delete",
// ];

// // Define user role permissions (basic access)
// const userPermissions = [
//   "dashboard.read",
//   "profile.read",
//   "profile.update",
//   "products.read",
//   "orders.read",
//   "orders.create",
// ];
// async function cleanDatabase() {
//   console.log("Cleaning up existing data...");
//   try {
//     // Use a transaction to ensure data consistency
//     await db.$transaction(async (tx) => {
//       // Get all users
//       const users = await tx.user.findMany({
//         // include: {
//         //   roles: true,
//         // },
//       });
//       // Disconnect all roles from users
//       for (const user of users) {
//         if (user.role) {
//           await tx.user.update({
//             where: { id: user.id },
//             data: {
//               // roles: {
//               //   disconnect: user.roles.map((role) => ({ id: role.id })),
//               // },
//             },
//           });
//         }
//       }

//       // Delete all sessions first (if you have them)
//       await tx.session.deleteMany({});

//       // Delete all accounts (if you have them)
//       await tx.account.deleteMany({});

//       // Delete all Blogs and Blog cats (if you have them)
//       // await tx.blog.deleteMany({});
//       // await tx.blogCategory.deleteMany({});

//       // Delete all Savings and Categories  (if you have them)
//       // await tx.saving.deleteMany({});
//       // await tx.category.deleteMany({});

//       // Now safely delete all users
//       const deleteUsers = await tx.user.deleteMany({});
//       console.log("Deleted users:", deleteUsers.count);

//       // Finally delete all roles
//       // const deleteRoles = await tx.role.deleteMany({});
//       // console.log("Deleted roles:", deleteRoles.count);
//     });

//     console.log("Database cleanup completed.");
//   } catch (error) {
//     console.error("Error during cleanup:", error);
//     throw error;
//   }
// }

// async function seedDatabase() {
//   try {
//     console.log("Starting to seed new data...");

//     // Create admin role with all permissions
//     console.log("Creating admin role...");
//     // const adminRole = await db.role.create({
//     //   data: {
//     //     displayName: "Administrator",
//     //     roleName: "admin",
//     //     description: "Full system access",
//     //     permissions: allPermissions,
//     //   },
//     // });

//     // Create user role with limited permissions
//     console.log("Creating user role...");
//     // const userRole = await db.role.create({
//     //   data: {
//     //     displayName: "User",
//     //     roleName: "user",
//     //     description: "Basic user access",
//     //     permissions: userPermissions,
//     //   },
//     // });

//     // Create admin user
//     console.log("Creating admin user...");
//     const adminPassword = `Admin@2025`;
//     // const hashedPassword = await bcrypt.hash("Admin@2025", 10); // Use async hash

//     const adminUser = await db.user.create({
//       data: {
//         email: "admin@admin.com",
//         name: "System Admin",
//         firstName: "System",
//         lastName: "Admin",
//         phone: "1234567890",
//         password: adminPassword,
//         role: "ADMIN",
//         // roles: {
//         //   connect: { id: adminRole.id },
//         // },
//       },
//     });

//     // Create regular user
//     console.log("Creating regular user...");
//     const userPassword = `User@2025`;
//     // const hashedUserPassword = await bcrypt.hashSync(userPassword, 10);

//     const regularUser = await db.user.create({
//       data: {
//         email: "user@user.com",
//         name: "Regular User",
//         firstName: "Regular",
//         lastName: "User",
//         phone: "0987654321",
//         password: userPassword,
//         role: "USER",
//         // role: {
//         //   connect: { id: userRole.id },
//         // },
//       },
//     });

//     console.log("Seed completed successfully!");
//     console.log("Admin credentials:", {
//       email: "admin@admin.com",
//       password: adminPassword,
//     });
//     console.log("User credentials:", {
//       email: "user@user.com",
//       password: userPassword,
//     });
//   } catch (error) {
//     console.error("Error during seeding:", error);
//     throw error;
//   }
// }
// async function main() {
//   console.log("Starting database seed process...");

//   try {
//     // First clean up existing data
//     await cleanDatabase();

//     // Then seed new data
//     await seedDatabase();

//     console.log("Database seeding completed successfully!");
//   } catch (error) {
//     console.error("Error in main seed process:", error);
//     throw error;
//   }
// }

// main()
//   .catch((e) => {
//     console.error("Failed to seed database:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });

import {
  PrismaClient,
  StatusTypes,
  Visibility,
  UserRole,
} from "@prisma/client";
import { hash } from "bcrypt";
import { db } from "./db";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Use a transaction for the entire seeding process
  await db.$transaction(
    async (tx) => {
      // Clean up existing data (in reverse order of dependencies)
      console.log("Cleaning up existing data...");
      await tx.task.deleteMany({});
      await tx.member.deleteMany({}); // Assuming Member model exists based on the Board model reference
      await tx.board.deleteMany({});
      await tx.workspace.deleteMany({});
      await tx.session.deleteMany({});
      await tx.account.deleteMany({});
      await tx.user.deleteMany({});

      console.log("Creating new seed data...");
      const hashedPassword = await hash("Login@2025", 10);
      const users = [
        {
          name: "John Doe",
          firstName: "John",
          lastName: "Doe",
          phone: "1234567890",
          email: "john.doe@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Jane Smith",
          firstName: "Jane",
          lastName: "Smith",
          phone: "9876543210",
          email: "jane.smith@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Alice Johnson",
          firstName: "Alice",
          lastName: "Johnson",
          phone: "1122334455",
          email: "alice.johnson@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Bob Williams",
          firstName: "Bob",
          lastName: "Williams",
          phone: "9988776655",
          email: "bob.williams@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Charlie Brown",
          firstName: "Charlie",
          lastName: "Brown",
          phone: "4455667788",
          email: "charlie.brown@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          id: "cuid6",
          name: "David Miller",
          firstName: "David",
          lastName: "Miller",
          phone: "5566778899",
          email: "david.miller@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Emily Clark",
          firstName: "Emily",
          lastName: "Clark",
          phone: "6677889900",
          email: "emily.clark@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Frank Evans",
          firstName: "Frank",
          lastName: "Evans",
          phone: "7788990011",
          email: "frank.evans@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Grace Hall",
          firstName: "Grace",
          lastName: "Hall",
          phone: "8899001122",
          email: "grace.hall@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
        {
          name: "Henry Adams",
          firstName: "Henry",
          lastName: "Adams",
          phone: "9900112233",
          email: "henry.adams@example.com",
          emailVerified: null,
          image: "https://example.com/henry.jpg",
          jobTitle: "Product Manager",
          role: UserRole.USER,
          password: hashedPassword,
          status: true,
          isVerfied: true,
          token: null,
          WorkspaceIds: [],
        },
      ];
      for (const user of users) {
        await db.user.upsert({
          where: { email: user.email },
          update: {},
          create: user,
        });
      }

      // Create workspaces for each user
      const workspaces = [];
      for (const user of users) {
        if (!user.id) {
          throw new Error(`User ${user.name} has no ID`);
        }
        const workspace = await tx.workspace.create({
          data: {
            name: `Workspace for ${user.name}`,
            description: `This is the workspace for ${user.name}`,
            ownerId: user.id,
            themeColor: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"][
              Math.floor(Math.random() * 5)
            ],
            visibility:
              Math.random() > 0.5 ? Visibility.public : Visibility.private,
          },
        });

        // Update user's WorkspaceIds array
        await tx.user.update({
          where: { id: user.id },
          data: {
            WorkspaceIds: [workspace.id],
          },
        });

        workspaces.push(workspace);
        console.log(`Created workspace: ${workspace.name}`);

        // Create 10 boards for each workspace
        for (let j = 1; j <= 10; j++) {
          const boardName = `Board ${j} for ${user.name}`;
          const board = await tx.board.create({
            data: {
              name: boardName,
              slug: `board-${j}-${user.id}`.toLowerCase().replace(/\s+/g, "-"),
              description: `Description for board ${j} in workspace for ${user.name}`,
              workspaceId: workspace.id,
            },
          });

          console.log(`Created board: ${board.name}`);

          // Create 5 tasks for each board
          const priorities = ["Low", "Medium", "High", "Critical"];
          const statuses = [
            StatusTypes.Pending,
            StatusTypes.Inprogress,
            StatusTypes.Completed,
          ];

          for (let k = 1; k <= 5; k++) {
            const startDate = new Date();
            startDate.setDate(
              startDate.getDate() + Math.floor(Math.random() * 10)
            );

            const endDate = new Date(startDate);
            endDate.setDate(
              endDate.getDate() + Math.floor(Math.random() * 30) + 1
            );

            const task = await tx.task.create({
              data: {
                taskName: `Task ${k} for ${boardName}`,
                priority:
                  priorities[Math.floor(Math.random() * priorities.length)],
                startDate: startDate.toISOString().split("T")[0],
                endDate: endDate.toISOString().split("T")[0],
                status: statuses[Math.floor(Math.random() * statuses.length)],
                boardId: board.id,
              },
            });

            console.log(`Created task: ${task.taskName}`);
          }
        }
      }
    },
    {
      // Transaction options - this timeout should be generous enough for all operations
      timeout: 60000, // 60 seconds
      isolationLevel: "Serializable", // Highest isolation level
    }
  );

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
