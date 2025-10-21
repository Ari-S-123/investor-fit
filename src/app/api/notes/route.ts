import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/storage";
import type { StartupNote } from "@/lib/types";

/**
 * API route for managing startup notes
 *
 * Endpoints:
 * - GET: Retrieve note for a specific startup
 * - POST: Create or update a note for a startup
 * - DELETE: Delete a note for a startup
 *
 * All operations are scoped to the authenticated user via Clerk.
 *
 * Request/Response formats:
 * - GET ?startupId=xxx → { note: StartupNote | null }
 * - POST { startupId, content } → { note: StartupNote }
 * - DELETE ?startupId=xxx → { success: true }
 */

/**
 * GET /api/notes
 * 
 * Retrieve a note for a specific startup by the authenticated user.
 *
 * @param request - Next.js request with startupId query parameter
 * @returns Note if found, null otherwise
 */
export async function GET(request: NextRequest) {
    try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Extract startupId from query params
        const { searchParams } = new URL(request.url);
        const startupId = searchParams.get("startupId");

        if (!startupId) {
            return NextResponse.json(
                { error: "Missing startupId parameter" },
                { status: 400 }
            );
        }

        // Retrieve note from storage
        const note = dataStore.getNote(userId, startupId);

        return NextResponse.json({ note: note ?? null });
    } catch (error) {
        console.error("Error retrieving note:", error);
        return NextResponse.json(
            { error: "Failed to retrieve note" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/notes
 * 
 * Create or update a note for a startup.
 *
 * @param request - Next.js request with { startupId, content } in body
 * @returns Created/updated note
 */
export async function POST(request: NextRequest) {
    try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json();
        const { startupId, content } = body;

        // Validate inputs
        if (!startupId || typeof startupId !== "string") {
            return NextResponse.json(
                { error: "Invalid or missing startupId" },
                { status: 400 }
            );
        }

        if (typeof content !== "string") {
            return NextResponse.json(
                { error: "Invalid content type" },
                { status: 400 }
            );
        }

        // Check if note already exists
        const existingNote = dataStore.getNote(userId, startupId);
        const now = new Date().toISOString();

        const note: StartupNote = existingNote
            ? {
                  ...existingNote,
                  content,
                  updatedAt: now,
              }
            : {
                  id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  clerkUserId: userId,
                  startupId,
                  content,
                  createdAt: now,
                  updatedAt: now,
              };

        // Save to storage
        dataStore.saveNote(note);

        return NextResponse.json({ note }, { status: existingNote ? 200 : 201 });
    } catch (error) {
        console.error("Error saving note:", error);
        return NextResponse.json(
            { error: "Failed to save note" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/notes
 * 
 * Delete a note for a specific startup.
 *
 * @param request - Next.js request with startupId query parameter
 * @returns Success status
 */
export async function DELETE(request: NextRequest) {
    try {
        // Authenticate user
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Extract startupId from query params
        const { searchParams } = new URL(request.url);
        const startupId = searchParams.get("startupId");

        if (!startupId) {
            return NextResponse.json(
                { error: "Missing startupId parameter" },
                { status: 400 }
            );
        }

        // Delete note from storage
        const deleted = dataStore.deleteNote(userId, startupId);

        if (!deleted) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { error: "Failed to delete note" },
            { status: 500 }
        );
    }
}

