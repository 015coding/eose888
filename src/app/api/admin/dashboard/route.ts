import { countUsers, getAllBalances, getDailyTransactionVolumeByRange, getTransactionSummaryByRange } from "@/service/user/user.service";
import { NextResponse } from 'next/server'

const parseLocalDate = (value: string | null, endOfDay: boolean): Date | null => {
    if (!value) return null;
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    if (endOfDay) return new Date(y, m - 1, d, 23, 59, 59, 999);
    return new Date(y, m - 1, d, 0, 0, 0, 0);
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const requestedDays = parseInt(searchParams.get('days') || '7');
    const days = Number.isFinite(requestedDays)
        ? Math.min(Math.max(requestedDays, 1), 365)
        : 7;
    const all = searchParams.get('all') === 'true';
    const startDate = parseLocalDate(searchParams.get('startDate'), false);
    const endDate = parseLocalDate(searchParams.get('endDate'), true);

    try {
        const [totalCount, balances, dailyVolume, txSummary] = await Promise.all([
            countUsers(),
            getAllBalances(),
            getDailyTransactionVolumeByRange({
                days,
                all,
                startDate: startDate ?? undefined,
                endDate: endDate ?? undefined,
            }),
            getTransactionSummaryByRange({
                all,
                startDate: startDate ?? undefined,
                endDate: endDate ?? undefined,
            })
        ]);
       
        const thbBalance = Number(balances.THB || 0);
        const usdBalance = Number(balances.USD || 0);
        const totalBalance = Number((thbBalance + (usdBalance * 30)).toFixed(2));
        const selectedTotalBalance = Number((txSummary.totalAmount || 0).toFixed(2));

        return NextResponse.json({
            Allbalances: totalBalance,
            totalCount: totalCount,
            dailyVolume: dailyVolume,
            totalBalance: totalBalance,
            selectedTotalBalance,
            txSummary,
        });
    } catch (error) {
        console.error('Dashboard error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
}