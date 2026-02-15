import connectMongoDB from './mongodb'
import LoginLog from '@/models/LoginLog'

export const loginLogger = {
  // Log Login
  logLogin: async (
    email: string,
    success: boolean,
    userId?: string,
    name?: string,
    errorMessage?: string
  ) => {
    try {
      await connectMongoDB()
      await LoginLog.create({
        userId,
        userEmail: email,
        userName: name,
        action: 'login',
        success,
        errorMessage,
      })
    } catch (error) {
      console.error('Failed to log login:', error)
    }
  },

  // Log Logout
  logLogout: async (userId: string, email: string, name?: string) => {
    try {
      await connectMongoDB()
      await LoginLog.create({
        userId,
        userEmail: email,
        userName: name,
        action: 'logout',
        success: true,
      })
    } catch (error) {
      console.error('Failed to log logout:', error)
    }
  },

  // Log Register
  logRegister: async (email: string, userId?: string, name?: string) => {
    try {
      await connectMongoDB()
      await LoginLog.create({
        userId,
        userEmail: email,
        userName: name,
        action: 'register',
        success: true,
      })
    } catch (error) {
      console.error('Failed to log register:', error)
    }
  },
}