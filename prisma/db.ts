import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db =
  globalThis.prisma ||
  new PrismaClient({
    transactionOptions: {
      maxWait: 5000, // default: 2000
      timeout: 30000, // default: 5000
    },
  });
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
