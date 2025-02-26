import { Priority, Status, Task } from "@/types/types";

const departments = [
  "frontend",
  "backend",
  "ui",
  "ux",
  "content",
  "qa",
  "devops",
];

const teams = ["engineering", "design", "marketing", "product", "operations"];

const priorities: Priority[] = ["high", "medium", "low"];
const statuses: Status[] = ["in-progress", "pending", "completed"];

const taskNames = [
  "Implement Authentication Flow",
  "Design Landing Page",
  "Optimize Database Queries",
  "Create User Dashboard",
  "Fix Payment Integration",
  "Update Documentation",
  "Refactor API Endpoints",
  "Implement Dark Mode",
  "Add Analytics Tracking",
  "Create Mobile Responsive Layout",
  "Setup CI/CD Pipeline",
  "Implement Search Functionality",
  "Create User Onboarding Flow",
  "Fix Cross-browser Compatibility",
  "Implement Real-time Notifications",
];

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
}

export function generateMockTasks(count: number): Task[] {
  const tasks: Task[] = [];
  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setMonth(pastDate.getMonth() - 3);
  const futureDate = new Date(now);
  futureDate.setMonth(futureDate.getMonth() + 3);

  for (let i = 0; i < count; i++) {
    const name = getRandomElement(taskNames);
    const createdAt = getRandomDate(pastDate, now);
    const startDate = getRandomDate(createdAt, futureDate);
    const endDate = getRandomDate(startDate, futureDate);

    tasks.push({
      id: `task-${i + 1}`,
      name,
      slug: generateSlug(name),
      description: loremIpsum.substring(
        0,
        Math.floor(Math.random() * 200) + 100
      ),
      priority: getRandomElement(priorities),
      department: getRandomElement(departments),
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      status: getRandomElement(statuses),
      team: getRandomElement(teams),
      createdAt: formatDate(createdAt),
    });
  }

  return tasks;
}
