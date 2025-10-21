import { SignUp } from "@clerk/nextjs";

/**
 * Sign-up page using Clerk authentication
 *
 * The [[...sign-up]] catch-all route pattern allows Clerk to handle all sign-up flows:
 * - /sign-up (main sign-up)
 * - /sign-up/verify (email verification)
 * - /sign-up/sso-callback (LinkedIn OAuth callback)
 *
 * After successful sign-up, users are redirected to /register (configured in .env.local)
 *
 * @returns Centered sign-up component with custom branding
 */
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

