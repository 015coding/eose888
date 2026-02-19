import {prisma as prisma_login} from '@/lib/prisma';
import { prismaApp as prisma_yok } from '@/lib/prismaApp';
import { Currency } from '@/lib/generated/prismaApp';


export const countUsers = async () => {
    const count = await prisma_login.user.count();
    return count;    
}


export const getAllBalances = async (currency : Currency) => {
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
        USD: USD._sum.balance,
        THB: THB._sum.balance,
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


export const getAllBalancesByDate = async (Currency : Currency) => {
    const balances = await prisma_yok.bankAccount.groupBy({
        by: ['createdAt'],
        where: {
            currency: Currency,
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



