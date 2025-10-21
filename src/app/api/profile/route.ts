import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dataStore } from "@/lib/storage";
import type { InvestorProfile } from "@/lib/types";

/**
 * GET /api/profile
 *
 * Retrieves the authenticated user's investor profile
 *
 * This endpoint fetches the investor profile for the currently authenticated user
 * based on their Clerk user ID.
 *
 * Security measures:
 * - Clerk session required (enforced by middleware)
 * - Automatic user ID matching from session
 * - No user ID spoofing possible
 *
 * @param request - Next.js request object
 * @returns JSON response with the investor profile or error
 */
export async function GET(request: NextRequest) {
    try {
        // Verify authentication (async in Next.js 15 + Clerk v6)
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Retrieve investor profile
        const profile = dataStore.getInvestorByClerkId(userId);

        if (!profile) {
            return NextResponse.json(
                {
                    error: "Profile not found",
                    message: "Please complete registration first"
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            profile
        });
    } catch (error) {
        console.error("❌ Profile retrieval error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to retrieve profile"
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/profile
 *
 * Updates the authenticated user's investor profile
 *
 * This endpoint updates an existing investor profile with new investment preferences.
 * Unlike POST /api/register, this updates the existing profile and preserves metadata.
 *
 * Security measures:
 * - Clerk session required (enforced by middleware)
 * - Automatic user ID matching from session
 * - Input validation and sanitization
 * - Type-safe data handling
 *
 * Request body:
 * - industries: string[] - Investment industries
 * - stages: string[] - Investment stages
 * - checkSize: { min: number, max: number } - Check size range in USD
 * - geography: string[] - Geographic focus areas
 *
 * @param request - Next.js request object
 * @returns JSON response with success status
 */
export async function PUT(request: NextRequest) {
    try {
        // Verify authentication (async in Next.js 15 + Clerk v6)
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get existing profile
        const existingProfile = dataStore.getInvestorByClerkId(userId);

        if (!existingProfile) {
            return NextResponse.json(
                {
                    error: "Profile not found",
                    message: "Please complete registration first"
                },
                { status: 404 }
            );
        }

        const body = await request.json();
        const { industries, stages, checkSize, geography } = body;

        // Validation
        if (
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

        // Update profile with sanitized data, preserving existing metadata
        const updatedProfile: InvestorProfile = {
            ...existingProfile,
            industries: industries.map((i: string) => String(i).trim()),
            stages: stages.map((s: string) => String(s).trim()),
            checkSize: {
                min: Number(checkSize.min),
                max: Number(checkSize.max)
            },
            geography: geography.map((g: string) => String(g).trim()),
            updatedAt: new Date().toISOString()
        };

        dataStore.saveInvestor(updatedProfile);

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully"
        });
    } catch (error) {
        console.error("❌ Profile update error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to update profile"
            },
            { status: 500 }
        );
    }
}

