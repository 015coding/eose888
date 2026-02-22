import {prisma as prisma_login} from '../../lib/prisma';
import bcrypt from 'bcrypt';

export const resetPassword = async (
    email: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await prisma_login.user.findUnique({
        where: { email },
    });

    if (!user || !user.password) {
        throw new Error('User not found');
    }

    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordCorrect) {
        throw new Error('Current password is incorrect');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        throw new Error('New password must be different from current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma_login.user.update({
        where: { email },
        data: {
            password: hashedPassword,
        },
    });

    return { message: 'Password updated successfully' };
};


