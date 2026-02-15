import { PrismaClient } from '@/lib/generated/prismaApp'

const globalForPrismaApp = global as unknown as { 
  prismaApp: PrismaClient 
}

export const prismaApp = 
  globalForPrismaApp.prismaApp || 
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrismaApp.prismaApp = prismaApp
}