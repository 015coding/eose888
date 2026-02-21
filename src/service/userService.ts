import {prisma as prisma_login} from '@/lib/prisma';
import { prismaApp as prisma_yok } from '@/lib/prismaApp';
import { Currency } from '@/lib/generated/prismaApp';


export const countUsers = async () => {
    const count = await prisma_login.user.count();
    return count;    
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
        USD: USD._sum.balance ?? 0,
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


export const getAllBalancesByDate = async (currency : Currency) => {
    const balances = await prisma_yok.bankAccount.groupBy({
        by: ['createdAt'],
        where: {
            currency: currency,
        },
        _sum: {
            balance: true,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    return balances;
}
