import { PrismaClient } from '@prisma/client';

declare global {
  var prismaInstance: PrismaClient;
}

const prismaClient =
  global.prismaInstance ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV != 'production') {
  global.prismaInstance = prismaClient;
}

export { prismaClient as prismaClient };
export * from '@prisma/client';
export * from './log';
