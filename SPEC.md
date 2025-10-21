# 🎯 InvestorFit - Complete MVP Specification

**AI-Powered Investor-Startup Matching Platform**

**Last Updated:** October 21, 2025  
**Time Budget:** 2 hours  
**Package Manager:** pnpm (required)  
**Database:** In-memory (MVP), Convex migration path included

---

## 🏗️ Tech Stack

-   **Framework:** Next.js 15.5 (App Router, React 19, Turbopack)
-   **Authentication:** Clerk v6 with LinkedIn OIDC
-   **UI Components:** shadcn/ui (New York style)
-   **Theme:** Modern Minimal (from tweakcn)
-   **AI SDK:** Vercel AI SDK v5 with OpenAI provider
-   **AI Model:** GPT-5
-   **Schema Validation:** Zod
-   **Styling:** Tailwind CSS v4

---

## 📋 Complete Setup Guide

### **Step 1: Initialize Next.js Project (3 minutes)**

```bash
# Create Next.js 15 application with defaults
pnpm create next-app investor-fit --yes

cd investor-fit
```

### **Step 2: Install All Dependencies (3 minutes)**

```bash
# Core dependencies
pnpm add @clerk/nextjs ai @ai-sdk/openai zod

# Initialize shadcn/ui (interactive)
pnpm dlx shadcn@latest init
```

**shadcn/ui initialization prompts:**

**Install shadcn/ui components:**

```bash
# Install all components we need
pnpm dlx shadcn@latest add button card input label select badge
```

### **Step 3: Environment Variables (2 minutes)**

Create `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/register

# OpenAI API (for Vercel AI SDK)
OPENAI_API_KEY=sk-proj-...
```

### **Step 4: Apply Modern Minimal Theme (3 minutes)**

Replace `app/globals.css` with the complete Modern Minimal theme:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/**
 * Modern Minimal Theme for shadcn/ui
 * Source: https://tweakcn.com/editor/theme?theme=modern-minimal
 * 
 * A clean, professional color palette optimized for business applications.
 * Features soft neutral backgrounds, professional blue primary, and high contrast.
 */

@layer base {
    :root {
        /* Background - Pure white for clean appearance */
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;

        /* Card - White cards with subtle elevation */
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;

        /* Popover - Clean modals and dropdowns */
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;

        /* Primary - Professional blue (#3B82F6) */
        --primary: 221 83% 53%;
        --primary-foreground: 0 0% 98%;

        /* Secondary - Subtle gray for secondary actions */
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;

        /* Muted - Disabled states and subtle text */
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;

        /* Accent - Hover states and highlights */
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;

        /* Destructive - Error states (#EF4444) */
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;

        /* Borders - Subtle dividers */
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 221 83% 53%;

        /* Border radius - Smooth, modern rounding */
        --radius: 0.5rem;

        /* Chart colors - Cohesive data visualization palette */
        --chart-1: 221 83% 53%;
        --chart-2: 212 95% 68%;
        --chart-3: 216 92% 60%;
        --chart-4: 210 98% 78%;
        --chart-5: 212 97% 87%;
    }

    .dark {
        /* Dark mode - Professional dark theme (optional for MVP) */
        --background: 240 10% 3.9%;
        --foreground: 0 0% 98%;

        --card: 240 10% 3.9%;
        --card-foreground: 0 0% 98%;

        --popover: 240 10% 3.9%;
        --popover-foreground: 0 0% 98%;

        --primary: 221 83% 53%;
        --primary-foreground: 0 0% 98%;

        --secondary: 240 3.7% 15.9%;
        --secondary-foreground: 0 0% 98%;

        --muted: 240 3.7% 15.9%;
        --muted-foreground: 240 5% 64.9%;

        --accent: 240 3.7% 15.9%;
        --accent-foreground: 0 0% 98%;

        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 0 0% 98%;

        --border: 240 3.7% 15.9%;
        --input: 240 3.7% 15.9%;
        --ring: 221 83% 53%;

        --chart-1: 220 70% 50%;
        --chart-2: 160 60% 45%;
        --chart-3: 30 80% 55%;
        --chart-4: 280 65% 60%;
        --chart-5: 340 75% 55%;
    }
}

