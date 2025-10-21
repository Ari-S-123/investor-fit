"use client"

import { SignOutButton, useUser } from "@clerk/nextjs"
import { LogOutIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

/**
 * User menu component with avatar and dropdown functionality
 *
 * This component displays the authenticated user's avatar in the top navigation.
 * Clicking the avatar reveals a dropdown menu with user information and sign-out option.
 *
 * Features:
 * - Displays user's profile image or fallback initials
 * - Shows user's full name and email in dropdown
 * - Provides sign-out functionality via Clerk
 * - Loading state handling
 *
 * @returns Avatar dropdown menu for authenticated users, or null if not loaded
 *
 * @example
 * ```tsx
 * <UserMenu />
 * ```
 */
export function UserMenu() {
    const { user, isLoaded } = useUser()

    // Don't render until user data is loaded
    if (!isLoaded) {
        return null
    }

    // Don't render if no user is signed in
    if (!user) {
        return null
    }

    /**
     * Generate user initials from full name or email
     *
     * @returns Two-letter initials in uppercase
     */
    const getInitials = (): string => {
        if (user.fullName) {
            const names = user.fullName.split(" ")
            if (names.length >= 2) {
                return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
            }
            return user.fullName.slice(0, 2).toUpperCase()
        }
        if (user.primaryEmailAddress?.emailAddress) {
            return user.primaryEmailAddress.emailAddress.slice(0, 2).toUpperCase()
        }
        return "U"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="relative flex size-8 shrink-0 overflow-hidden rounded-full cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label="User menu"
                >
                    <Avatar>
                        <AvatarImage
                            src={user.imageUrl}
                            alt={user.fullName || "User avatar"}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials()}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.fullName || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.primaryEmailAddress?.emailAddress || ""}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <a href="/profile" className="flex items-center">
                        <UserIcon className="mr-2 size-4" />
                        <span>Profile</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <SignOutButton>
                    <DropdownMenuItem className="cursor-pointer" variant="destructive">
                        <LogOutIcon className="mr-2 size-4" />
                        <span>Sign out</span>
                    </DropdownMenuItem>
                </SignOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

