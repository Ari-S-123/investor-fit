"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { InvestorProfile } from "@/lib/types";

/**
 * Available industry sectors for investment
 */
const INDUSTRIES = [
    "Healthcare",
    "AI/ML",
    "Fintech",
    "Climate Tech",
    "Consumer",
    "B2B SaaS",
    "Hardware",
    "Robotics"
] as const;

/**
 * Investment stages from early to growth
 */
const STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"] as const;

/**
 * Check size ranges in USD
 */
const CHECK_SIZES = [
    { label: "$250K - $500K", min: 250_000, max: 500_000 },
    { label: "$500K - $1M", min: 500_000, max: 1_000_000 },
    { label: "$1M - $3M", min: 1_000_000, max: 3_000_000 },
    { label: "$3M - $5M", min: 3_000_000, max: 5_000_000 },
    { label: "$5M - $10M", min: 5_000_000, max: 10_000_000 },
    { label: "$10M+", min: 10_000_000, max: 100_000_000 }
] as const;

/**
 * Geographic regions for investment focus
 */
const GEOGRAPHIES = ["US", "Europe", "Asia", "Latin America", "Global"] as const;

/**
 * Form data structure for investor profile
 */
type FormData = {
    industries: string[];
    stages: string[];
    checkSizeIndex: number;
    geography: string[];
};

/**
 * Investor profile page
 *
 * This client component displays and allows editing of the user's investor profile.
 * It fetches the current profile from the API and provides a form to update preferences.
 *
 * Features:
 * - Displays user information from Clerk
 * - Shows current investment preferences
 * - Allows editing with the same UI as registration
 * - Multi-select badge UI for industries, stages, geography
 * - Single-select dropdown for check size
 * - Form validation (at least one selection per category)
 * - Loading and saving states
 * - Error handling with user feedback
 * - Automatic redirect if profile doesn't exist
 *
 * @returns Investor profile page with view and edit functionality
 */
