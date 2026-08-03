import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";

export async function GET(req) {
    try {
        // Verify authentication
        requireAuth(req);

        const client = await clientPromise;
        const db = client.db("c");

        // Fetch actions sorted by newest first
        const actions = await db
            .collection("actions")
            .find({})
            .sort({ timestamp: -1 })
            .toArray();

        return NextResponse.json(actions, { status: 200 });
    } catch (error) {
        console.error("Error fetching actions:", error);
        return NextResponse.json(
            { error: "Failed to fetch actions" },
            { status: 500 }
        );
    }
}
