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
import { VersionBadge } from "../ui/version-badge";

const navLinks = [
    { href: "/guide/introduction", label: "Guide" },
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

                    <div className="relative flex items-center">
                        <VersionBadge />
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

                    <div className="flex items-center gap-1 sm:gap-2 ml-2">
                        <ThemeToggle />
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "hidden md:flex"
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