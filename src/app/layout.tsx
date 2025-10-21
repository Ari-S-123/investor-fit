import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
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
 * Root layout with Clerk authentication context and theme support
 *
 * In Clerk v6:
 * - ClerkProvider is hybrid (client + server)
 * - Does NOT force dynamic rendering
 * - Supports Partial Prerendering (PPR)
 *
 * Theme Provider:
 * - Manages light/dark mode
 * - Persists user preference
 * - Supports system theme detection
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
            <html lang="en" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <div className="fixed top-4 right-4 z-50">
                            <ModeToggle />
                        </div>
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

