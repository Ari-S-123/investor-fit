import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dataStore } from "@/lib/storage";
import type { InvestorProfile } from "@/lib/types";

/**
 * POST /api/register
 *
 * Saves investor profile after onboarding
 *
 * This endpoint creates a new investor profile with their investment preferences.
 * The profile is used for AI-powered startup matching.
 *
 * Security measures:
 * - Clerk session required (enforced by middleware)
 * - CSRF protection via user ID verification
 * - Input validation and sanitization
 * - Type-safe data handling
 *
 * Request body:
 * - clerkUserId: string - Must match authenticated session
 * - name: string - Full name from Clerk
 * - email: string - Email from Clerk
 * - linkedinUrl?: string - LinkedIn profile URL (optional)
 * - industries: string[] - Investment industries
 * - stages: string[] - Investment stages
 * - checkSize: { min: number, max: number } - Check size range in USD
 * - geography: string[] - Geographic focus areas
 *
 * @param request - Next.js request object
 * @returns JSON response with success status and profile ID
 */
export async function POST(request: NextRequest) {
    try {
        // Verify authentication (async in Next.js 15 + Clerk v6)
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { clerkUserId, name, email, linkedinUrl, industries, stages, checkSize, geography } = body;

        // Validation
        if (
            !clerkUserId ||
            !name ||
            !email ||
            !Array.isArray(industries) ||
            industries.length === 0 ||
            !Array.isArray(stages) ||
            stages.length === 0 ||
            !checkSize ||
            typeof checkSize.min !== "number" ||
            typeof checkSize.max !== "number" ||
            !Array.isArray(geography) ||
            geography.length === 0
        ) {
            return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
        }

        // CSRF protection
        if (userId !== clerkUserId) {
            return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
        }

        // Create profile with sanitized data
        const profile: InvestorProfile = {
            id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            clerkUserId,
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            linkedinUrl: linkedinUrl ? String(linkedinUrl).trim() : undefined,
            industries: industries.map((i: string) => String(i).trim()),
            stages: stages.map((s: string) => String(s).trim()),
            checkSize: {
                min: Number(checkSize.min),
                max: Number(checkSize.max)
            },
            geography: geography.map((g: string) => String(g).trim()),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        dataStore.saveInvestor(profile);

        return NextResponse.json({
            success: true,
            profileId: profile.id
        });
    } catch (error) {
        console.error("❌ Registration error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to register profile"
            },
            { status: 500 }
        );
    }
}

