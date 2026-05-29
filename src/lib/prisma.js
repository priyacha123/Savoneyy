import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.meta.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}