@layer base {
    * {
        @apply border-border;
    }

    body {
        @apply bg-background text-foreground;
    }
}
```

---

## 🔐 Clerk + LinkedIn OIDC Setup

### **Clerk Dashboard Configuration (10 minutes)**

Following the official Clerk Next.js quickstart:

**Step 1: Create Clerk Application**

1. Visit https://dashboard.clerk.com
2. Click "Create Application"
3. Name: "InvestorFit"
4. Select "Next.js" framework
5. Copy your API keys to `.env.local`

**Step 2: Configure LinkedIn OIDC**

Following official guide: https://clerk.com/docs/guides/configure/auth-strategies/social-connections/linkedin-oidc

**For Development (Instant Setup):**

1. In Clerk Dashboard → **SSO Connections**
2. Click "Add connection" → "For all users"
3. Choose provider: **LinkedIn**
4. Click "Add connection"
5. ✅ Done! Clerk uses shared OAuth credentials for dev

**For Production (Custom Credentials Required):**

**LinkedIn Developer Portal:**

1. Go to https://developer.linkedin.com
2. Click "Create app" on homepage
3. Fill application details:
    - App name: "InvestorFit"
    - LinkedIn Page: (your company page)
    - App logo: Upload logo
4. Click "Create app"

**Enable OpenID Connect:**

1. Go to "Products" tab
2. Find "Sign In with LinkedIn using OpenID Connect"
3. Click "Request access"
4. Submit access request (usually instant approval)

**Get OAuth Credentials:**

1. Navigate to "Auth" tab
2. Under "Application credentials":
    - Copy **Client ID**
    - Copy **Primary Client Secret**
3. Under "OAuth 2.0 settings":
    - Click "Edit" on "Authorized redirect URLs"
    - Add: `https://[your-clerk-domain].clerk.accounts.dev/v1/oauth_callback`
    - Click "Update"

**Configure in Clerk:**

1. Return to Clerk Dashboard → SSO Connections
2. Click "Add connection" → "For all users"
3. Select "LinkedIn"
4. Toggle ON "Use custom credentials"
5. Paste Client ID and Primary Client Secret
6. Click "Add connection"

---

## 📂 Project Structure

```
investor-fit/
├── middleware.ts                      # Clerk route protection (ROOT LEVEL)
├── app/
│   ├── layout.tsx                     # ClerkProvider wrapper
│   ├── page.tsx                       # Landing page
│   ├── globals.css                    # Modern Minimal theme
│   ├── sign-in/[[...sign-in]]/page.tsx
│   ├── sign-up/[[...sign-up]]/page.tsx
│   ├── register/page.tsx              # Onboarding with shadcn/ui
│   ├── matches/page.tsx               # Results with shadcn/ui
│   └── api/
│       ├── register/route.ts          # POST: Save profile
│       └── match/route.ts             # GET: Generate matches
├── components/
│   └── ui/                            # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── badge.tsx
├── lib/
│   ├── types.ts                       # TypeScript types
│   ├── storage.ts                     # In-memory store
│   ├── aiMatching.ts                  # Vercel AI SDK matching
│   └── utils.ts                       # shadcn/ui utilities
└── data/
    └── seedData.ts                    # Pre-seeded startups
```

---

## 💻 Complete Implementation

### **File 1: Middleware (Clerk v6)** (3 minutes)

**Location:** `middleware.ts` (ROOT LEVEL, not in `/app`)

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Define protected routes requiring authentication
 *
 * CRITICAL: Clerk v6 makes all routes PUBLIC by default.
 * Must explicitly protect routes using createRouteMatcher.
 *
 * This replaces deprecated authMiddleware from Clerk v5.
 *
 * @see https://clerk.com/docs/reference/nextjs/clerk-middleware
 */
const isProtectedRoute = createRouteMatcher(["/register(.*)", "/matches(.*)", "/api/register(.*)", "/api/match(.*)"]);

/**
 * Clerk middleware for Next.js 15
 *
 * Automatically:
 * - Validates sessions
 * - Protects matched routes
 * - Redirects unauthorized users to sign-in
 * - Injects auth context into requests
 */
export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

/**
 * Middleware matcher config
 * Runs on all routes except static files and Next.js internals
 */
export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)"
    ]
};
```

### **File 2: Root Layout** (3 minutes)

**Location:** `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "InvestorFit - AI-Powered Investor Discovery",
    description: "Find your next investment with AI-curated startup matches"
};

