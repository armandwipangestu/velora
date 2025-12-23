"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface GiscusProps {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
    mapping?: "pathname" | "url" | "title" | "og:title" | "specific";
    term?: string;
}

export default function Giscus({
    repo = "armandwipangestu/velora",
    repoId = "R_kgDOQsjyhA",
    category = "Blog-Comments",
    categoryId = "DIC_kwDOQsjyhM4C0KEL",
    mapping = "pathname",
    term,
}: GiscusProps) {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.async = true;
        script.crossOrigin = "anonymous";

        script.setAttribute("data-repo", repo);
        script.setAttribute("data-repo-id", repoId);
        script.setAttribute("data-category", category);
        script.setAttribute("data-category-id", categoryId);
        script.setAttribute("data-mapping", mapping);
        if (mapping === "specific" && term)
            script.setAttribute("data-term", term);

        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "bottom");
        script.setAttribute("data-theme", resolvedTheme || "light");
        script.setAttribute("data-lang", "en");

        const container = document.getElementById("giscus-thread");
        if (container) {
            container.innerHTML = "";
            container.appendChild(script);
        }
    }, [mounted, repo, repoId, category, categoryId, mapping, term]);

    useEffect(() => {
        if (!mounted) return;

        const iframe = document.querySelector<HTMLIFrameElement>(
            "iframe.giscus-frame"
        );
        if (iframe) {
            iframe.contentWindow?.postMessage(
                { giscus: { setConfig: { theme: resolvedTheme || "light" } } },
                "https://giscus.app"
            );
        }
    }, [resolvedTheme, mounted]);

    if (!mounted)
        return (
            <div className="mt-10 min-h-[300px] bg-muted/5 animate-pulse rounded-xl" />
        );

    return <div id="giscus-thread" className="mt-10 w-full" />;
}

