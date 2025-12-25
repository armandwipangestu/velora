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
            const ids: string[] = [];
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

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.2em] text-foreground/70 uppercase px-3">
                On this page
            </p>
            <ul className="m-0 list-none text-[13px] font-medium leading-relaxed border-l border-border/40">
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
        <li className="mt-0">
            <a
                href={item.url}
                style={{ paddingLeft: `${(level + 1) * 12}px` }}
                className={cn(
                    "block no-underline transition-all duration-200 hover:text-primary py-1.5 pr-3 border-l-2 -ml-px",
                    isActive
                        ? "font-bold text-primary border-primary bg-primary/5"
                        : "text-muted-foreground/80 border-transparent"
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
