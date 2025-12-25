"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface DocsPagerProps {
    prev?: {
        title: string;
        href: string;
    } | null;
    next?: {
        title: string;
        href: string;
    } | null;
}

export function DocsPager({ prev, next }: DocsPagerProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-12">
            {prev ? (
                <Link
                    href={prev.href}
                    className={cn(buttonVariants({ variant: "outline" }), "h-auto py-5 px-6 gap-4 justify-start border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group")}
                >
                    <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="flex flex-col items-start gap-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Previous</span>
                        <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{prev.title}</span>
                    </div>
                </Link>
            ) : (
                <div />
            )}
            {next ? (
                <Link
                    href={next.href}
                    className={cn(buttonVariants({ variant: "outline" }), "h-auto py-5 px-6 gap-4 justify-end text-right border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group")}
                >
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Next</span>
                        <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{next.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}
