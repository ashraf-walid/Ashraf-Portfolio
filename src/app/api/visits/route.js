import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        // Verify authentication
        requireAuth(req);

        const client = await clientPromise;
        const db = client.db("portfolioDB");

        // Fetch visits sorted by newest first
        const visits = await db
            .collection("visits")
            .find({})
            .sort({ timestamp: -1 })
            .toArray();

        return NextResponse.json(visits, { status: 200 });
    } catch (error) {
        console.error("Error fetching visits:", error);
        return NextResponse.json(
            { error: "Failed to fetch visits" },
            { status: 500 }
        );
    }
}
