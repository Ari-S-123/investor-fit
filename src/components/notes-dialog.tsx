"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { StartupNote } from "@/lib/types";

/**
 * Properties for the NotesDialog component
 */
type NotesDialogProps = {
    /** Whether the dialog is open */
    open: boolean;

    /** Callback when dialog open state changes */
    onOpenChange: (open: boolean) => void;

    /** ID of the startup to attach notes to */
    startupId: string;

    /** Name of the startup (for display purposes) */
    startupName: string;
};

/**
 * NotesDialog Component
 *
 * A modal dialog that allows investors to create, edit, and delete
 * personal notes about specific startups. The notes are stored per-user
 * and per-startup, providing a scratchpad-style interface.
 *
 * Features:
 * - Load existing note on open
 * - Auto-save on user action (explicit save button)
 * - Delete functionality with confirmation
 * - Real-time character count
 * - Responsive textarea that grows with content
 * - Error handling with user feedback
 * - Loading states for better UX
 *
 * @param props - Component properties
 * @returns Dialog with textarea for note-taking
 */
export function NotesDialog({
    open,
    onOpenChange,
    startupId,
    startupName,
}: NotesDialogProps) {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [existingNote, setExistingNote] = useState<StartupNote | null>(null);
    const [error, setError] = useState<string | null>(null);

    /**
     * Load existing note when dialog opens
     *
     * Fetches note from API and populates textarea if found.
     * Runs whenever the dialog opens or startupId changes.
     */
    useEffect(() => {
        if (!open) return;

        const loadNote = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/notes?startupId=${encodeURIComponent(startupId)}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();

                if (data.note) {
                    setExistingNote(data.note);
                    setContent(data.note.content);
                } else {
                    setExistingNote(null);
                    setContent("");
                }
            } catch (err) {
                console.error("Failed to load note:", err);
                setError("Failed to load note. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        loadNote();
    }, [open, startupId]);

    /**
     * Save note to backend
     *
     * Creates new note or updates existing one.
     * Shows success feedback and updates local state.
     */
    const handleSave = async () => {
        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startupId,
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            setExistingNote(data.note);

            // Show brief success state
            setTimeout(() => {
                onOpenChange(false);
            }, 300);
        } catch (err) {
            console.error("Failed to save note:", err);
            setError("Failed to save note. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Delete note from backend
     *
     * Removes note and resets dialog state.
     * Requires existing note to be present.
     */
    const handleDelete = async () => {
        if (!existingNote) return;

        // Simple confirmation
        if (!confirm(`Delete your notes for ${startupName}? This cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/notes?startupId=${encodeURIComponent(startupId)}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            // Reset state and close dialog
            setExistingNote(null);
            setContent("");
            onOpenChange(false);
        } catch (err) {
            console.error("Failed to delete note:", err);
            setError("Failed to delete note. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    /**
     * Handle dialog close
     *
     * Resets error state when closing.
     */
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setError(null);
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Notes: {startupName}</DialogTitle>
                    <DialogDescription>
                        Keep track of your thoughts, questions, and observations about this
                        startup. Your notes are private and only visible to you.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="py-8 text-center text-muted-foreground">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                        <p className="text-sm">Loading notes...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="note-content" className="text-base">
                                    Your Notes
                                </Label>
                                <Textarea
                                    id="note-content"
                                    placeholder="Enter your notes here... 

e.g., 
- Initial thoughts after reviewing pitch deck
- Questions to ask in first meeting
- Concerns about market size
- Team assessment notes
- Due diligence checklist items"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="min-h-[300px] resize-y"
                                    disabled={isSaving || isDeleting}
                                />
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        {content.length} characters
                                    </p>
                                    {existingNote && (
                                        <p className="text-xs text-muted-foreground">
                                            Last updated:{" "}
                                            {new Date(existingNote.updatedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {error && (
                                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                        </div>

                        <DialogFooter className="flex-col sm:flex-row gap-2">
                            {existingNote && (
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={isSaving || isDeleting}
                                    className="sm:mr-auto"
                                >
                                    {isDeleting ? "Deleting..." : "Delete Note"}
                                </Button>
                            )}
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={isSaving || isDeleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={isSaving || isDeleting || content.trim() === ""}
                            >
                                {isSaving ? "Saving..." : "Save Note"}
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

