import mongoose, { Schema, models, Model } from 'mongoose'

export interface ILoginLog {
  userId?: string
  userEmail: string
  userName?: string
  action: 'login' | 'logout' | 'login_failed' | 'register'
  success: boolean
  errorMessage?: string
  createdAt?: Date
}

const LoginLogSchema = new Schema<ILoginLog>({
  userId: { type: String, index: true },
  userEmail: { type: String, required: true, index: true },
  userName: { type: String },
  action: {
    type: String,
    enum: ['login', 'logout', 'login_failed', 'register'],
    required: true,
    index: true,
  },
  success: { type: Boolean, required: true, index: true },
  errorMessage: { type: String },
  createdAt: { type: Date, default: Date.now, index: true },
})

LoginLogSchema.index({ userId: 1, createdAt: -1 })
LoginLogSchema.index({ action: 1, success: 1 })

const LoginLog: Model<ILoginLog> =
  models.LoginLog || mongoose.model('LoginLog', LoginLogSchema)

export default LoginLog