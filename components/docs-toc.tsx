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

    return (
        <div className="space-y-4">
            <p className="text-[10px] font-black tracking-[0.2em] text-foreground/70 uppercase">
                On this page
            </p>
            <ul className="m-0 list-none text-[13px] font-medium leading-relaxed">
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
    return (
        <li className={cn("mt-0 pt-3", level > 0 && "pl-4 border-l ml-1")}>
            <a
                href={item.url}
                className={cn(
                    "inline-block no-underline transition-all duration-200 hover:text-primary",
                    isActive
                        ? "font-bold text-primary translate-x-1"
                        : "text-muted-foreground/80"
                )}
            >
                {item.title}
            </a>
            {item.items && item.items.length > 0 && (
                <ul className="m-0 list-none mt-1">
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
