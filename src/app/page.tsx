import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Landing page (public, server-rendered)
 *
 * This page serves as the marketing entry point for InvestorFit.
 * Authenticated users are automatically redirected to the onboarding flow.
 *
 * Features:
 * - Hero section with value proposition
 * - LinkedIn OAuth sign-up CTA
 * - Feature showcase cards
 * - Professional Modern Minimal theme styling
 *
 * @returns Server-rendered landing page or redirect for authenticated users
 */
export default async function Home() {
    const { userId } = await auth();

    if (userId) {
        redirect("/register");
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-primary">InvestorFit</div>
                    <Link href="/sign-in">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <div className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
                <h1 className="text-6xl font-bold text-foreground mb-6">Find Your Next Investment</h1>
                <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                    AI-curated startup matches based on your investment thesis. Stop random networking, start strategic
                    connections.
                </p>

                <Link href="/sign-up">
                    <Button size="lg" className="text-xl px-12 py-6">
                        Get Started with LinkedIn
                    </Button>
                </Link>

                <p className="text-muted-foreground mt-6 text-sm">
                    ⚡ Setup takes 30 seconds • 🔒 LinkedIn OAuth sign-in
                </p>
            </div>

            {/* Features */}
            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
                <Card>
                    <CardHeader>
                        <div className="text-4xl mb-4">🎯</div>
                        <CardTitle>Precise Matching</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            AI analyzes your criteria to surface the most relevant startups
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="text-4xl mb-4">⚡</div>
                        <CardTitle>Instant Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            Get your curated list in seconds with GPT-5-powered insights
                        </CardDescription>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="text-4xl mb-4">💬</div>
                        <CardTitle>Ready to Connect</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription className="text-base">
                            Auto-generated icebreakers make outreach effortless
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

