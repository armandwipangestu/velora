"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 p-1 bg-muted rounded-full w-24 h-9">
                <div className="w-7 h-7 rounded-full" />
                <div className="w-7 h-7 rounded-full" />
                <div className="w-7 h-7 rounded-full" />
            </div>
        );
    }

    const options = [
        { value: "light", icon: Sun },
        { value: "dark", icon: Moon },
        { value: "system", icon: Monitor },
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-muted/50 border border-border rounded-full ring-offset-background">
            {options.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={cn(
                            "p-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            isActive
                                ? "bg-background text-foreground shadow-sm scale-110"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                        aria-label={`Set ${option.value} theme`}
                    >
                        <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                    </button>
                );
            })}
        </div>
    );
}
