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

// Helper to extract all IDs recursively
function getAllIds(items: TocItem[]): string[] {
    return items.reduce<string[]>((acc, item) => {
        acc.push(item.url.slice(1));
        if (item.items) {
            acc.push(...getAllIds(item.items));
        }
        return acc;
    }, []);
}

function TocList({ items, activeId, level = 1 }: { items: TocItem[], activeId: string, level?: number }) {
    if (!items?.length) return null;
    return (
        <ul className={cn("m-0 list-none text-sm", { "pl-4": level !== 1 })}>
            {items.map((item) => {
                const isActive = item.url === `#${activeId}`
                return (
                    <li key={item.url} className="mt-2 text-muted-foreground transition-colors hover:text-foreground">
                        <a
                            href={item.url}
                            className={cn(
                                "inline-block no-underline transition-colors hover:text-foreground",
                                isActive
                                    ? "font-medium text-foreground text-primary" // Highlight active text
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.title}
                        </a>
                        {/* Recursive call for nested items */}
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
    const itemIds = getAllIds(items);
    const activeId = useActiveItem(itemIds);

    if (!items.length) return null;

    return (
        <div className="space-y-2">
            <h3 className="font-medium pb-2 mb-2">On This Page</h3>
            <div className="relative max-h-[calc(100vh-100px)] overflow-y-auto pb-4">
                <div className="relative pl-0 border-l border-border">
                    <ul className="m-0 list-none text-sm">
                        {items.map((item) => (
                            <TocItemRenderer key={item.url} item={item} activeId={activeId} level={1} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function TocItemRenderer({ item, activeId, level }: { item: TocItem, activeId: string, level: number }) {
    const isActive = item.url === `#${activeId}`;
    return (
        <li className="mt-0">
            <a
                href={item.url}
                className={cn(
                    "block no-underline transition-colors hover:text-foreground -ml-px border-l-2 py-2 pr-2",
                    isActive
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground"
                )}
                style={{ paddingLeft: `${level === 1 ? 16 : 16 + (level - 1) * 12}px` }}
            >
                {item.title}
            </a>
            {item.items?.length ? (
                <ul className="m-0 list-none">
                    {item.items.map(sub => (
                        <TocItemRenderer key={sub.url} item={sub} activeId={activeId} level={level + 1} />
                    ))}
                </ul>
            ) : null}
        </li>
    )
}

function MobileTocList({ items, activeId, setOpen }: { items: TocItem[], activeId: string, setOpen: (open: boolean) => void }) {
    if (!items?.length) return null;
    return (
        <ul className="list-none space-y-3 pl-4">
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
                        <MobileTocList items={item.items} activeId={activeId} setOpen={setOpen} />
                    ) : null}
                </li>
            ))}
        </ul>
    )
}


export function MobileToc({ items }: TocProps) {
    const itemIds = getAllIds(items);
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
            <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto pb-10">
                <SheetHeader className="text-left mb-4">
                    <SheetTitle>Table of Contents</SheetTitle>
                </SheetHeader>
                {/* Use the recursive list component */}
                <div className="mx-5">
                    <ul className="list-none space-y-3">
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
                                    <MobileTocList items={item.items} activeId={activeId} setOpen={setOpen} />
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </SheetContent>
        </Sheet>
    );
}
