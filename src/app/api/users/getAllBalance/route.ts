import { NextResponse } from "next/server";
import { getAllBalances } from "@/service/user/user.service";

export async function GET() {
    try {
        const allbalances = await getAllBalances();
        return NextResponse.json(allbalances);
    } catch (error) {
        console.error("Error fetching balances:", error);
        return NextResponse.json({ error: "Failed to fetch balances" }, { status: 500 });
    }
}


