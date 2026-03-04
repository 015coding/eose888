import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NavbarHome from '@/components/NavBarHome'

const { mockPush, mockPathname, mockUseMediaQuery } = vi.hoisted(() => ({
	mockPush: vi.fn(),
	mockPathname: vi.fn(),
	mockUseMediaQuery: vi.fn(),
}))

vi.mock('@mui/material', async () => {
	const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material')
	return {
		...actual,
		useMediaQuery: (...args: unknown[]) => mockUseMediaQuery(...args),
	}
})

vi.mock('next/navigation', () => ({
	useRouter: () => ({ push: mockPush }),
	usePathname: () => mockPathname(),
}))

vi.mock('framer-motion', () => ({
	motion: { button: 'button' },
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('NavbarHome', () => {
	beforeEach(() => {
		mockPush.mockReset()
		mockPathname.mockReturnValue('/')
		mockUseMediaQuery.mockReset()
		mockUseMediaQuery.mockReturnValue(false)
	})

	it('navigates to login when clicking Sign In button', async () => {
		const user = userEvent.setup()

		render(<NavbarHome />)

		await user.click(screen.getByRole('button', { name: 'Sign In' }))

		expect(mockPush).toHaveBeenCalledWith('/login')
	})

    it('navigates to register when clicking Sign Up button', async () => {
        const user = userEvent.setup()
        
        render(<NavbarHome />)

        await user.click(screen.getByRole('button', { name: 'Get Started' }))
        
        expect(mockPush).toHaveBeenCalledWith('/register')
    
    })

    it('navigates to about when clicking About link', async () => {
        const user = userEvent.setup()

        render(<NavbarHome/>)

        await user.click(screen.getByRole('button', {name : 'About'}))

        expect(mockPush).toHaveBeenCalledWith('/about')

    })


})


