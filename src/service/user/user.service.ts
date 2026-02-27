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

type TransactionRangeOptions = {
    startDate?: Date;
    endDate?: Date;
    all?: boolean;
};

const normalizeDateRange = ({ startDate, endDate, all }: TransactionRangeOptions) => {
    if (all || !startDate || !endDate) {
        return null;
    }

    const normalizedStartDate = new Date(startDate);
    normalizedStartDate.setHours(0, 0, 0, 0);

    const normalizedEndDate = new Date(endDate);
    normalizedEndDate.setHours(23, 59, 59, 999);

    if (normalizedStartDate.getTime() <= normalizedEndDate.getTime()) {
        return {
            startDate: normalizedStartDate,
            endDate: normalizedEndDate,
        };
    }

    return {
        startDate: new Date(normalizedEndDate.getFullYear(), normalizedEndDate.getMonth(), normalizedEndDate.getDate(), 0, 0, 0, 0),
        endDate: new Date(normalizedStartDate.getFullYear(), normalizedStartDate.getMonth(), normalizedStartDate.getDate(), 23, 59, 59, 999),
    };
};

const getUnifiedTransactions = async (rangeOptions: TransactionRangeOptions = {}) => {
    const dateRange = normalizeDateRange(rangeOptions);

    const [accountLogs, stockLogs] = await Promise.all([
        prisma_yok.accountLog.findMany({
            where: dateRange
                ? {
                    createdAt: {
                        gte: dateRange.startDate,
                        lte: dateRange.endDate,
                    },
                }
                : undefined,
            select: {
                type: true,
                amount: true,
                createdAt: true,
            },
        }),
        prisma_yok.transactionStock.findMany({
            where: dateRange
                ? {
                    tradeDate: {
                        gte: dateRange.startDate,
                        lte: dateRange.endDate,
                    },
                }
                : undefined,
            select: {
                type: true,
                quantity: true,
                price: true,
                tradeDate: true,
            },
        }),
    ]);

    const normalizedAccountLogs = accountLogs.map((row) => ({
        type: row.type,
        amount: Number(row.amount),
        createdAt: row.createdAt,
    }));

    const normalizedStockLogs = stockLogs.map((row) => ({
        type: `STOCK_${row.type}`,
        amount: Number(row.quantity) * Number(row.price),
        createdAt: row.tradeDate,
    }));

    return [...normalizedAccountLogs, ...normalizedStockLogs];
};

export const getAllTransactionsLog = async (
    page: number = 1,
    limit: number = 10,
    rangeOptions: TransactionRangeOptions = {}
) => {
    const offset = (page - 1) * limit;
    const allTransactions = await getUnifiedTransactions(rangeOptions);

    const transactions = allTransactions
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(offset, offset + limit);

    const totalCount = allTransactions.length;

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

export const getTransactionSummaryByRange = async (rangeOptions: TransactionRangeOptions = {}) => {
    const transactions = await getUnifiedTransactions(rangeOptions);

    const byTypeMap = new Map<string, { amount: number; count: number }>();
    let totalAmount = 0;

    for (const tx of transactions) {
        totalAmount += tx.amount;
        const existing = byTypeMap.get(tx.type);
        if (existing) {
            existing.amount += tx.amount;
            existing.count += 1;
        } else {
            byTypeMap.set(tx.type, { amount: tx.amount, count: 1 });
        }
    }

    const breakdown = Array.from(byTypeMap.entries())
        .map(([type, value]) => ({ type, amount: value.amount, count: value.count }))
        .sort((a, b) => b.amount - a.amount);

    return {
        totalTransactions: transactions.length,
        totalAmount,
        breakdown,
    };
};

const toLocalDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const getDailyTransactionVolume = async (days: number = 7) => {
    return getDailyTransactionVolumeByRange({ days });
};

type DailyVolumeOptions = TransactionRangeOptions & {
    days?: number;
};

export const getDailyTransactionVolumeByRange = async (options: DailyVolumeOptions = {}) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    let startDate: Date;
    let endDate: Date;

    if (options.all) {
        const [earliestAccountLog, earliestStockTx] = await Promise.all([
            prisma_yok.accountLog.findFirst({
                orderBy: { createdAt: 'asc' },
                select: { createdAt: true },
            }),
            prisma_yok.transactionStock.findFirst({
                orderBy: { tradeDate: 'asc' },
                select: { tradeDate: true },
            }),
        ]);

        const candidates = [
            earliestAccountLog?.createdAt,
            earliestStockTx?.tradeDate,
        ].filter((date): date is Date => Boolean(date));

        const earliestDate = candidates.length > 0
            ? new Date(Math.min(...candidates.map((date) => date.getTime())))
            : new Date(today);

        startDate = earliestDate;
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today);
    } else if (options.startDate && options.endDate) {
        startDate = new Date(options.startDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(options.endDate);
        endDate.setHours(23, 59, 59, 999);
    } else {
        const days = options.days ?? 7;
        startDate = new Date();
        startDate.setDate(startDate.getDate() - (days - 1));
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today);
    }

    if (startDate.getTime() > endDate.getTime()) {
        [startDate, endDate] = [endDate, startDate];
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
    }

    const volumeByDate: Record<string, number> = {};
    const daysInRange = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;

    for (let i = 0; i < daysInRange; i++) {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        volumeByDate[toLocalDateString(d)] = 0;
    }

    const [accountTransactions, stockTransactions] = await Promise.all([
        prisma_yok.accountLog.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                createdAt: true,
                amount: true,
            },
        }),
        prisma_yok.transactionStock.findMany({
            where: {
                tradeDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            select: {
                tradeDate: true,
                quantity: true,
                price: true,
            },
        }),
    ]);

    accountTransactions.forEach((tx) => {
        const dateString = toLocalDateString(tx.createdAt);
        if (volumeByDate[dateString] !== undefined) {
            volumeByDate[dateString] += Number(tx.amount || 0);
        }
    });

    stockTransactions.forEach((tx) => {
        const dateString = toLocalDateString(tx.tradeDate);
        if (volumeByDate[dateString] !== undefined) {
            volumeByDate[dateString] += Number(tx.quantity || 0) * Number(tx.price || 0);
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


