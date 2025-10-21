import type { InvestorProfile, StartupProfile } from "./types";

/**
 * In-memory data store for MVP
 *
 * IMPORTANT: Data resets on server restart
 * This is acceptable for 2-hour MVP demo
 *
 * Production migration path:
 * 1. pnpm add convex
 * 2. npx convex dev
 * 3. Define schema in convex/schema.ts
 * 4. Replace this with Convex queries
 */
class DataStore {
    /** Investors keyed by Clerk ID */
    private investors: Map<string, InvestorProfile> = new Map();

    /** All startup profiles */
    private startups: StartupProfile[] = [];

    /**
     * Save investor profile
     *
     * @param profile - The investor profile to save
     */
    saveInvestor(profile: InvestorProfile): void {
        this.investors.set(profile.clerkUserId, profile);
        console.log(`💾 Saved: ${profile.id}`);
    }

    /**
     * Retrieve investor by Clerk ID
     *
     * @param clerkUserId - The Clerk user ID to look up
     * @returns The investor profile if found, undefined otherwise
     */
    getInvestorByClerkId(clerkUserId: string): InvestorProfile | undefined {
        return this.investors.get(clerkUserId);
    }

    /**
     * Initialize startups (called once on boot)
     *
     * @param startups - Array of startup profiles to seed
     */
    seedStartups(startups: StartupProfile[]): void {
        this.startups = startups;
        console.log(`🌱 Seeded ${startups.length} startups`);
    }

    /**
     * Get all startups
     *
     * @returns Array of all startup profiles
     */
    getAllStartups(): StartupProfile[] {
        return this.startups;
    }

    /**
     * Clear all data (testing only)
     */
    clear(): void {
        this.investors.clear();
        this.startups = [];
    }
}

/** Singleton instance */
export const dataStore = new DataStore();

