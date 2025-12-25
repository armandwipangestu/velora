"use client"

import React from "react";
import { cn } from "@/lib/utils";

interface IconConfig {
    Icon: React.ComponentType<{
        width?: number;
        height?: number;
        className?: string;
        color?: string;
    }>;
    label: string;
    color?: string;
}

interface InfiniteSliderProps {
    title?: string;
    icons: IconConfig[];
    direction?: "left" | "right";
    iconSize?: number;
    spacing?: "compact" | "normal" | "wide";
}

const getSpacingClass = (spacing: "compact" | "normal" | "wide"): string => {
    switch (spacing) {
        case "compact":
            return "w-20";
        case "wide":
            return "w-40";
        default:
            return "w-31.25"; // 125px
    }
};

export const InfiniteSlider = ({
    title,
    icons,
    direction = "left",
    iconSize = 45,
    spacing = "normal",
}: InfiniteSliderProps) => {
    const getSpacingValue = () => {
        if (spacing === "compact") return 80;
        if (spacing === "wide") return 160;
        return 125;
    };

    const itemWidth = getSpacingValue();
    const spacingClass = getSpacingClass(spacing);
    const duration = icons.length * 3;

    return (
        <div className="mb-8">
            {title && (
                <div
                    className={cn(
                        "max-w-[42rem] mx-auto lg:mx-0 mb-4 flex flex-col",
                        direction === "right" ? "items-end text-right" : "items-start text-left"
                    )}
                >
                    <h3 className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.2em] uppercase">
                        {title}
                    </h3>
                    <div className="h-[2px] w-6 bg-primary/40 mt-1.5 rounded-full" />
                </div>
            )}

            <div className="relative mx-auto lg:mx-0 w-full max-w-[42rem] overflow-hidden bg-background/50 py-4">
                <div className="absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />

                <div
                    className={cn(
                        "animate-infinite-slider flex transition-all hover:paused cursor-pointer",
                        direction === "right" && "[animation-direction:reverse]"
                    )}
                    style={{
                        width: `${icons.length * 2 * itemWidth}px`,
                        animationDuration: `${duration}s`,
                    }}
                >
                    {[...icons, ...icons].map((config, index) => (
                        <div
                            className={cn(
                                "flex flex-col items-center justify-center flex-shrink-0 group",
                                spacingClass
                            )}
                            key={index}
                        >
                            <config.Icon
                                width={iconSize}
                                height={iconSize}
                                color={config.color}
                                className={cn(
                                    "transition-all duration-300 group-hover:scale-110",
                                    !config.color && "text-foreground"
                                )}
                            />
                            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors mt-3 tracking-wide">
                                {config.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
