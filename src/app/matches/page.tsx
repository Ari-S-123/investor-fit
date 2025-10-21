"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
 * - Copy-to-clipboard functionality for intro messages
 * - Company details: name, website, industry, stage, raising, geography
 * - Business metrics: ARR, customers, growth rate
 * - AI explanation with visual highlighting
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
    const [copiedId, setCopiedId] = useState<string | null>(null);

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
     * Copy icebreaker message to clipboard
     *
     * Shows visual feedback for 2 seconds after copying
     *
     * @param icebreaker - The intro message to copy
     * @param id - Profile ID for visual feedback
     */
    const copyIcebreaker = (icebreaker: string, id: string) => {
        navigator.clipboard.writeText(icebreaker);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
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
                                        <CardTitle className="text-2xl mb-2">{match.profile.name}</CardTitle>
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
                                        <div>
                                            <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                <span>📨</span> AI-Generated Intro Message:
                                            </p>
                                            <div className="bg-muted p-4 rounded-lg mb-3">
                                                <p className="text-foreground italic leading-relaxed">
                                                    &ldquo;{match.icebreaker}&rdquo;
                                                </p>
                                            </div>
                                            <Button onClick={() => copyIcebreaker(match.icebreaker, match.profile.id)}>
                                                {copiedId === match.profile.id ? "✓ Copied!" : "Copy Message"}
                                            </Button>
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                            <p className="font-semibold text-foreground mb-1">Contact:</p>
                                            <p>{match.profile.email}</p>
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
            </div>
        </div>
    );
}

