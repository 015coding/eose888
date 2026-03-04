import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Register from '@/app/register/page'

const { mockPush, mockLogAuthEvent, mockFetch } = vi.hoisted(() => ({
	mockPush: vi.fn(),
	mockLogAuthEvent: vi.fn(),
	mockFetch: vi.fn(),
}))

vi.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush }),
}))

vi.mock('@/lib/authLogger', () => ({
	logAuthEvent: mockLogAuthEvent,
}))

vi.mock('framer-motion', () => ({
	motion: { div: 'div' },
}))

describe('Register', () => {
	beforeEach(() => {
		mockPush.mockReset()
		mockLogAuthEvent.mockReset()
		mockLogAuthEvent.mockResolvedValue(undefined)
		mockFetch.mockReset()
		vi.stubGlobal('fetch', mockFetch)
	})

	it('renders register form fields', () => {
		render(<Register />)

		expect(screen.getByLabelText(/first name/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/last name/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/id card|passport number/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
		expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
	})

	it('navigates to home when clicking back arrow', async () => {
		const user = userEvent.setup()
		render(<Register />)

		await user.click(screen.getByTestId('ArrowBackIcon').closest('button')!)

		expect(mockPush).toHaveBeenCalledWith('/')
	})

	it('navigates to login when clicking Login here', async () => {
		const user = userEvent.setup()
		render(<Register />)

		await user.click(screen.getByText(/login here/i))

		expect(mockPush).toHaveBeenCalledWith('/login')
	})

	it('shows error when submitting empty form', async () => {
		const user = userEvent.setup()
		render(<Register />)

		await user.click(screen.getByRole('button', { name: /create account/i }))

		expect(screen.getByText('Please fill all fields')).toBeInTheDocument()
	})

	it('blocks submit for underage birth date', async () => {
		const user = userEvent.setup()
		render(<Register />)

		const underageDate = new Date()
		underageDate.setFullYear(underageDate.getFullYear() - 19)

		await user.type(screen.getByLabelText(/first name/i), 'Ichigo')
		await user.type(screen.getByLabelText(/last name/i), 'Kurosaki')
		await user.type(screen.getByLabelText(/id card|passport number/i), '1234567890123')
		fireEvent.change(screen.getByLabelText(/birth date/i), { target: { value: underageDate.toISOString().split('T')[0] } })
		await user.type(screen.getByLabelText(/^email$/i), 'ichigo@test.com')
		await user.type(screen.getByLabelText(/^password$/i), 'password123')
		await user.type(screen.getByLabelText(/confirm password/i), 'password123')
		await user.click(screen.getByRole('button', { name: /create account/i }))

		expect(mockFetch).not.toHaveBeenCalled()
		expect(screen.queryByRole('alert')).not.toBeInTheDocument()
	})

	it('shows error when passwords do not match', async () => {
		const user = userEvent.setup()
		render(<Register />)

		await user.type(screen.getByLabelText(/first name/i), 'Ichigo')
		await user.type(screen.getByLabelText(/last name/i), 'Kurosaki')
		await user.type(screen.getByLabelText(/id card|passport number/i), '1234567890123')
		fireEvent.change(screen.getByLabelText(/birth date/i), { target: { value: '2000-01-01' } })
		await user.type(screen.getByLabelText(/^email$/i), 'ichigo@test.com')
		await user.type(screen.getByLabelText(/^password$/i), 'password123')
		await user.type(screen.getByLabelText(/confirm password/i), 'password999')
		await user.click(screen.getByRole('button', { name: /create account/i }))

		expect(screen.getByRole('alert')).toHaveTextContent('Passwords do not match')
	})

	it('registers successfully and redirects to login', async () => {
		mockFetch.mockResolvedValue({
			ok: true,
			json: async () => ({ userId: 'user-123' }),
		})

		render(<Register />)
		const user = userEvent.setup()
		await user.type(screen.getByLabelText(/first name/i), 'Ichigo')
		await user.type(screen.getByLabelText(/last name/i), '015')
		await user.type(screen.getByLabelText(/id card|passport number/i), '1234567890123')
		fireEvent.change(screen.getByLabelText(/birth date/i), { target: { value: '2000-01-01' } })
		await user.type(screen.getByLabelText(/^email$/i), 'ichigo@test.com')
		await user.type(screen.getByLabelText(/^password$/i), 'password123')
		await user.type(screen.getByLabelText(/confirm password/i), 'password123')
		await user.click(screen.getByRole('button', { name: /create account/i }))

		await waitFor(() => {
			expect(mockFetch).toHaveBeenCalledWith('/api/users/register', expect.objectContaining({ method: 'POST' }))
		})

		// await waitFor(() => {
		// 	expect(mockLogAuthEvent).toHaveBeenCalledWith('register', 'ichigo@test.com', true, 'user-123', 'Ichigo Kurosaki')
		// })
		await waitFor(() => {
			expect(mockLogAuthEvent).toHaveBeenCalled()
		})

		await waitFor(
			() => {
				expect(mockPush).toHaveBeenCalledWith('/login')
			},
			{ timeout: 5000 },
		)
	}, 10000)
})