/**
 * Root layout with Clerk authentication context
 *
 * In Clerk v6:
 * - ClerkProvider is hybrid (client + server)
 * - Does NOT force dynamic rendering
 * - Supports Partial Prerendering (PPR)
 *
 * @see https://clerk.com/docs/nextjs/getting-started/quickstart
 */
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
```

### **File 3: TypeScript Types** (3 minutes)

**Location:** `lib/types.ts`

```typescript
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
```

### **File 4: In-Memory Storage** (3 minutes)

**Location:** `lib/storage.ts`

```typescript
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
     */
    saveInvestor(profile: InvestorProfile): void {
        this.investors.set(profile.clerkUserId, profile);
        console.log(`💾 Saved: ${profile.id}`);
    }

    /**
     * Retrieve investor by Clerk ID
     */
    getInvestorByClerkId(clerkUserId: string): InvestorProfile | undefined {
        return this.investors.get(clerkUserId);
    }

    /**
     * Initialize startups (called once on boot)
     */
    seedStartups(startups: StartupProfile[]): void {
        this.startups = startups;
        console.log(`🌱 Seeded ${startups.length} startups`);
    }

    /**
     * Get all startups
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
```

### **File 5: AI Matching with Vercel AI SDK** (12 minutes)

**Location:** `lib/aiMatching.ts`

This is the core file that uses Vercel AI SDK instead of direct OpenAI API calls.

```typescript
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { InvestorProfile, StartupProfile, MatchResult } from "./types";

/**
 * Zod schema for AI-generated match insights
 *
 * Vercel AI SDK uses this schema to:
 * 1. Validate LLM output structure
 * 2. Provide type inference
 * 3. Enable auto-completion in IDE
 *
 * The schema descriptions guide the LLM to produce better outputs.
 */
const matchInsightsSchema = z.object({
    explanation: z
        .string()
        .describe(
            "One concise sentence (max 25 words) explaining why this is a strong match. Be specific about alignment."
        ),
    icebreaker: z
        .string()
        .describe(
            'A warm, professional intro message (40-50 words) the investor can send to the startup. Reference specific shared interests, suggest a 15-min call, and avoid formal openings like "Dear".'
        )
});

/**
 * Calculate deterministic match score
 *
 * Scoring breakdown (0-100):
 * - Industry: 35 points (most important)
 * - Stage: 30 points (fund strategy)
 * - Check size: 25 points (must fit)
 * - Geography: 10 points (flexible)
 *
 * @param investor - Investor criteria
 * @param startup - Startup to match
 * @returns Score from 0-100
 */
function calculateMatchScore(investor: InvestorProfile, startup: StartupProfile): number {
    let score = 0;

    // Industry match (35%)
    const industryMatch = investor.industries.some(
        (ind) =>
            startup.industry.toLowerCase().includes(ind.toLowerCase()) ||
            ind.toLowerCase().includes(startup.industry.toLowerCase())
    );
    score += industryMatch ? 35 : 0;

    // Stage match (30%)
    const stageMatch = investor.stages.includes(startup.stage);
    score += stageMatch ? 30 : 0;

    // Check size match (25%)
    const raisingInRange = startup.raising >= investor.checkSize.min && startup.raising <= investor.checkSize.max;

    if (raisingInRange) {
        score += 25;
    } else {
        // Partial credit if within 50% of range
        const distance =
            startup.raising < investor.checkSize.min
                ? investor.checkSize.min - startup.raising
                : startup.raising - investor.checkSize.max;

        const maxDistance = investor.checkSize.max * 0.5;
        const penalty = Math.min(25, (distance / maxDistance) * 25);
        score += Math.max(0, 25 - penalty);
    }

    // Geography match (10%)
    const geoMatch = investor.geography.some(
        (geo) =>
            geo === "Global" ||
            startup.geography.toLowerCase().includes(geo.toLowerCase()) ||
            geo.toLowerCase().includes(startup.geography.toLowerCase())
    );
    score += geoMatch ? 10 : 5;

    return Math.round(score);
}

/**
 * Generate AI-powered match insights using Vercel AI SDK
 *
 * Uses GPT-5 via Vercel AI SDK for:
 * - Type-safe structured outputs
 * - Zod schema validation
 * - Unified provider interface
 *
 * model: openai('gpt-5')
 *
 * Benefits of Vercel AI SDK over direct OpenAI SDK:
 * - Automatic schema validation
 * - Type inference from Zod schema
 * - Consistent API across providers
 * - Better error handling
 * - Provider-agnostic code
 *
 * @param investor - Investor profile
 * @param startup - Startup to match
 * @returns Validated match insights
 */
