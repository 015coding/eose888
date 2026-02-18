import { NextResponse } from "next/server";
import { getAllBalances } from "@/service/userService";
import { Currency } from "@/lib/generated/prismaApp";

export async function GET() {
    try {
        const allbalances = await getAllBalances(Currency.USD);
        return NextResponse.json(allbalances);
    } catch (error) {
        console.error("Error fetching balances:", error);
        return NextResponse.json({ error: "Failed to fetch balances" }, { status: 500 });
    }
}


