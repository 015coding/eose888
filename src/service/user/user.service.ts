import { prisma as prisma_login } from '@/lib/prisma';
import { prismaApp as prisma_yok } from '@/lib/prismaApp';
import { Currency } from '@/lib/generated/prismaApp';
import bcrypt from 'bcrypt';

const toUsernameSlug = (value: string) =>
    value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-_]/g, '');

export const countUsers = async () => {
    const count = await prisma_login.user.count();
    return count;
};

export const getAllBalances = async () => {
    const [USD, THB] = await Promise.all([
        prisma_yok.bankAccount.aggregate({
            where: {
                currency: Currency.USD,
            },
            _sum: {
                balance: true,
            },
        }),
        prisma_yok.bankAccount.aggregate({
            where: {
                currency: Currency.THB,
            },
            _sum: {
                balance: true,
            },
        }),
    ]);

    return {
        USD: USD._sum.balance ?? 0,
        THB: THB._sum.balance ?? 0,
    };
};

export const findUserBalance = async (userId: string) => {
    const balance = await prisma_yok.bankAccount.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
        },
    });

    return balance;
};

export const getAllTransactionsLog = async (page: number = 1, limit: number = 10) => {
    const offset = (page - 1) * limit;
    const [transactions, totalCount] = await Promise.all([
        prisma_yok.accountLog.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                type: true,
                amount: true,
                createdAt: true,
            },
        }),
        prisma_yok.accountLog.count(),
    ]);

    return {
        data: transactions,
        meta: {
            total: totalCount,
            page,
            limit,
            totalPage: Math.ceil(totalCount / limit),
        },
    };
};

const toLocalDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const getDailyTransactionVolume = async (days: number = 7) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    const volumeByDate: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        volumeByDate[toLocalDateString(d)] = 0;
    }

    const transactions = await prisma_yok.accountLog.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: today,
            },
        },
        select: {
            createdAt: true,
            amount: true,
        },
    });

    transactions.forEach((tx) => {
        const dateString = toLocalDateString(tx.createdAt);
        if (volumeByDate[dateString] !== undefined) {
            volumeByDate[dateString] += Number(tx.amount || 0);
        }
    });

    return Object.entries(volumeByDate).map(([date, volume]) => ({ date, volume }));
};

export const resetPassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await prisma_login.user.findUnique({
        where: { id: userId },
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
        where: { id: userId },
        data: {
            password: hashedPassword,
        },
    });

    return { message: 'Password updated successfully' };
};

export const changeUsername = async (
    userId: string,
    password: string,
    newUsername: string
) => {
    const user = await prisma_login.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            password: true,
        },
    });

    if (!user || !user.password) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }

    const trimmedUsername = newUsername.trim();
    if (trimmedUsername.length < 3) {
        throw new Error('New username must be at least 3 characters');
    }

    const newSlug = toUsernameSlug(trimmedUsername);
    if (!newSlug) {
        throw new Error('New username is invalid');
    }

    const currentSlug = toUsernameSlug(user.name ?? '');
    if (newSlug === currentSlug) {
        throw new Error('New username must be different from current username');
    }

    const otherUsers = await prisma_login.user.findMany({
        where: {
            NOT: { id: userId },
        },
        select: {
            name: true,
            email: true,
        },
    });

    const isSlugTaken = otherUsers.some((otherUser) => {
        const slugFromName = toUsernameSlug(otherUser.name ?? '');
        const slugFromEmail = (otherUser.email ?? '').split('@')[0]?.toLowerCase() ?? '';
        return slugFromName === newSlug || slugFromEmail === newSlug;
    });

    if (isSlugTaken) {
        throw new Error('This username is already taken');
    }

    await prisma_login.user.update({
        where: { id: userId },
        data: {
            name: trimmedUsername,
        },
    });

    return {
        message: 'Username updated successfully. Please sign out and sign in again.',
        username: trimmedUsername,
        usernameSlug: newSlug,
    };
};


