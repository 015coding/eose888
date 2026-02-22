import { getAllTransactionsLog , countUsers  , getAllBalances , getDailyTransactionVolume} from "@/service/user/user.service";
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    try {
        const [transactions, totalCount  , balances , dailyVolume] = await Promise.all([
            getAllTransactionsLog(page, limit),
            countUsers(),
            getAllBalances(),
            getDailyTransactionVolume()
        ]);
       
        const thbBalance = Number(balances.THB || 0);
        const usdBalance = Number(balances.USD || 0);
        const totalBalance = Number(((thbBalance/30)+usdBalance).toFixed(2));     

        return NextResponse.json({
            transactions: transactions,
            Allbalances: totalBalance,
            totalCount: totalCount,
            dailyVolume: dailyVolume,
            totalBalance: totalBalance
        });
    } catch (error) {
        console.error('Dashboard error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        )
    }
}