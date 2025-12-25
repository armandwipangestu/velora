"use client";

import { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocsMobileNavProps {
    sidebar: React.ReactNode;
    toc: React.ReactNode;
}

export function DocsMobileNav({ sidebar, toc }: DocsMobileNavProps) {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openToc, setOpenToc] = useState(false);

    return (
        <div className="sticky top-16 z-40 flex h-12 w-full items-center justify-between border-b bg-background/95 backdrop-blur md:hidden px-4">
            <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
                <SheetTrigger asChild>
                    <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Menu className="h-4 w-4" />
                        <span>Menu</span>
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] p-0 pt-16">
                    <SheetTitle className="sr-only">Documentation Menu</SheetTitle>
                    <SheetDescription className="sr-only">Navigate through documentation</SheetDescription>
                    <ScrollArea className="h-full px-4">
                        {sidebar}
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <Sheet open={openToc} onOpenChange={setOpenToc}>
                <SheetTrigger asChild>
                    <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <span>On this page</span>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] p-0 pt-16">
                    <SheetTitle className="sr-only">Table of Contents</SheetTitle>
                    <SheetDescription className="sr-only">Quick links for this page</SheetDescription>
                    <ScrollArea className="h-full px-6">
                        <div className="py-8">
                            {toc}
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}
