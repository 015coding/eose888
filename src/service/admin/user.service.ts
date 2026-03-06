// src/service/admin/user.service.ts
import { prisma } from '@/lib/prisma'
import { prismaApp } from '@/lib/prismaApp'
import bcrypt from 'bcrypt'
import { Role } from '@prisma/client'

function parseRole(role?: string): Role {
  if (!role) return Role.USER

  const normalizedRole = role.toUpperCase()
  if (normalizedRole === Role.USER || normalizedRole === Role.ADMIN) {
    return normalizedRole as Role
  }

  throw new Error('Invalid role. Allowed values are USER or ADMIN')
}

export async function getUsers(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit
  const [users, totalUsers] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count(),
  ])
  return { users, totalUsers }
}

export async function createUser(data: any) {
  const { name, email, password, role } = data

  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const parsedRole = parseRole(role)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: parsedRole,
    },
  })

  return newUser
}

export async function updateUserRole(userId: string, role: string) {
  if (!userId || !role) {
    throw new Error('User ID and role are required')
  }

  const parsedRole = parseRole(role)

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: parsedRole },
  })

  return updatedUser
}

export async function deleteUser(userId: string) {
  if (!userId) {
    throw new Error('User ID is required')
  }

  try {
    await prismaApp.$transaction(async (tx) => {
      const bankAccounts = await tx.bankAccount.findMany({
        where: { userId },
        select: { id: true },
      })

      const accountIds = bankAccounts.map((acc) => acc.id)
      if (accountIds.length > 0) {
        await tx.accountLog.deleteMany({
          where: { accountId: { in: accountIds } },
        })
      }

      if (accountIds.length > 0) {
        await tx.transferTransaction.deleteMany({
          where: {
            OR: [
              { fromAccountId: { in: accountIds } },
              { toAccountId: { in: accountIds } },
            ],
          },
        })
      }
      await tx.bankAccount.deleteMany({
        where: { userId },
      })
      await tx.holding.deleteMany({
        where: { userId },
      })
      await tx.transactionStock.deleteMany({
        where: { userId },
      })

      await tx.pinnedStock.deleteMany({
        where: { userId },
      })

      await tx.user.delete({
        where: { id: userId },
      })
    })

    console.log('User and all related data deleted from Trading DB')
  } catch (err: any) {
    if (err.code !== 'P2025') {
      console.error('Trading DB deletion error:', err.message)
    }
    // If the user doesn't exist in prismaApp, it's not a critical error, so we can continue.
  }

  await prisma.user.delete({
    where: { id: userId },
  })
}