async function generateMatchInsights(
    investor: InvestorProfile,
    startup: StartupProfile
): Promise<z.infer<typeof matchInsightsSchema>> {
    const prompt = `You are a professional investment matchmaker connecting investors with startups.

INVESTOR PROFILE:
- Name: ${investor.name}
- Industries: ${investor.industries.join(", ")}
- Stages: ${investor.stages.join(", ")}
- Check Size: $${(investor.checkSize.min / 1_000_000).toFixed(1)}M - $${(investor.checkSize.max / 1_000_000).toFixed(
        1
    )}M
- Geography: ${investor.geography.join(", ")}

STARTUP PROFILE:
- Name: ${startup.name}
- Industry: ${startup.industry}
- Stage: ${startup.stage}
- Raising: $${(startup.raising / 1_000_000).toFixed(1)}M
- Geography: ${startup.geography}
- Description: ${startup.description}
${startup.metrics.arr ? `- ARR: $${(startup.metrics.arr / 1_000).toFixed(0)}K` : ""}
${startup.metrics.customers ? `- Customers: ${startup.metrics.customers}` : ""}
${startup.metrics.growth ? `- Growth: ${startup.metrics.growth}` : ""}

Generate personalized match insights for ${investor.name}.`;

    try {
        /**
         * Vercel AI SDK generateObject with Zod schema
         *
         * This automatically:
         * - Validates output against schema
         * - Provides type safety
         * - Handles errors gracefully
         *
         * The `object` property is fully typed based on Zod schema
         */
        const { object } = await generateObject({
            model: openai("gpt-5"),
            schema: matchInsightsSchema,
            schemaName: "MatchInsights",
            prompt: prompt,
            temperature: 0.8 // Some creativity, not too random
        });

        console.log(`✅ AI insights for ${startup.name}: ${object.explanation}`);

        return object;
    } catch (error) {
        console.error("❌ AI insight generation failed:", error);

        // Fallback to functional defaults
        return {
            explanation: `Strong ${investor.industries[0]} and ${startup.stage} alignment with check size fit.`,
            icebreaker: `Hi ${startup.name} team! I'm ${investor.name}, and I invest in ${investor.industries[0]} companies at the ${startup.stage} stage. Your work caught my attention - would love to learn more about your round. Available for a 15-min call this week?`
        };
    }
}

/**
 * Find top startup matches for investor
 *
 * Algorithm:
 * 1. Score all startups deterministically
 * 2. Sort by score and take top 5
 * 3. Generate AI insights for each (parallel)
 * 4. Return enriched results
 *
 * Performance: ~2-4 seconds (OpenAI API latency)
 *
 * @param investor - Investor criteria
 * @param startups - All available startups
 * @returns Top 5 matches with AI insights
 */
export async function findMatchesForInvestor(
    investor: InvestorProfile,
    startups: StartupProfile[]
): Promise<MatchResult[]> {
    console.log(`🔍 Finding matches for ${investor.name}...`);

    // Score all startups
    const scoredStartups = startups.map((startup) => ({
        startup,
        score: calculateMatchScore(investor, startup)
    }));

    // Sort and take top 5
    const topMatches = scoredStartups.sort((a, b) => b.score - a.score).slice(0, 5);

    console.log(
        `📊 Top ${topMatches.length} by score:`,
        topMatches.map((m) => ({ name: m.startup.name, score: m.score }))
    );

    // Generate AI insights in parallel
    const enrichedMatches = await Promise.all(
        topMatches.map(async ({ startup, score }, index) => {
            const insights = await generateMatchInsights(investor, startup);

            return {
                profile: startup,
                rank: index + 1,
                explanation: insights.explanation,
                icebreaker: insights.icebreaker,
                internalScore: score
            };
        })
    );

    console.log(`✅ Generated ${enrichedMatches.length} AI-enriched matches`);

    return enrichedMatches;
}
```

### **File 6: Seed Data** (5 minutes)

**Location:** `data/seedData.ts`

```typescript
import type { StartupProfile } from "@/lib/types";

/**
 * Pre-seeded startup profiles for MVP
 *
 * In production, these would be user-submitted and database-backed.
 * For MVP, provides realistic data for testing matching algorithm.
 */
