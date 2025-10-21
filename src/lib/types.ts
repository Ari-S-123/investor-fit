/**
 * Type definitions for InvestorFit
 *
 * Provides full type safety across the application and serves as
 * living documentation for data structures.
 */

/**
 * Investor profile created during onboarding
 */
export type InvestorProfile = {
    /** Unique identifier */
    id: string;

    /** Clerk user ID - links to auth */
    clerkUserId: string;

    /** Full name from Clerk */
    name: string;

    /** Email from Clerk */
    email: string;

    /** LinkedIn profile URL from OAuth (optional) */
    linkedinUrl?: string;

    /** Industries of interest (multi-select) */
    industries: string[];

    /** Investment stages (multi-select) */
    stages: string[];

    /** Typical check size range (USD) */
    checkSize: {
        min: number;
        max: number;
    };

    /** Geographic focus areas (multi-select) */
    geography: string[];

    /** Creation timestamp (ISO 8601) */
    createdAt: string;

    /** Last update timestamp (ISO 8601) */
    updatedAt: string;
};

/**
 * Founder information for a startup
 */
export type Founder = {
    /** Founder's full name */
    name: string;

    /** Avatar image URL */
    avatarUrl: string;
};

/**
 * Startup profile for matching
 */
export type StartupProfile = {
    /** Unique identifier */
    id: string;

    /** Company name */
    name: string;

    /** Contact email */
    email: string;

    /** Primary industry */
    industry: string;

    /** Current fundraising stage */
    stage: string;

    /** Amount raising (USD) */
    raising: number;

    /** Primary location */
    geography: string;

    /** Pitch/description */
    description: string;

    /** Website URL (optional) */
    website?: string;

    /** Business metrics */
    metrics: {
        /** Annual Recurring Revenue (USD) */
        arr?: number;
        /** Paying customers */
        customers?: number;
        /** Growth rate */
        growth?: string;
    };

    /** Founders of the startup */
    founders: Founder[];

    /** Creation timestamp */
    createdAt: string;
};

/**
 * AI-generated match result
 */
export type MatchResult = {
    /** Matched startup */
    profile: StartupProfile;

    /** Rank (1-5) */
    rank: number;

    /** AI explanation (1 sentence) */
    explanation: string;

    /** AI icebreaker message (40-50 words) */
    icebreaker: string;

    /** Internal score (hidden from user) */
    internalScore?: number;
};

/**
 * AI match insights schema
 * Used by Vercel AI SDK for structured output validation
 */
export type MatchInsights = {
    /** One-sentence match explanation (max 25 words) */
    explanation: string;

    /** Personalized intro message (40-50 words) */
    icebreaker: string;
};

/**
 * Note entry for a specific startup
 * 
 * Allows investors to maintain personal notes and observations
 * about startups they're tracking or considering.
 */
export type StartupNote = {
    /** Unique identifier for the note */
    id: string;

    /** Clerk user ID of the investor who created the note */
    clerkUserId: string;

    /** ID of the startup this note is about */
    startupId: string;

    /** Note content - free-form text */
    content: string;

    /** Creation timestamp (ISO 8601) */
    createdAt: string;

    /** Last update timestamp (ISO 8601) */
    updatedAt: string;
};

