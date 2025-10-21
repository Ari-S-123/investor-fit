import { SignIn } from "@clerk/nextjs";

/**
 * Sign-in page using Clerk authentication
 *
 * The [[...sign-in]] catch-all route pattern allows Clerk to handle all sign-in flows:
 * - /sign-in (main sign-in)
 * - /sign-in/verify (email verification)
 * - /sign-in/sso-callback (SSO redirect)
 *
 * @returns Centered sign-in component with custom branding
 */
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

