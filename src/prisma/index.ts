import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString,
  max: process.env.DB_POOL_SIZE ? parseInt(process.env.DB_POOL_SIZE) : 10,
  idleTimeoutMillis: 30000,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const logConfig =
  process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"];

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: logConfig as any,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
