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

// Helper: แปลง Date → "YYYY-MM-DD" ตาม local timezone ของเซิร์ฟเวอร์
// ต่างจาก toISOString() ที่จะ convert เป็น UTC ก่อน ทำให้วันเพี้ยน
const toLocalDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export const getDailyTransactionVolume = async (days: number = 7) => {
    // ใช้ local time — วันนี้จริงๆ ตาม timezone เซิร์ฟเวอร์
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    // สร้าง bucket ทุกวัน เริ่มต้น 0 โดยใช้ local date string
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

    transactions.forEach(tx => {
        // ใช้ local date string ตรงนี้ด้วย ไม่ใช่ toISOString()
        const dateString = toLocalDateString(tx.createdAt);
        if (volumeByDate[dateString] !== undefined) {
            volumeByDate[dateString] += Number(tx.amount || 0);
        }
    });

    return Object.entries(volumeByDate).map(([date, volume]) => ({ date, volume }));
};
