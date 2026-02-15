export async function logAuthEvent(
  action: 'login' | 'logout' | 'register',
  email: string,
  success: boolean,
  userId?: string,
  name?: string,
  errorMessage?: string
) {
  try {
    await fetch('/api/log_auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        email,
        userId,
        name,
        success,
        errorMessage,
      }),
    })
  } catch (error) {
    console.error('Failed to log auth event:', error)
  }
}