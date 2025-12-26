"use client"

import { useState, useCallback, useEffect } from "react"
import { Search } from "lucide-react"
import { BookOpenText } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";

export function BlogHeader() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") || "")
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
        },
        []
    )

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const currentQuery = params.get("query") || "";

        if (debouncedSearchQuery === currentQuery) {
            return;
        }

        if (debouncedSearchQuery) {
            params.set("query", debouncedSearchQuery);
        } else {
            params.delete("query");
        }
        params.set("page", "1"); // Reset to first page on search
        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedSearchQuery, pathname, router, searchParams]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Super (Windows/CMD) + / for focus search
            if ((e.metaKey || e.ctrlKey) && e.key === "/") {
                e.preventDefault();
                const input = document.getElementById(
                    "blog-search-input"
                ) as HTMLInputElement;
                if (input) {
                    input.focus()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <div className="relative w-full overflow-hidden py-20 md:py-32">
            {/* Layer 2: Grid Pattern - Light Mode */}
            <div
                className="absolute inset-0 z-0 dark:hidden"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
                    backgroundSize: "6rem 4rem",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    opacity: 0.85,
                }}
            />

            {/* Layer 2: Grid Pattern - Dark Mode */}
            <div
                className="absolute inset-0 z-0 hidden dark:block"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "6rem 4rem",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    opacity: 0.8,
                }}
            />

            {/* Content */}
            <div className="section-container relative z-10 mt-5">
                <div className="mx-auto max-w-5xl text-center">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                            <BookOpenText />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                        <span className="text-primary">Blog</span>
                    </h1>

                    {/* Description */}
                    <p className="mb-8 text-lg text-muted-foreground">
                        Browse articles about all things web dev.
                    </p>

                    {/* Search Input */}
                    <div className="relative mx-auto max-w-md">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                        <input
                            id="blog-search-input"
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full rounded-lg border border-input bg-background px-10 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {/* Shortcut - Hidden on mobile */}
                        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-muted-foreground/20 bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground sm:inline-block">
                            ⌘ + /
                        </kbd>
                    </div>
                </div>
            </div>
        </div>
    )
}