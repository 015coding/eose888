import {prisma as prisma_login} from '@/lib/prisma';
import { prismaApp as prisma_yok } from '@/lib/prismaApp';
import { Currency } from '@/lib/generated/prismaApp';
import { start } from 'repl';


export const countUsers = async () => {
    const count = await prisma_login.user.count();
    return count;    
}

export const countTransactions = async () => {
    const stock = await prisma_yok.transactionStock.count();
    const transfer = await prisma_yok.transferTransaction.count();
    return stock + transfer;
}

export const getAllBalances = async () => {
    const [USD , THB] = await Promise.all([
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
    ])
    return {
        USD: USD._sum.balance ?? 0 ,
        THB: THB._sum.balance ?? 0,
    }

}




export const findUserBalance = async (userId: string) => {
    const balance = await prisma_yok.bankAccount.findMany({
        where: {
            userId: userId,
        },
        include: {
            user: true,
        },
    });
    return balance;
}

export const getAllTransactionsLog = async(page : number =1 , limit : number = 10) => {
    const offset = (page - 1) * limit;
    const [transactions , totalCount] = await Promise.all([
        prisma_yok.accountLog.findMany({
            skip: offset,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                type: true,
                amount: true,
                createdAt: true,            }
        }),
        prisma_yok.accountLog.count()

    ]);


    return {
        data: transactions,
        meta: {
            total: totalCount,
            page: page,
            limit: limit,
            totalPage: Math.ceil(totalCount / limit)
        }
    }
}

export const getDailyTransactionVolume = async (days: number = 7) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - (days - 1)); 
    startDate.setHours(0, 0, 0, 0);

    const volumeByDate: Record<string, number> = {};
    for (let i = 0; i < days; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const dateString = currentDate.toISOString().split('T')[0]; 
        volumeByDate[dateString] = 0; // เซ็ตค่าเริ่มต้นเป็น 0 ไว้รอเลย
    }

    const transactions = await prisma_yok.accountLog.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: today
            }
        },
        select: {
            createdAt: true,
            amount: true,
        }
    });

    transactions.forEach(transaction => {
        const dateString = transaction.createdAt.toISOString().split('T')[0];
        
        if (volumeByDate[dateString] !== undefined) {
            const amountValue = Number(transaction.amount || 0);
            volumeByDate[dateString] += amountValue;
        }
    });

    const result = Object.entries(volumeByDate).map(([date, volume]) => ({
        date: date,
        volume: volume
    }));

    return result;
}
