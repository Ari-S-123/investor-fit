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
const isProtectedRoute = createRouteMatcher([
    "/register(.*)",
    "/matches(.*)",
    "/api/register(.*)",
    "/api/match(.*)"
]);

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