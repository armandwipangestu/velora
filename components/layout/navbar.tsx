"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
    { href: "/guide", label: "Guide" },
    { href: "/reference", label: "Reference" },
    { href: "/examples", label: "Examples" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 md:gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Icons.logo className="h-8 w-8" />
                        <span className="hidden font-bold sm:inline-block text-xl">
                            {siteConfig.name}
                        </span>
                    </Link>

                    <div className="relative hidden md:flex items-center ml-4">
                        <button className="flex h-9 w-64 items-center justify-between rounded-md border border-input bg-muted/50 px-3 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors">
                            <span className="flex items-center">
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </span>
                            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                <span className="text-xs">Ctrl</span>K
                            </kbd>
                        </button>
                    </div>
                </div>

                <nav className="flex items-center gap-4 md:gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-primary",
                                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
                        <ThemeToggle />
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "hidden sm:flex"
                            )}
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <MobileNav />
                    </div>
                </nav>
            </div>
        </header>
    );
}