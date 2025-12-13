import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolioDB");

        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";
        const timestamp = new Date();

        await db.collection("visits").insertOne({
            ip,
            userAgent,
            page: "portfolio",
            timestamp,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error tracking visit:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
