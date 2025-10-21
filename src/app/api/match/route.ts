import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dataStore } from "@/lib/storage";
import { findMatchesForInvestor } from "@/lib/aiMatching";
import { seedStartups } from "@/data/seedData";

// Initialize startup database on first load
if (dataStore.getAllStartups().length === 0) {
    dataStore.seedStartups(seedStartups);
}

/**
 * GET /api/match
 *
 * Generates AI-powered startup matches using Vercel AI SDK
 *
 * This endpoint orchestrates the AI matching flow:
 * 1. Verifies user authentication
 * 2. Retrieves investor profile from data store
 * 3. Gets all available startups
 * 4. Runs AI matching algorithm (GPT-5 via Vercel AI SDK)
 * 5. Returns top 5 matches with explanations and icebreakers
 *
 * Flow:
 * 1. Verify authentication
 * 2. Retrieve investor profile
 * 3. Get all startups
 * 4. Run matching algorithm (uses GPT-5 via Vercel AI SDK)
 * 5. Return top 5 matches
 *
 * Performance: 2-4 seconds (AI generation latency)
 *
 * Security:
 * - Clerk session required (enforced by middleware)
 * - User can only access their own profile
 *
 * Response:
 * - matches: MatchResult[] - Top 5 ranked matches with AI insights
 * - timestamp: string - ISO 8601 timestamp of match generation
 *
 * Error handling:
 * - 401: Unauthorized (no valid session)
 * - 404: Profile not found (redirect to /register)
 * - 500: Matching algorithm or API failure
 *
 * @param request - Next.js request object
 * @returns JSON response with AI-generated matches
 */
export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const investor = dataStore.getInvestorByClerkId(userId);

        if (!investor) {
            return NextResponse.json(
                {
                    error: "Profile not found. Complete registration first.",
                    redirectTo: "/register"
                },
                { status: 404 }
            );
        }

        const startups = dataStore.getAllStartups();

        if (startups.length === 0) {
            return NextResponse.json({ error: "No startups available" }, { status: 500 });
        }

        // AI matching with Vercel AI SDK
        const matches = await findMatchesForInvestor(investor, startups);

        return NextResponse.json({
            matches,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("❌ Matching error:", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to generate matches"
            },
            { status: 500 }
        );
    }
}

