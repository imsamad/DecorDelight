import { PrismaClient } from '@prisma/client';

declare global {
  var prismaClientInstance: PrismaClient;
}

const prismaClient =
  global.prismaClientInstance ||
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV != 'production') {
  global.prismaClientInstance = prismaClient;
}

export { prismaClient as prismaClient };
export * from '@prisma/client';
export * from './log';
