import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Login from '@/app/login/page'

const { mockPush, mockSignIn, mockGetSession, mockLogAuthEvent } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockSignIn: vi.fn(),
  mockGetSession: vi.fn(),
  mockLogAuthEvent: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

vi.mock('next-auth/react', () => ({
  signIn: mockSignIn,
  getSession: mockGetSession,
}))

vi.mock('@/lib/authLogger', () => ({
  logAuthEvent: mockLogAuthEvent,
}))

describe('Login', () => {
  beforeEach(() => {
    mockPush.mockReset()
    mockSignIn.mockReset()
    mockGetSession.mockReset()
    mockLogAuthEvent.mockResolvedValue(undefined)
  })

  it('renders form correctly', () => {
    render(<Login />)
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('navigates to home when clicking logo', async () => {
    const user = userEvent.setup()
    render(<Login />)
    await user.click(screen.getByText('Eose', { exact: false }))
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('navigates to home when clicking back arrow', async () => {
    const user = userEvent.setup()
    render(<Login />)
    await user.click(screen.getByTestId('ArrowBackIcon').closest('button')!)
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('navigates to register when clicking Create an account', async () => {
    const user = userEvent.setup()
    render(<Login />)
    await user.click(screen.getByText(/create an account/i))
    expect(mockPush).toHaveBeenCalledWith('/register')
  })

  it('shows error when submitting empty fields', async () => {
    const user = userEvent.setup()
    render(<Login />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Please fill all fields')).toBeInTheDocument()
  })

  it('shows error when email only', async () => {
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'test@test.com')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Please fill all fields')).toBeInTheDocument()
  })

  it('login failed → shows invalid email or password', async () => {
    mockSignIn.mockResolvedValue({ error: 'Invalid credentials' })
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'test@test.com')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    })
  })

  it('login success as ADMIN → navigates to /admin/dashboard', async () => {
    mockSignIn.mockResolvedValue({ error: null })
    mockGetSession.mockResolvedValue({ user: { role: 'ADMIN' } })
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'admin@test.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin/dashboard')
    })
  })

  it('login success as USER → navigates to /favstock', async () => {
    mockSignIn.mockResolvedValue({ error: null })
    mockGetSession.mockResolvedValue({ user: { role: 'USER' } })
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'user@test.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/favstock')
    })
  })

  it('shows Signing in... while loading', async () => {
    mockSignIn.mockImplementation(() => new Promise(() => {})) // ไม่ resolve เพื่อค้าง loading
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'test@test.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/signing in/i)).toBeInTheDocument()
  })

  it('shows error when something went wrong', async () => {
    mockSignIn.mockRejectedValue(new Error('Network error'))
    const user = userEvent.setup()
    render(<Login />)
    await user.type(screen.getByLabelText(/email address/i), 'test@test.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })

  it('toggles password visibility', async () => {
    const user = userEvent.setup()
    render(<Login />)
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
    await user.click(screen.getByTestId('VisibilityIcon').closest('button')!)
    expect(passwordInput).toHaveAttribute('type', 'text')
  })
})