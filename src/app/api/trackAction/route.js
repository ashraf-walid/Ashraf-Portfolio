import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";
import { UAParser } from 'ua-parser-js';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("c");

        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const userAgentString = request.headers.get("user-agent") || "unknown";

        // Parse User Agent
        const parser = new UAParser(userAgentString);
        const uaResult = parser.getResult();

        // Get Client-Side Data from Body
        let clientData = {};
        try {
            clientData = await request.json();
        } catch (e) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        // Validate required fields
        if (!clientData.actionType) {
            return NextResponse.json(
                { error: "actionType is required" },
                { status: 400 }
            );
        }

        // Get Geolocation Data (Vercel Headers)
        const country = request.headers.get("x-vercel-ip-country") || null;
        const region = request.headers.get("x-vercel-ip-region") || null;
        const city = request.headers.get("x-vercel-ip-city") || null;
        const geo = (country || city) ? { country, region, city } : null;

        const timestamp = new Date();

        // Save action to database
        await db.collection("actions").insertOne({
            // Action details
            actionType: clientData.actionType, // e.g., "live_demo", "github", "download_cv", "contact"
            projectName: clientData.projectName || null, // e.g., "Amanat"
            projectUrl: clientData.projectUrl || null, // e.g., "https://amanat.com"
            buttonLabel: clientData.buttonLabel || null, // e.g., "Live Demo"
            
            // User details
            ip,
            userAgent: userAgentString,
            browser: uaResult.browser,
            os: uaResult.os,
            device: uaResult.device,
            geo,
            
            // Additional client data
            screenResolution: clientData.screenResolution || null,
            referrer: clientData.referrer || request.headers.get("referer") || null,
            timezone: clientData.timezone || null,
            language: clientData.language || request.headers.get("accept-language") || null,
            
            // Metadata
            timestamp,
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error tracking action:", error);
        return NextResponse.json(
            { error: "Failed to track action" },
            { status: 500 }
        );
    }
}
