"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export interface SidebarItem {
    title: string;
    href?: string;
    items?: SidebarItem[];
    order?: number;
}

export interface SidebarGroup {
    title: string;
    items: SidebarItem[];
}

interface DocsSidebarProps {
    items: SidebarGroup[];
}

export function DocsSidebar({ items }: DocsSidebarProps) {
    const pathname = usePathname();

    if (!items?.length) {
        return null;
    }

    return (
        <aside className="w-full">
            <div className="flex flex-col gap-6 py-8">
                {items.map((group, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <h4 className="px-2 text-sm font-black tracking-tight text-foreground/90 uppercase">
                            {group.title}
                        </h4>
                        <div className="flex flex-col gap-1 border-l border-border/50 ml-2">
                            {group.items.map((item, i) => (
                                <SidebarNavInternalItem key={i} item={item} pathname={pathname} level={0} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}

function SidebarNavInternalItem({
    item,
    pathname,
    level,
}: {
    item: SidebarItem;
    pathname: string | null;
    level: number;
}) {
    const [isOpen, setIsOpen] = useState(true);
    const hasItems = item.items && item.items.length > 0;
    const isActive = pathname === item.href;

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                {item.href ? (
                    <Link
                        href={item.href}
                        className={cn(
                            "flex w-full items-center py-1.5 px-3 text-sm transition-colors hover:text-primary",
                            isActive
                                ? "font-semibold text-primary border-l-2 border-primary -ml-[2px] bg-primary/5"
                                : "text-muted-foreground",
                            level > 0 && "pl-6"
                        )}
                    >
                        {item.title}
                    </Link>
                ) : (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "flex w-full items-center py-1.5 px-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
                            level > 0 && "pl-6"
                        )}
                    >
                        <span>{item.title}</span>
                        {hasItems && (
                            <ChevronRight
                                className={cn(
                                    "ml-auto h-4 w-4 transition-transform",
                                    isOpen && "rotate-90"
                                )}
                            />
                        )}
                    </button>
                )}
            </div>
            {hasItems && isOpen && (
                <div className="flex flex-col">
                    {item.items?.map((subItem, index) => (
                        <SidebarNavInternalItem
                            key={index}
                            item={subItem}
                            pathname={pathname}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
