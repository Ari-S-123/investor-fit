"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NotesDialog } from "@/components/notes-dialog";
import { FounderAvatarGroup } from "@/components/founder-avatar-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { MatchResult } from "@/lib/types";

/**
 * AI-generated matches results page
 *
 * This client component displays AI-curated startup matches for investors
 * in a card-based UI with ranked profiles.
 *
 * Features:
 * - Ranked startup list (1-5) with card-based UI
 * - Expandable cards showing AI-generated icebreakers
 * - Editable textarea for customizing intro messages
 * - Send button with confirmation dialog for message preparation
 * - Company details: name, website, industry, stage, raising, geography
 * - Business metrics: ARR, customers, growth rate
 * - AI explanation with visual highlighting
 * - Private notes functionality for each startup
 * - Loading states with animations
 * - Mobile-responsive layout
 * - Error handling and redirects
 *
 * @returns Matches results page with ranked startup profiles
 */
export default function MatchesPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [matches, setMatches] = useState<MatchResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [notesDialogOpen, setNotesDialogOpen] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [messageContent, setMessageContent] = useState<Record<string, string>>({});
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [sendingMessage, setSendingMessage] = useState<{
        startupName: string;
        content: string;
    } | null>(null);

    useEffect(() => {
        if (!isLoaded) return;

        if (!user) {
            router.push("/sign-in");
            return;
        }

        /**
         * Fetch AI-generated matches from API
         *
         * Includes artificial delay for better UX (shows loading animation)
         */
        const fetchMatches = async () => {
            try {
                // Artificial delay for better UX
                await new Promise((resolve) => setTimeout(resolve, 2500));

                const response = await fetch("/api/match");

                if (!response.ok) {
                    if (response.status === 404) {
                        router.push("/register");
                        return;
                    }
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                setMatches(data.matches);
                
                // Initialize message content with icebreakers
                const initialMessages: Record<string, string> = {};
                data.matches.forEach((match: MatchResult) => {
                    initialMessages[match.profile.id] = match.icebreaker;
                });
                setMessageContent(initialMessages);
            } catch (error) {
                console.error("Failed to fetch matches:", error);
                alert("Failed to load matches. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatches();
    }, [user, isLoaded, router]);

    /**
     * Handle message content change
     *
     * Updates the message content for a specific startup
     *
     * @param startupId - The startup ID
     * @param content - The new message content
     */
    const handleMessageChange = (startupId: string, content: string) => {
        setMessageContent((prev) => ({
            ...prev,
            [startupId]: content,
        }));
    };

    /**
     * Handle send button click
     *
     * Opens confirmation dialog with the message details
     *
     * @param startupName - The startup name
     * @param startupId - The startup ID
     */
    const handleSendClick = (startupName: string, startupId: string) => {
        setSendingMessage({
            startupName,
            content: messageContent[startupId] || "",
        });
        setConfirmDialogOpen(true);
    };

    /**
     * Confirm and "send" the message
     *
     * In a real implementation, this would trigger an email send.
     * For now, it just closes the dialog with confirmation.
     */
    const confirmSend = () => {
        // In a real implementation, this would call an API to send the email
        // For now, we just close the dialog
        setConfirmDialogOpen(false);
        setSendingMessage(null);
    };

    /**
     * Open notes dialog for a specific startup
     *
     * @param startupId - The startup ID
     * @param startupName - The startup name
     */
    const openNotes = (startupId: string, startupName: string) => {
        setSelectedStartup({ id: startupId, name: startupName });
        setNotesDialogOpen(true);
    };

    /**
     * Format currency amounts for display
     *
     * Converts to millions (M) or thousands (K) notation
     *
     * @param amount - Amount in USD
     * @returns Formatted string (e.g., "$2.5M", "$500K")
     */
    const formatCurrency = (amount: number): string => {
        if (amount >= 1_000_000) {
            return `$${(amount / 1_000_000).toFixed(1)}M`;
        }
        return `$${(amount / 1_000).toFixed(0)}K`;
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary mb-4"></div>
                    <p className="text-2xl font-semibold text-foreground">AI is analyzing startups...</p>
                    <p className="text-muted-foreground mt-2">Finding your best matches</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-3">Your Curated Startup Matches</h1>
                    <p className="text-xl text-muted-foreground">Ranked by relevance to your investment thesis</p>
                </div>

                {/* Matches - Card-based UI */}
                <div className="space-y-6">
                    {matches.map((match) => (
                        <Card key={match.profile.id}>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    {/* Rank Badge */}
                                    <div className="shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        {match.rank}
                                    </div>

                                    {/* Company Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <CardTitle className="text-2xl mb-2">
                                                    {match.profile.name}
                                                </CardTitle>
                                                {match.profile.website && (
                                                    <a
                                                        href={`https://${match.profile.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-primary hover:underline"
                                                    >
                                                        {match.profile.website}
                                                    </a>
                                                )}
                                            </div>
                                            {/* Notes Button */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    openNotes(match.profile.id, match.profile.name)
                                                }
                                                className="shrink-0"
                                            >
                                                📝 Notes
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <Badge>{match.profile.industry}</Badge>
                                    <Badge variant="secondary">{match.profile.stage}</Badge>
                                    <Badge variant="outline">Raising {formatCurrency(match.profile.raising)}</Badge>
                                    <Badge variant="outline">{match.profile.geography}</Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Description */}
                                <p className="text-foreground leading-relaxed">{match.profile.description}</p>

                                {/* Metrics */}
                                {(match.profile.metrics.arr ||
                                    match.profile.metrics.customers ||
                                    match.profile.metrics.growth) && (
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        {match.profile.metrics.arr && (
                                            <div>
                                                <span className="font-semibold text-foreground">ARR:</span>{" "}
                                                {formatCurrency(match.profile.metrics.arr)}
                                            </div>
                                        )}
                                        {match.profile.metrics.customers && (
                                            <div>
                                                <span className="font-semibold text-foreground">Customers:</span>{" "}
                                                {match.profile.metrics.customers}
                                            </div>
                                        )}
                                        {match.profile.metrics.growth && (
                                            <div>
                                                <span className="font-semibold text-foreground">Growth:</span>{" "}
                                                {match.profile.metrics.growth}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* AI Explanation */}
                                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">💡</span>
                                        <div>
                                            <p className="font-medium text-foreground mb-1">Why you should meet:</p>
                                            <p className="text-foreground">{match.explanation}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Expand/Collapse */}
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() =>
                                        setExpandedId(expandedId === match.profile.id ? null : match.profile.id)
                                    }
                                >
                                    {expandedId === match.profile.id
                                        ? "▲ Hide Details"
                                        : "▼ View Details & Intro Message"}
                                </Button>

                                {/* Expanded Details */}
                                {expandedId === match.profile.id && (
                                    <div className="pt-4 border-t space-y-4">
                                        <div className="space-y-3">
                                            <Label htmlFor={`message-${match.profile.id}`} className="font-semibold text-foreground flex items-center gap-2">
                                                <span>📨</span> AI-Generated Intro Message:
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Edit the message below and click Send to prepare your introduction.
                                            </p>
                                            <Textarea
                                                id={`message-${match.profile.id}`}
                                                value={messageContent[match.profile.id] || ""}
                                                onChange={(e) =>
                                                    handleMessageChange(match.profile.id, e.target.value)
                                                }
                                                className="min-h-[150px] resize-y"
                                                placeholder="Enter your intro message here..."
                                            />
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {(messageContent[match.profile.id] || "").length} characters
                                                </p>
                                                <Button
                                                    onClick={() =>
                                                        handleSendClick(match.profile.name, match.profile.id)
                                                    }
                                                    disabled={
                                                        !messageContent[match.profile.id] ||
                                                        messageContent[match.profile.id].trim() === ""
                                                    }
                                                >
                                                    Send Message
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="text-sm text-muted-foreground">
                                                <p className="font-semibold text-foreground mb-2">Founders:</p>
                                                <FounderAvatarGroup founders={match.profile.founders} maxDisplay={3} />
                                            </div>

                                            <div className="text-sm text-muted-foreground">
                                                <p className="font-semibold text-foreground mb-1">Contact:</p>
                                                <p>{match.profile.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <Button variant="ghost" onClick={() => router.push("/register")}>
                        ← Update Your Preferences
                    </Button>
                </div>

                {/* Notes Dialog */}
                {selectedStartup && (
                    <NotesDialog
                        open={notesDialogOpen}
                        onOpenChange={setNotesDialogOpen}
                        startupId={selectedStartup.id}
                        startupName={selectedStartup.name}
                    />
                )}

                {/* Send Confirmation Dialog */}
                <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Confirm Send Message</DialogTitle>
                            <DialogDescription>
                                Review your message before sending to {sendingMessage?.startupName}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="py-4">
                            <div className="bg-muted p-4 rounded-lg">
                                <p className="text-sm font-medium text-foreground mb-2">Message Preview:</p>
                                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                                    {sendingMessage?.content}
                                </p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setConfirmDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={confirmSend}>
                                Confirm Send
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

