import { NextResponse } from "next/server";
import { countUsers } from "@/service/userService";

export async function GET() {
    try {
        const userCount = await countUsers();
        return NextResponse.json({ count: userCount });
    } catch (error) {
        console.error("Error counting users:", error);
        return NextResponse.json({ error: "Failed to count users" }, { status: 500 });
    }
}


