import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient;
}

const prismaClient =
  global.prismaClient ||
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV != "production") {
  global.prismaClient = prismaClient;
}

export { prismaClient as prismaClient };
export * from "@prisma/client";
