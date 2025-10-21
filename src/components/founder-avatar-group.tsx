"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Founder } from "@/lib/types";

/**
 * Props for FounderAvatarGroup component
 */
type FounderAvatarGroupProps = {
    /** Array of founders to display */
    founders: Founder[];

    /** Maximum number of avatars to show before "+N" indicator */
    maxDisplay?: number;
};

/**
 * Display a group of founder avatars in an overlapping cluster
 *
 * This component renders founder profile images in a visually appealing
 * overlapping layout, commonly used in team displays. Shows up to a
 * specified number of avatars with overflow indication.
 *
 * Features:
 * - Overlapping avatar layout with negative margin
 * - Fallback to initials if image fails to load
 * - Overflow indicator for large teams (e.g., "+2")
 * - Hover tooltips showing founder names
 * - Responsive sizing
 *
 * @param founders - Array of founder objects with name and avatarUrl
 * @param maxDisplay - Maximum avatars to show (default: 3)
 * @returns Rendered avatar group component
 *
 * @example
 * ```tsx
 * <FounderAvatarGroup
 *   founders={[
 *     { name: "John Doe", avatarUrl: "https://..." },
 *     { name: "Jane Smith", avatarUrl: "https://..." }
 *   ]}
 *   maxDisplay={3}
 * />
 * ```
 */
export function FounderAvatarGroup({ founders, maxDisplay = 3 }: FounderAvatarGroupProps) {
    if (!founders || founders.length === 0) {
        return null;
    }

    const displayedFounders = founders.slice(0, maxDisplay);
    const remainingCount = Math.max(0, founders.length - maxDisplay);

    /**
     * Generate initials from founder name for fallback display
     *
     * Takes the first character of first and last name.
     * Falls back to first two characters if single word.
     *
     * @param name - Full name of founder
     * @returns Two-character initials (e.g., "JD")
     */
    const getInitials = (name: string): string => {
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div className="flex items-center">
            <div className="flex -space-x-2">
                {displayedFounders.map((founder, index) => (
                    <div
                        key={`${founder.name}-${index}`}
                        className="relative group"
                        title={founder.name}
                    >
                        <Avatar className="w-10 h-10 border-2 border-background hover:z-10 transition-all hover:scale-110">
                            <AvatarImage src={founder.avatarUrl} alt={founder.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                {getInitials(founder.name)}
                            </AvatarFallback>
                        </Avatar>
                        
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {founder.name}
                        </div>
                    </div>
                ))}

                {/* Overflow indicator */}
                {remainingCount > 0 && (
                    <div
                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-muted border-2 border-background text-xs font-semibold text-muted-foreground"
                        title={`+${remainingCount} more founder${remainingCount > 1 ? "s" : ""}`}
                    >
                        +{remainingCount}
                    </div>
                )}
            </div>
        </div>
    );
}

