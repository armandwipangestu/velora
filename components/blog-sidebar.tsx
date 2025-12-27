"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogSidebarProps {
    tags: Record<string, number>;
}

export function BlogSidebar({ tags }: BlogSidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSort = searchParams.get("sort") || "newest";
    const currentPerPage = searchParams.get("perPage") || "5";
    const currentTag = searchParams.get("tag") || "";

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <aside className="w-full space-y-8">
            {/* Sorting and Per Page */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Sort By</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between cursor-pointer">
                                {currentSort === "newest" ? "Newest" : "Oldest"}
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuItem onClick={() => updateParams("sort", "newest")} className="cursor-pointer">
                                Newest
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateParams("sort", "oldest")} className="cursor-pointer">
                                Oldest
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Posts Per Page</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between cursor-pointer">
                                {currentPerPage} Posts
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            {["5", "10", "15", "20"].map((num) => (
                                <DropdownMenuItem key={num} onClick={() => updateParams("perPage", num)} className="cursor-pointer">
                                    {num} Posts
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Tags List */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Popular Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2 lg:items-start">
                    <Button
                        variant={currentTag === "" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => updateParams("tag", "")}
                        className="h-8 justify-start text-xs cursor-pointer"
                    >
                        All Posts
                    </Button>
                    {Object.entries(tags).sort((a, b) => b[1] - a[1]).map(([tag, count]) => (
                        <Button
                            key={tag}
                            variant={currentTag === tag ? "default" : "ghost"}
                            size="sm"
                            onClick={() => updateParams("tag", tag)}
                            className="h-8 justify-start text-xs cursor-pointer"
                        >
                            #{tag} <span className="ml-1 opacity-50">({count})</span>
                        </Button>
                    ))}
                </div>
            </div>
        </aside>
    );
}
