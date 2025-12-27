"use client"

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { List } from "lucide-react";

interface TocItem {
    title: string;
    url: string;
    items?: TocItem[];
}

interface TocProps {
    items: TocItem[];
}

function useActiveItem(itemIds: string[]) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        itemIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [itemIds]);

    return activeId;
}

function TocList({ items, activeId, level = 1 }: { items: TocItem[], activeId: string, level?: number }) {
    if (!items?.length) return null;
    return (
        <ul className={cn("m-0 list-none", { "pl-4": level !== 1 })}>
            {items.map((item) => {
                return (
                    <li key={item.url} className="mt-0 pt-2">
                        <a
                            href={item.url}
                            className={cn(
                                "inline-block no-underline transition-colors hover:text-foreground",
                                item.url === `#${activeId}`
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.title}
                        </a>
                        {item.items?.length ? (
                            <TocList items={item.items} activeId={activeId} level={level + 1} />
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
}

export function TocSidebar({ items }: TocProps) {
    const itemIds = items.flatMap(item => [item.url.slice(1), ...(item.items?.map(sub => sub.url.slice(1)) || [])]).filter(Boolean);
    const activeId = useActiveItem(itemIds);

    if (!items.length) return null;

    return (
        <div className="space-y-2">
            <p className="font-medium">On This Page</p>
            <TocList items={items} activeId={activeId} />
        </div>
    );
}

export function MobileToc({ items }: TocProps) {
    const itemIds = items.flatMap(item => [item.url.slice(1), ...(item.items?.map(sub => sub.url.slice(1)) || [])]).filter(Boolean);
    const activeId = useActiveItem(itemIds);
    const [open, setOpen] = useState(false);

    if (!items.length) return null;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg md:hidden">
                    <List className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader className="text-left">
                    <SheetTitle>Table of Contents</SheetTitle>
                </SheetHeader>
                <div className="mt-4 max-h-[80vh] overflow-y-auto">
                    {/* Re-implementing list to handle closing sheet on click */}
                    <ul className="m-0 list-none space-y-3">
                        {items.map((item) => (
                            <li key={item.url} className="space-y-2">
                                <a
                                    href={item.url}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "block no-underline transition-colors hover:text-foreground",
                                        item.url === `#${activeId}` ? "font-medium text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    {item.title}
                                </a>
                                {item.items?.length ? (
                                    <ul className="pl-4 space-y-2 list-none">
                                        {item.items.map(sub => (
                                            <li key={sub.url}>
                                                <a
                                                    href={sub.url}
                                                    onClick={() => setOpen(false)}
                                                    className={cn(
                                                        "block no-underline transition-colors hover:text-foreground",
                                                        sub.url === `#${activeId}` ? "font-medium text-primary" : "text-muted-foreground"
                                                    )}
                                                >
                                                    {sub.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    );
}
