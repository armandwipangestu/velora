"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    title: string;
    url: string;
    items?: TocItem[];
}

interface DocsTocProps {
    items: TocItem[];
}

export function DocsToc({ items }: DocsTocProps) {
    const [activeId, setActiveId] = useState<string>("");
    const itemIds = useRef<string[]>([]);

    useEffect(() => {
        const extractIds = (items: TocItem[]): string[] => {
            let ids: string[] = [];
            items.forEach((item) => {
                ids.push(item.url.replace("#", ""));
                if (item.items) {
                    ids.push(...extractIds(item.items));
                }
            });
            return ids;
        };

        itemIds.current = extractIds(items);

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

        itemIds.current.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    if (!items?.length) {
        return null;
    }

    return (
        <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                On this page
            </p>
            <ul className="m-0 list-none text-sm">
                {items.map((item, index) => (
                    <TocNavInternalItem key={index} item={item} activeId={activeId} />
                ))}
            </ul>
        </div>
    );
}

function TocNavInternalItem({
    item,
    activeId,
    level = 0,
}: {
    item: TocItem;
    activeId: string;
    level?: number;
}) {
    const id = item.url.replace("#", "");
    const isActive = activeId === id;

    return (
        <li className={cn("mt-0 pt-2", level > 0 && "pl-4")}>
            <a
                href={item.url}
                className={cn(
                    "inline-block no-underline transition-colors hover:text-primary",
                    isActive ? "font-medium text-primary" : "text-muted-foreground"
                )}
            >
                {item.title}
            </a>
            {item.items && item.items.length > 0 && (
                <ul className="m-0 list-none">
                    {item.items.map((subItem, index) => (
                        <TocNavInternalItem
                            key={index}
                            item={subItem}
                            activeId={activeId}
                            level={level + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
