import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { InvestorProfile, StartupProfile, MatchResult } from "./types";

/**
 * Zod schema for AI-generated match insights
 *
 * Vercel AI SDK uses this schema to:
 * 1. Validate LLM output structure
 * 2. Provide type inference
 * 3. Enable auto-completion in IDE
 *
 * The schema descriptions guide the LLM to produce better outputs.
 */
const matchInsightsSchema = z.object({
    explanation: z
        .string()
        .describe(
            "One concise sentence (max 25 words) explaining why this is a strong match. Be specific about alignment."
        ),
    icebreaker: z
        .string()
        .describe(
            'A warm, professional intro message (40-50 words) the investor can send to the startup. Reference specific shared interests, suggest a 15-min call, and avoid formal openings like "Dear".'
        )
});

/**
 * Calculate deterministic match score
 *
 * Scoring breakdown (0-100):
 * - Industry: 35 points (most important)
 * - Stage: 30 points (fund strategy)
 * - Check size: 25 points (must fit)
 * - Geography: 10 points (flexible)
 *
 * @param investor - Investor criteria
 * @param startup - Startup to match
 * @returns Score from 0-100
 */
function calculateMatchScore(investor: InvestorProfile, startup: StartupProfile): number {
    let score = 0;

    // Industry match (35%)
    const industryMatch = investor.industries.some(
        (ind) =>
            startup.industry.toLowerCase().includes(ind.toLowerCase()) ||
            ind.toLowerCase().includes(startup.industry.toLowerCase())
    );
    score += industryMatch ? 35 : 0;

    // Stage match (30%)
    const stageMatch = investor.stages.includes(startup.stage);
    score += stageMatch ? 30 : 0;

    // Check size match (25%)
    const raisingInRange = startup.raising >= investor.checkSize.min && startup.raising <= investor.checkSize.max;

    if (raisingInRange) {
        score += 25;
    } else {
        // Partial credit if within 50% of range
        const distance =
            startup.raising < investor.checkSize.min
                ? investor.checkSize.min - startup.raising
                : startup.raising - investor.checkSize.max;

        const maxDistance = investor.checkSize.max * 0.5;
        const penalty = Math.min(25, (distance / maxDistance) * 25);
        score += Math.max(0, 25 - penalty);
    }

    // Geography match (10%)
    const geoMatch = investor.geography.some(
        (geo) =>
            geo === "Global" ||
            startup.geography.toLowerCase().includes(geo.toLowerCase()) ||
            geo.toLowerCase().includes(startup.geography.toLowerCase())
    );
    score += geoMatch ? 10 : 5;

    return Math.round(score);
}

/**
 * Generate AI-powered match insights using Vercel AI SDK
 *
 * Uses GPT-5 via Vercel AI SDK for:
 * - Type-safe structured outputs
 * - Zod schema validation
 * - Unified provider interface
 *
 * model: openai('gpt-5')
 *
 * Benefits of Vercel AI SDK over direct OpenAI SDK:
 * - Automatic schema validation
 * - Type inference from Zod schema
 * - Consistent API across providers
 * - Better error handling
 * - Provider-agnostic code
 *
 * @param investor - Investor profile
 * @param startup - Startup to match
 * @returns Validated match insights
 */
async function generateMatchInsights(
    investor: InvestorProfile,
    startup: StartupProfile
): Promise<z.infer<typeof matchInsightsSchema>> {
    const prompt = `You are a professional investment matchmaker connecting investors with startups.

INVESTOR PROFILE:
- Name: ${investor.name}
- Industries: ${investor.industries.join(", ")}
- Stages: ${investor.stages.join(", ")}
- Check Size: $${(investor.checkSize.min / 1_000_000).toFixed(1)}M - $${(investor.checkSize.max / 1_000_000).toFixed(
        1
    )}M
- Geography: ${investor.geography.join(", ")}

STARTUP PROFILE:
- Name: ${startup.name}
- Industry: ${startup.industry}
- Stage: ${startup.stage}
- Raising: $${(startup.raising / 1_000_000).toFixed(1)}M
- Geography: ${startup.geography}
- Description: ${startup.description}
${startup.metrics.arr ? `- ARR: $${(startup.metrics.arr / 1_000).toFixed(0)}K` : ""}
${startup.metrics.customers ? `- Customers: ${startup.metrics.customers}` : ""}
${startup.metrics.growth ? `- Growth: ${startup.metrics.growth}` : ""}

Generate personalized match insights for ${investor.name}.`;

    try {
        /**
         * Vercel AI SDK generateObject with Zod schema
         *
         * This automatically:
         * - Validates output against schema
         * - Provides type safety
         * - Handles errors gracefully
         *
         * The `object` property is fully typed based on Zod schema
         */
        const { object } = await generateObject({
            model: openai("gpt-5"),
            schema: matchInsightsSchema,
            schemaName: "MatchInsights",
            prompt: prompt,
            temperature: 0.8 // Some creativity, not too random
        });

        console.log(`✅ AI insights for ${startup.name}: ${object.explanation}`);

        return object;
    } catch (error) {
        console.error("❌ AI insight generation failed:", error);

        // Fallback to functional defaults
        return {
            explanation: `Strong ${investor.industries[0]} and ${startup.stage} alignment with check size fit.`,
            icebreaker: `Hi ${startup.name} team! I'm ${investor.name}, and I invest in ${investor.industries[0]} companies at the ${startup.stage} stage. Your work caught my attention - would love to learn more about your round. Available for a 15-min call this week?`
        };
    }
}

/**
 * Find top startup matches for investor
 *
 * Algorithm:
 * 1. Score all startups deterministically
 * 2. Sort by score and take top 5
 * 3. Generate AI insights for each (parallel)
 * 4. Return enriched results
 *
 * Performance: ~2-4 seconds (OpenAI API latency)
 *
 * @param investor - Investor criteria
 * @param startups - All available startups
 * @returns Top 5 matches with AI insights
 */
export async function findMatchesForInvestor(
    investor: InvestorProfile,
    startups: StartupProfile[]
): Promise<MatchResult[]> {
    console.log(`🔍 Finding matches for ${investor.name}...`);

    // Score all startups
    const scoredStartups = startups.map((startup) => ({
        startup,
        score: calculateMatchScore(investor, startup)
    }));

    // Sort and take top 5
    const topMatches = scoredStartups.sort((a, b) => b.score - a.score).slice(0, 5);

    console.log(
        `📊 Top ${topMatches.length} by score:`,
        topMatches.map((m) => ({ name: m.startup.name, score: m.score }))
    );

    // Generate AI insights in parallel
    const enrichedMatches = await Promise.all(
        topMatches.map(async ({ startup, score }, index) => {
            const insights = await generateMatchInsights(investor, startup);

            return {
                profile: startup,
                rank: index + 1,
                explanation: insights.explanation,
                icebreaker: insights.icebreaker,
                internalScore: score
            };
        })
    );

    console.log(`✅ Generated ${enrichedMatches.length} AI-enriched matches`);

    return enrichedMatches;
}

