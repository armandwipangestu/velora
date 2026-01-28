"use client";

import { useEffect, useRef } from "react";
import { phCapture } from "@/lib/posthog";

interface ScrollDepthOptions {
    thresholds?: number[];
    enabled?: boolean;
    metadata?: Record<string, unknown>;
}

export function useScrollDepth({
    thresholds = [25, 50, 75, 100],
    enabled = true,
    metadata = {},
}: ScrollDepthOptions = {}) {
    const reachedThresholds = useRef<Set<number>>(new Set());

    useEffect(() => {
        if (!enabled) return;

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const clientHeight = window.innerHeight || document.documentElement.clientHeight;
            
            const scrollPercentage = Math.round(
                ((scrollTop + clientHeight) / scrollHeight) * 100
            );

            thresholds.forEach((threshold) => {
                if (
                    scrollPercentage >= threshold &&
                    !reachedThresholds.current.has(threshold)
                ) {
                    reachedThresholds.current.add(threshold);
                    phCapture("scroll_depth_reached", {
                        percentage: threshold,
                        ...metadata,
                    });
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [enabled, thresholds, metadata]);

    return null;
}
