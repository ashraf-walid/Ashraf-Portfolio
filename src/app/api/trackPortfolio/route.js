import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { UAParser } from 'ua-parser-js';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("portfolioDB");

        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const userAgentString = request.headers.get("user-agent") || "unknown";

        // Filter out bots and screenshot tools
        if (userAgentString.includes("vercel-screenshot")) {
            return NextResponse.json({ success: true, ignored: true });
        }

        // Parse User Agent
        const parser = new UAParser(userAgentString);
        const uaResult = parser.getResult();

        // Get Client-Side Data from Body
        let clientData = {};
        try {
            clientData = await request.json();
        } catch (e) {
            console.warn("No JSON body provided");
        }

        // Get Geolocation Data (Vercel Headers)
        const country = request.headers.get("x-vercel-ip-country") || null;
        const region = request.headers.get("x-vercel-ip-region") || null;
        const city = request.headers.get("x-vercel-ip-city") || null;
        const geo = (country || city) ? { country, region, city } : null;

        const timestamp = new Date();

        await db.collection("visits").insertOne({
            ip,
            userAgent: userAgentString,
            browser: uaResult.browser,
            os: uaResult.os,
            device: uaResult.device,
            geo, // Location data
            screenResolution: clientData.screenResolution || null,
            referrer: clientData.referrer || request.headers.get("referer") || null,
            timezone: clientData.timezone || null,
            language: clientData.language || request.headers.get("accept-language") || null,
            page: "portfolio",
            timestamp,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error tracking visit:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