export const seedStartups: StartupProfile[] = [
    {
        id: "startup-1",
        name: "HealthScope AI",
        email: "team@healthscope.ai",
        industry: "Healthcare",
        stage: "Series A",
        raising: 3_000_000,
        geography: "Southeast Asia",
        description:
            "AI diagnostic platform for rural clinics in emerging markets. Built by former doctors with 50 clinics deployed across Philippines and Indonesia. Reducing diagnosis time by 70% and democratizing healthcare access.",
        website: "healthscope.ai",
        metrics: {
            arr: 500_000,
            customers: 50,
            growth: "25% MoM"
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-2",
        name: "SolarGrid",
        email: "founders@solargrid.io",
        industry: "Climate Tech",
        stage: "Seed",
        raising: 2_000_000,
        geography: "US",
        description:
            "Solar + battery storage for commercial buildings with proprietary AI for energy optimization. Serving Fortune 500 clients with 3-year payback period. 15 buildings deployed, expanding to 50 by EOY.",
        website: "solargrid.io",
        metrics: {
            customers: 10,
            arr: 1_200_000
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-3",
        name: "PayFlow",
        email: "hello@payflow.com",
        industry: "Fintech",
        stage: "Series B",
        raising: 20_000_000,
        geography: "Latin America",
        description:
            "B2B payment infrastructure for Latin America processing $500M annually with 200+ enterprise customers. Replacing wire transfers with instant settlements. Strong unit economics and path to profitability.",
        website: "payflow.com",
        metrics: {
            arr: 15_000_000,
            customers: 200
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-4",
        name: "Vibe",
        email: "team@vibe.social",
        industry: "Consumer",
        stage: "Pre-seed",
        raising: 500_000,
        geography: "US",
        description:
            "Social app for college students to discover events and meet friends. Viral referral loops. 50K users across 5 universities with 40% weekly retention. Expanding to 20 schools this semester.",
        website: "vibe.social",
        metrics: {
            customers: 50_000,
            growth: "40% weekly retention"
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-5",
        name: "RoboWeld",
        email: "info@roboweld.tech",
        industry: "Robotics",
        stage: "Seed",
        raising: 4_000_000,
        geography: "US",
        description:
            "Computer vision welding robots for automotive manufacturing reducing defects by 95%. Deployed at 2 Tier-1 suppliers with $8M in LOIs. Founded by ex-Tesla robotics team.",
        website: "roboweld.tech",
        metrics: {
            customers: 2
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-6",
        name: "MedData Pro",
        email: "contact@meddata.pro",
        industry: "Healthcare",
        stage: "Seed",
        raising: 1_500_000,
        geography: "US",
        description:
            "HIPAA-compliant patient data platform for small clinics. SaaS with strong unit economics. 75 customers, $4K ACV, sub-5% churn, 15% MoM growth. Replacing legacy systems costing 10x more.",
        website: "meddata.pro",
        metrics: {
            arr: 300_000,
            customers: 75,
            growth: "15% MoM"
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-7",
        name: "CarbonTech",
        email: "hello@carbontech.io",
        industry: "Climate Tech",
        stage: "Series A",
        raising: 5_000_000,
        geography: "Europe",
        description:
            "Direct air capture technology with partnerships across 3 countries. Proven carbon removal at scale with offtake agreements from Microsoft and Stripe. Novel chemistry IP with 40% cost reduction.",
        website: "carbontech.io",
        metrics: {
            customers: 8
        },
        createdAt: new Date().toISOString()
    },
    {
        id: "startup-8",
        name: "ShopLocal",
        email: "team@shoplocal.app",
        industry: "Consumer",
        stage: "Seed",
        raising: 800_000,
        geography: "US",
        description:
            "Marketplace connecting local artisans with conscious consumers. 30% repeat purchase rate. 25K buyers, 500 sellers. 15% take rate with path to profitability in 18 months.",
        website: "shoplocal.app",
        metrics: {
            customers: 25_000,
            growth: "30% MoM GMV"
        },
        createdAt: new Date().toISOString()
    }
];
```

### **File 7: Registration Form with shadcn/ui** (18 minutes)

**Location:** `app/register/page.tsx`

```typescript
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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

const STAGES = ["Pre-seed", "Seed", "Series A", "Series B", "Series C+"] as const;

const CHECK_SIZES = [
    { label: "$250K - $500K", min: 250_000, max: 500_000 },
    { label: "$500K - $1M", min: 500_000, max: 1_000_000 },
    { label: "$1M - $3M", min: 1_000_000, max: 3_000_000 },
    { label: "$3M - $5M", min: 3_000_000, max: 5_000_000 },
    { label: "$5M - $10M", min: 5_000_000, max: 10_000_000 },
    { label: "$10M+", min: 10_000_000, max: 100_000_000 }
] as const;

const GEOGRAPHIES = ["US", "Europe", "Asia", "Latin America", "Global"] as const;

type FormData = {
    industries: string[];
    stages: string[];
    checkSizeIndex: number;
    geography: string[];
};

/**
 * Investor onboarding form
 *
 * Built with shadcn/ui components for:
 * - Consistent styling with Modern Minimal theme
 * - Accessible form controls
 * - Responsive layout
 * - Professional appearance
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

    const toggleArrayItem = (array: string[], item: string): string[] => {
        return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.industries.length === 0 || formData.stages.length === 0 || formData.geography.length === 0) {
            alert("Please select at least one option in each category");
            return;
        }

        setIsSubmitting(true);

        try {
            const checkSize = CHECK_SIZES[formData.checkSizeIndex];
            const linkedinAccount = user.externalAccounts.find((acc) => acc.provider === "oauth_linkedin");

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
                            We'll match you with the most relevant startups
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
```

### **File 8: Registration API** (5 minutes)

**Location:** `app/api/register/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dataStore } from "@/lib/storage";
import type { InvestorProfile } from "@/lib/types";

/**
 * POST /api/register
 *
 * Saves investor profile after onboarding
 *
 * Security:
 * - Clerk session required (enforced by middleware)
 * - CSRF protection via user ID verification
 * - Input validation and sanitization
 */
export async function POST(request: NextRequest) {
    try {
        // Verify authentication (async in Next.js 15 + Clerk v6)
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { clerkUserId, name, email, linkedinUrl, industries, stages, checkSize, geography } = body;

        // Validation
        if (
            !clerkUserId ||
            !name ||
            !email ||
            !Array.isArray(industries) ||
            industries.length === 0 ||
            !Array.isArray(stages) ||
            stages.length === 0 ||
            !checkSize ||
            typeof checkSize.min !== "number" ||
            typeof checkSize.max !== "number" ||
            !Array.isArray(geography) ||
            geography.length === 0
        ) {
            return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
        }

        // CSRF protection
        if (userId !== clerkUserId) {
            return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
        }

        // Create profile
        const profile: InvestorProfile = {
            id: `inv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            clerkUserId,
            name: String(name).trim(),
            email: String(email).trim().toLowerCase(),
            linkedinUrl: linkedinUrl ? String(linkedinUrl).trim() : undefined,
            industries: industries.map((i: string) => String(i).trim()),
            stages: stages.map((s: string) => String(s).trim()),
            checkSize: {
                min: Number(checkSize.min),
                max: Number(checkSize.max)
            },
            geography: geography.map((g: string) => String(g).trim()),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        dataStore.saveInvestor(profile);

        return NextResponse.json({
            success: true,
            profileId: profile.id
        });
    } catch (error) {
        console.error("❌ Registration error:", error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to register profile"
            },
            { status: 500 }
        );
    }
}
```

### **File 9: Match API with Vercel AI SDK** (8 minutes)

**Location:** `app/api/match/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dataStore } from "@/lib/storage";
import { findMatchesForInvestor } from "@/lib/aiMatching";
import { seedStartups } from "@/data/seedData";

// Initialize startup database
if (dataStore.getAllStartups().length === 0) {
    dataStore.seedStartups(seedStartups);
}

/**
 * GET /api/match
 *
 * Generates AI-powered startup matches using Vercel AI SDK
 *
 * Flow:
 * 1. Verify authentication
 * 2. Retrieve investor profile
 * 3. Get all startups
 * 4. Run matching algorithm (uses GPT-5 via Vercel AI SDK)
 * 5. Return top 5 matches
 *
 * Performance: 2-4 seconds (AI generation latency)
 */
export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const investor = dataStore.getInvestorByClerkId(userId);

        if (!investor) {
            return NextResponse.json(
                {
                    error: "Profile not found. Complete registration first.",
                    redirectTo: "/register"
                },
                { status: 404 }
            );
        }

        const startups = dataStore.getAllStartups();

        if (startups.length === 0) {
            return NextResponse.json({ error: "No startups available" }, { status: 500 });
        }

        // AI matching with Vercel AI SDK
        const matches = await findMatchesForInvestor(investor, startups);

        return NextResponse.json({
            matches,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("❌ Matching error:", error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Failed to generate matches"
            },
            { status: 500 }
        );
    }
}
```

### **File 10: Results Page with shadcn/ui** (20 minutes)

**Location:** `app/matches/page.tsx`

```typescript
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MatchResult } from "@/lib/types";

/**
 * AI-generated matches results page
 *
 * Features:
 * - Ranked startup list (1-5)
 * - Expandable cards with shadcn/ui
 * - AI-generated explanations and icebreakers
 * - Copy-to-clipboard functionality
 * - Loading states
 * - Mobile-responsive
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

    const copyIcebreaker = (icebreaker: string, id: string) => {
        navigator.clipboard.writeText(icebreaker);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

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

                {/* Matches */}
                <div className="space-y-6">
                    {matches.map((match) => (
                        <Card key={match.profile.id}>
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    {/* Rank */}
                                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                                        {match.rank}
                                    </div>

                                    {/* Company */}
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
                                                    "{match.icebreaker}"
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
```

### **File 11: Landing Page** (8 minutes)

**Location:** `app/page.tsx`

```typescript
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Landing page (public, server-rendered)
 *
 * Redirects authenticated users to onboarding.
 * Shows marketing content to visitors.
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
```

### **File 12: Sign-In Page** (2 minutes)

**Location:** `app/sign-in/[[...sign-in]]/page.tsx`

```typescript
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to find your next investment</p>
                </div>
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-xl"
                        }
                    }}
                />
            </div>
        </div>
    );
}
```

### **File 13: Sign-Up Page** (2 minutes)

**Location:** `app/sign-up/[[...sign-up]]/page.tsx`

```typescript
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Get Started</h1>
                    <p className="text-muted-foreground">Create your account to discover startups</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-xl"
                        }
                    }}
                />
            </div>
        </div>
    );
}
```

---

## ✅ Pre-Launch Checklist

### **Setup Verification**

-   [ ] Next.js 15 project created
-   [ ] All dependencies installed (Clerk, AI SDK, shadcn/ui, Zod)
-   [ ] shadcn/ui initialized with New York style
-   [ ] Modern Minimal theme applied to globals.css
-   [ ] Environment variables configured

### **Clerk Authentication**

-   [ ] Clerk account created
-   [ ] LinkedIn OIDC enabled (dev or prod)
-   [ ] API keys in `.env.local`
-   [ ] Middleware protecting routes
-   [ ] Sign-in/sign-up pages working

### **Features**

-   [ ] Landing page loads and redirects authenticated users
-   [ ] Registration form uses shadcn/ui components
-   [ ] Form validation works
-   [ ] Profile saves successfully
-   [ ] AI matching uses Vercel AI SDK
-   [ ] GPT-5 generates insights
-   [ ] Results display with shadcn/ui cards
-   [ ] Icebreaker copy works

### **UI/UX**

-   [ ] Modern Minimal theme visible throughout
-   [ ] All shadcn/ui components styled correctly
-   [ ] Mobile responsive
-   [ ] Loading states smooth
-   [ ] Error handling works

---

## 🎯 Why "InvestorFit"?

The name **InvestorFit** was chosen for strategic reasons:

**Dual Meaning:**

-   **For Investors:** Seeking startups with real traction
-   **For Startups:** Showcasing their traction to investors

**Professional & Memorable:**

-   Short, punchy, easy to remember
-   Immediately communicates value proposition
-   Works well for branding and marketing

**Domain Availability:**

-   Likely available as .com, .ai, .io
-   Clean, professional sound
-   No trademark conflicts

**Positioning:**

-   Emphasizes data-driven matching
-   Implies quality over quantity
-   Suggests momentum and growth

---

## 🚀 Key Technology Decisions

### **Why Vercel AI SDK over Direct OpenAI SDK?**

**Type Safety:**

-   Zod schema validation ensures correct output structure
-   TypeScript inference from schemas
-   Catch errors at compile time, not runtime

**Provider Flexibility:**

-   Swap providers with one line change
-   Future-proof for GPT-5, Claude, Gemini
-   No vendor lock-in

**Better DX:**

-   Cleaner API than raw OpenAI SDK
-   Automatic retries and error handling
-   Unified interface across all providers

**Code Comparison:**

```typescript
// ❌ Direct OpenAI SDK (old approach)
const response = await openai.chat.completions.create({
  model: 'gpt-5',
  messages: [...],
  response_format: { type: 'json_object' },
});
const parsed = JSON.parse(response.choices[0].message.content);
// No validation, manual parsing, error-prone

// ✅ Vercel AI SDK (new approach)
const { object } = await generateObject({
  model: openai('gpt-5'),
  schema: myZodSchema,
  prompt: '...',
});
// Type-safe, validated, auto-completed
```

### **Why shadcn/ui?**

**Full Control:**

-   Components live in your codebase
-   Modify anything without fighting abstractions
-   No version lock-in

**Accessibility:**

-   Built on Radix UI primitives
-   ARIA compliant out of the box
-   Keyboard navigation

**Consistency:**

-   Uses CSS variables from globals.css
-   Modern Minimal theme applied automatically
-   Cohesive design system

### **Why LinkedIn OIDC?**

**Professional Context:**

-   Investors and founders already have LinkedIn
-   Auto-populated profile data
-   Professional credibility

**Reduced Friction:**

-   One-click sign-up
-   No password to remember
-   Faster onboarding

---

## 📊 Performance & Costs

### **Expected Performance**

-   **Registration:** < 500ms
-   **AI Matching:** 2-4 seconds
-   **Page Load:** < 1 second

### **API Costs (per match)**

Using GPT-5 with Vercel AI SDK:

-   Input tokens: ~500 tokens/match = $0.0025
-   Output tokens: ~100 tokens/match = $0.0015
-   **Total:** ~$0.004 per match
-   **5 matches:** ~$0.02 per investor

### **Scaling Considerations**

-   **100 investors/day:** ~$2/day in API costs
-   **1,000 investors/day:** ~$20/day
-   **10,000 investors/day:** ~$200/day

---

## 🔄 Future Enhancements

### **Immediate (Next 2 hours)**

1. **Add Loading Skeletons** (30 min)

    - Use shadcn/ui Skeleton component
    - Better loading UX

2. **Add Toast Notifications** (20 min)

    - Replace `alert()` with shadcn/ui Toast
    - Better error handling

3. **Add Email Links** (10 min)
    - `mailto:` links for quick outreach
    - Pre-populate icebreaker in email body

### **Short-Term (Next Week)**

1. **Startup Registration** (4 hours)

    - Self-service signup for startups
    - Profile creation form
    - Admin approval workflow

2. **Match History** (2 hours)

    - Store past matches per investor
    - "Already seen" filtering
    - Match feedback (thumbs up/down)

3. **Convex Database Migration** (2 hours)
    - Replace in-memory storage
    - Real-time sync
    - Persistent data

### **Medium-Term (Next Month)**

1. **Advanced Filters** (4 hours)

    - Business model (B2B, B2C)
    - Team size, traction thresholds
    - Founder background

2. **Email Integration** (6 hours)

    - Send icebreakers via email
    - Track opens/replies
    - Follow-up automation

3. **Analytics Dashboard** (8 hours)
    - Match conversion rates
    - Popular industries
    - User engagement metrics

---

## 🎭 2-Minute Demo Script

### **Opening (15 seconds)**

"Investors meet hundreds of startups at conferences. How do you find the RIGHT ones? Most networking is random. InvestorFit makes it strategic using AI."

### **Demo Flow (90 seconds)**

**Act 1: Authentication (15s)**

1. Show landing page: "Find Your Next Investment"
2. Click "Get Started with LinkedIn"
3. Authenticate via LinkedIn OIDC
4. Auto-redirect to onboarding

**Act 2: Onboarding (30s)**

1. Show shadcn/ui form with Modern Minimal theme
2. Select criteria:
    - Industries: Healthcare, AI/ML
    - Stages: Series A
    - Check: $1M-$3M
    - Geography: US, Asia
3. Click "Find My Matches"
4. Show AI loading animation

**Act 3: Results (45s)**

1. 5 ranked matches appear
2. Highlight #1: HealthScope AI
3. Show AI explanation: "Strong Healthcare + Series A alignment"
4. Expand card to reveal icebreaker
5. Click "Copy Message"
6. Show: "Ready to reach out"

### **Closing (15 seconds)**

"Every connection is AI-curated, ranked by relevance, and ready to act on. Perfect for demo days, conferences, or investor sourcing. Built in 2 hours. Costs $0.02 per investor."

---

## 🚨 Troubleshooting

### **Issue: LinkedIn OAuth Not Working**

**Symptoms:** Redirect to error page after LinkedIn auth

**Solutions:**

1. Verify LinkedIn app has "OpenID Connect" product enabled
2. Check redirect URL matches Clerk's callback URL exactly
3. Confirm Client ID and Secret are correct in Clerk
4. Try incognito mode to clear cached tokens
5. Check Clerk logs for detailed error messages

### **Issue: shadcn/ui Components Not Styled**

**Symptoms:** Buttons or cards look unstyled

**Solutions:**

1. Verify `globals.css` has Modern Minimal theme
2. Check `tailwind.config.ts` extends theme with CSS variables
3. Restart dev server: `pnpm dev`
4. Clear Next.js cache: `rm -rf .next`
5. Verify component imports use `@/components/ui/*`

### **Issue: Vercel AI SDK Errors**

**Symptoms:** `generateObject` throws errors

**Solutions:**

1. Verify OpenAI API key is valid
2. Check API key has GPT-5 access
3. Verify Zod schema is valid
4. Check network connectivity
5. Review error logs for specific issue

### **Issue: Matches Not Generating**

**Symptoms:** Stuck on loading or 404

**Solutions:**

1. Check seed data loaded: Look for "Seeded X startups" log
2. Verify profile saved: Check "Saved: inv-..." log
3. Check browser console for errors
4. Verify API routes not blocked by middleware
5. Test API directly: `curl http://localhost:3000/api/match`

---

## 📚 Official Documentation

-   **Next.js 15:** https://nextjs.org/docs
-   **Clerk Quickstart:** https://clerk.com/docs/nextjs/getting-started/quickstart
-   **LinkedIn OIDC:** https://clerk.com/docs/guides/configure/auth-strategies/social-connections/linkedin-oidc
-   **shadcn/ui:** https://ui.shadcn.com/docs/installation/next
-   **Vercel AI SDK:** https://ai-sdk.dev/docs/introduction
-   **OpenAI Provider:** https://ai-sdk.dev/providers/ai-sdk-providers/openai
-   **Modern Minimal Theme:** https://tweakcn.com/editor/theme?theme=modern-minimal

---

## 🎯 Success Criteria

After 2 hours, you should have:

✅ **Functional MVP** with complete end-to-end flow  
✅ **LinkedIn OAuth** working via Clerk  
✅ **shadcn/ui components** with Modern Minimal theme  
✅ **Vercel AI SDK** generating structured insights with GPT-5  
✅ **Type-safe** with Zod schemas and TypeScript  
✅ **Professional UI** ready for demos  
✅ **Mobile-responsive** design  
✅ **Low cost** (~$0.02 per investor)

---

**Ready to build InvestorFit! 🚀**
