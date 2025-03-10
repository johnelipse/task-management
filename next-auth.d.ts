// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import { Role } from "@prisma/client";
import { EnumValues } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
      role: "USER" | "ADMIN" | "SERVICE_PROVIDER";
      // permissions: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: "USER" | "ADMIN" | "SERVICE_PROVIDER";
    // permissions: string[];
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    role: "USER" | "ADMIN" | "SERVICE_PROVIDER";
    permissions: string[];
  }
}
