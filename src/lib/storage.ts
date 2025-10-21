import type { InvestorProfile, StartupProfile, StartupNote } from "./types";

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
     * Startup notes keyed by composite key: `${clerkUserId}:${startupId}`
     * Allows each investor to maintain separate notes per startup
     */
    private notes: Map<string, StartupNote> = new Map();

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
     * Save or update a note for a startup
     *
     * @param note - The note to save
     */
    saveNote(note: StartupNote): void {
        const key = `${note.clerkUserId}:${note.startupId}`;
        this.notes.set(key, note);
        console.log(`📝 Saved note for startup ${note.startupId} by user ${note.clerkUserId}`);
    }

    /**
     * Get a note for a specific startup by a specific user
     *
     * @param clerkUserId - The Clerk user ID
     * @param startupId - The startup ID
     * @returns The note if found, undefined otherwise
     */
    getNote(clerkUserId: string, startupId: string): StartupNote | undefined {
        const key = `${clerkUserId}:${startupId}`;
        return this.notes.get(key);
    }

    /**
     * Get all notes for a specific user
     *
     * @param clerkUserId - The Clerk user ID
     * @returns Array of all notes created by the user
     */
    getUserNotes(clerkUserId: string): StartupNote[] {
        const userNotes: StartupNote[] = [];
        for (const [key, note] of this.notes.entries()) {
            if (key.startsWith(`${clerkUserId}:`)) {
                userNotes.push(note);
            }
        }
        return userNotes;
    }

    /**
     * Delete a note for a startup
     *
     * @param clerkUserId - The Clerk user ID
     * @param startupId - The startup ID
     * @returns true if note was deleted, false if it didn't exist
     */
    deleteNote(clerkUserId: string, startupId: string): boolean {
        const key = `${clerkUserId}:${startupId}`;
        const deleted = this.notes.delete(key);
        if (deleted) {
            console.log(`🗑️ Deleted note for startup ${startupId} by user ${clerkUserId}`);
        }
        return deleted;
    }

    /**
     * Clear all data (testing only)
     */
    clear(): void {
        this.investors.clear();
        this.startups = [];
        this.notes.clear();
    }
}

/** Singleton instance */
export const dataStore = new DataStore();

