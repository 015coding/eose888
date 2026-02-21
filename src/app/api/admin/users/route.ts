// app/api/admin/users/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import * as userService from '@/service/admin/user.service'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await userService.getUsers()

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST - Add new user
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const newUser = await userService.createUser(body)

    return NextResponse.json(
      { message: 'User created successfully', userId: newUser.id },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// PATCH - Update user role
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, role } = await request.json()

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 400 }
      )
    }

    const updatedUser = await userService.updateUserRole(userId, role)

    return NextResponse.json({
      message: 'User role updated successfully',
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
      },
    })
  } catch (error: any) {
    console.error('Update user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

// DELETE - delete user
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId } = await request.json()

    if (userId === session.user.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    await userService.deleteUser(userId)

    return NextResponse.json({
      message: 'User deleted successfully',
    })
  } catch (error: any) {
    console.error('Delete user error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}