export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [profile, setProfile] = useState<InvestorProfile | null>(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        industries: [],
        stages: [],
        checkSizeIndex: 2,
        geography: []
    });

    // Fetch profile on mount
    useEffect(() => {
        if (!isLoaded) return;

        if (!user) {
            router.push("/sign-in");
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/profile");

                if (!response.ok) {
                    if (response.status === 404) {
                        // No profile exists, redirect to registration
                        router.push("/register");
                        return;
                    }
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                const fetchedProfile: InvestorProfile = data.profile;
                setProfile(fetchedProfile);

                // Initialize form with existing data
                const checkSizeIndex = CHECK_SIZES.findIndex(
                    (size) =>
                        size.min === fetchedProfile.checkSize.min && size.max === fetchedProfile.checkSize.max
                );

                setFormData({
                    industries: fetchedProfile.industries,
                    stages: fetchedProfile.stages,
                    checkSizeIndex: checkSizeIndex !== -1 ? checkSizeIndex : 2,
                    geography: fetchedProfile.geography
                });
            } catch (error) {
                console.error("Failed to fetch profile:", error);
                alert("Failed to load profile. Please try again.");
            } finally {
                setIsLoadingProfile(false);
            }
        };

        fetchProfile();
    }, [user, isLoaded, router]);

    /**
     * Toggle item in array (add if not present, remove if present)
     *
     * @param array - Current array of items
     * @param item - Item to toggle
     * @returns Updated array
     */
    const toggleArrayItem = (array: string[], item: string): string[] => {
        return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
    };

    /**
     * Handle form submission to update profile
     *
     * Validates form data, submits to API, and updates local state on success.
     *
     * @param e - Form submit event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.industries.length === 0 || formData.stages.length === 0 || formData.geography.length === 0) {
            alert("Please select at least one option in each category");
            return;
        }

        setIsSaving(true);

        try {
            const checkSize = CHECK_SIZES[formData.checkSizeIndex];

            const response = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    industries: formData.industries,
                    stages: formData.stages,
                    checkSize: {
                        min: checkSize.min,
                        max: checkSize.max
                    },
                    geography: formData.geography
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update local profile state
                if (profile) {
                    setProfile({
                        ...profile,
                        industries: formData.industries,
                        stages: formData.stages,
                        checkSize: {
                            min: checkSize.min,
                            max: checkSize.max
                        },
                        geography: formData.geography,
                        updatedAt: new Date().toISOString()
                    });
                }
                setIsEditing(false);
                alert("Profile updated successfully!");
            } else {
                alert(`Update failed: ${data.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Profile update error:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Cancel editing and revert to original values
     */
    const handleCancelEdit = () => {
        if (!profile) return;

        // Revert form data to profile values
        const checkSizeIndex = CHECK_SIZES.findIndex(
            (size) => size.min === profile.checkSize.min && size.max === profile.checkSize.max
        );

        setFormData({
            industries: profile.industries,
            stages: profile.stages,
            checkSizeIndex: checkSizeIndex !== -1 ? checkSizeIndex : 2,
            geography: profile.geography
        });

        setIsEditing(false);
    };

    /**
     * Format currency amount
     *
     * @param amount - Amount in USD
     * @returns Formatted string (e.g., "$1.5M")
     */
    const formatCurrency = (amount: number): string => {
        if (amount >= 1_000_000) {
            return `$${(amount / 1_000_000).toFixed(1)}M`;
        }
        return `$${(amount / 1_000).toFixed(0)}K`;
    };

    // Loading state
    if (!isLoaded || isLoadingProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    // No profile state (should redirect, but this is a fallback)
    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <p className="text-muted-foreground">No profile found. Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Your Profile</h1>
                    <p className="text-muted-foreground">Manage your account and investment preferences</p>
                </div>

                {/* User Information Card */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>Your account details from Clerk</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div>
                            <span className="font-semibold text-foreground">Name:</span>{" "}
                            <span className="text-muted-foreground">{user?.fullName || profile.name}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-foreground">Email:</span>{" "}
                            <span className="text-muted-foreground">{user?.primaryEmailAddress?.emailAddress || profile.email}</span>
                        </div>
                        {profile.linkedinUrl && (
                            <div>
                                <span className="font-semibold text-foreground">LinkedIn:</span>{" "}
                                <a
                                    href={`https://linkedin.com/in/${profile.linkedinUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    {profile.linkedinUrl}
                                </a>
                            </div>
                        )}
                        <div>
                            <span className="font-semibold text-foreground">Member since:</span>{" "}
                            <span className="text-muted-foreground">
                                {new Date(profile.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div>
                            <span className="font-semibold text-foreground">Last updated:</span>{" "}
                            <span className="text-muted-foreground">
                                {new Date(profile.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Investment Preferences Card */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Investment Preferences</CardTitle>
                                <CardDescription>Your criteria for startup matching</CardDescription>
                            </div>
                            {!isEditing && (
                                <Button onClick={() => setIsEditing(true)} variant="outline">
                                    Edit Preferences
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        {!isEditing ? (
                            // View Mode
                            <div className="space-y-6">
                                {/* Industries */}
                                <div>
                                    <Label className="text-lg font-semibold mb-3 block">Industries of Interest</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.industries.map((industry) => (
                                            <Badge key={industry} variant="default">
                                                {industry}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Stages */}
                                <div>
                                    <Label className="text-lg font-semibold mb-3 block">Investment Stages</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.stages.map((stage) => (
                                            <Badge key={stage} variant="default">
                                                {stage}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Check Size */}
                                <div>
                                    <Label className="text-lg font-semibold mb-3 block">Typical Check Size</Label>
                                    <Badge variant="secondary" className="text-base px-4 py-2">
                                        {formatCurrency(profile.checkSize.min)} - {formatCurrency(profile.checkSize.max)}
                                    </Badge>
                                </div>

                                {/* Geography */}
                                <div>
                                    <Label className="text-lg font-semibold mb-3 block">Geography Focus</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.geography.map((geo) => (
                                            <Badge key={geo} variant="default">
                                                {geo}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 border-t">
                                    <Button onClick={() => router.push("/matches")} className="w-full" size="lg">
                                        View My Matches
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // Edit Mode
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Industries */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold">Industries of Interest *</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {INDUSTRIES.map((industry) => (
                                            <Badge
                                                key={industry}
                                                variant={formData.industries.includes(industry) ? "default" : "outline"}
                                                className="cursor-pointer px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        industries: toggleArrayItem(formData.industries, industry)
                                                    })
                                                }
                                            >
                                                {industry}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Stages */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold">Investment Stages *</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {STAGES.map((stage) => (
                                            <Badge
                                                key={stage}
                                                variant={formData.stages.includes(stage) ? "default" : "outline"}
                                                className="cursor-pointer px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        stages: toggleArrayItem(formData.stages, stage)
                                                    })
                                                }
                                            >
                                                {stage}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Check Size */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold">Typical Check Size *</Label>
                                    <Select
                                        value={formData.checkSizeIndex.toString()}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, checkSizeIndex: Number(value) })
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CHECK_SIZES.map((size, index) => (
                                                <SelectItem key={index} value={index.toString()}>
                                                    {size.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Geography */}
                                <div className="space-y-3">
                                    <Label className="text-lg font-semibold">Geography Focus *</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {GEOGRAPHIES.map((geo) => (
                                            <Badge
                                                key={geo}
                                                variant={formData.geography.includes(geo) ? "default" : "outline"}
                                                className="cursor-pointer px-4 py-2 text-sm hover:opacity-80 transition-opacity"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        geography: toggleArrayItem(formData.geography, geo)
                                                    })
                                                }
                                            >
                                                {geo}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Button type="submit" disabled={isSaving} className="flex-1" size="lg">
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleCancelEdit}
                                        disabled={isSaving}
                                        className="flex-1"
                                        size="lg"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

