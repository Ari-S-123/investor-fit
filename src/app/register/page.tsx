"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
 * Investor onboarding form
 *
 * This client component collects investor preferences using shadcn/ui components
 * and submits them to create a profile for AI matching.
 *
 * Features:
 * - Multi-select badge UI for industries, stages, geography
 * - Single-select dropdown for check size
 * - Form validation (at least one selection per category)
 * - Loading states during submission
 * - Error handling with user feedback
 * - LinkedIn OAuth data integration
 *
 * @returns Investor onboarding form page
 */
export default function RegisterPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        industries: [],
        stages: [],
        checkSizeIndex: 2,
        geography: []
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary mb-4"></div>
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        router.push("/sign-in");
        return null;
    }

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
     * Handle form submission
     *
     * Validates form data, submits to API, and redirects to matches page on success.
     *
     * @param e - Form submit event
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.industries.length === 0 || formData.stages.length === 0 || formData.geography.length === 0) {
            alert("Please select at least one option in each category");
            return;
        }

        setIsSubmitting(true);

        try {
            const checkSize = CHECK_SIZES[formData.checkSizeIndex];
            const linkedinAccount = user.externalAccounts.find((acc) => acc.provider.includes("linkedin"));

            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    clerkUserId: user.id,
                    name: user.fullName || user.firstName || "Investor",
                    email: user.primaryEmailAddress?.emailAddress || "",
                    linkedinUrl: linkedinAccount?.username,
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
                router.push("/matches");
            } else {
                alert(`Registration failed: ${data.error || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl">Tell us about your investment focus</CardTitle>
                        <CardDescription className="text-lg">
                            We&apos;ll match you with the most relevant startups
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
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

                            {/* Submit */}
                            <Button type="submit" disabled={isSubmitting} className="w-full text-lg py-6" size="lg">
                                {isSubmitting ? "Finding Your Matches..." : "Find My Matches"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

