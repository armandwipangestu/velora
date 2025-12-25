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
        <div className="flex flex-row items-center justify-between py-12">
            {prev ? (
                <Link
                    href={prev.href}
                    className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
                >
                    <ChevronLeft className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Previous</span>
                        <span className="text-sm font-semibold">{prev.title}</span>
                    </div>
                </Link>
            ) : (
                <div />
            )}
            {next && (
                <Link
                    href={next.href}
                    className={cn(buttonVariants({ variant: "outline" }), "gap-2 ml-auto text-right")}
                >
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Next</span>
                        <span className="text-sm font-semibold">{next.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            )}
        </div>
    );
}
