"use client";

import React, { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { languageIcons, languageColors } from "./mdx-pre"
import { FileCode } from "lucide-react"

interface CodeGroupProps {
    children: React.ReactNode
}

export function CodeGroup({ children }: CodeGroupProps) {
    const [activeIndex, setActiveIndex] = useState(0)

    const tabs = useMemo(() => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null

            const props = child.props as {
                "data-title"?: string
                "data-language"?: string
                "data-icon"?: string
                "data-icon-color"?: string
            }

            const title = props["data-title"] || props["data-language"] || "Code"
            const iconName = props["data-icon"]
            const language = props["data-language"] || "text"
            const iconColorEnabled = props["data-icon-color"] !== "false"

            const iconElement = (iconName && languageIcons[iconName])
                || languageIcons[language]
                || <FileCode className="size-4" />

            const colors = languageColors[iconName || language]
            const icon = iconColorEnabled && colors ? (
                <span
                    className="flex items-center justify-center"
                    style={{
                        color: colors.light,
                        ["--icon-dark-color" as string]: colors.dark
                    } as React.CSSProperties}
                >
                    <span className="dark:hidden">{iconElement}</span>
                    <span className="hidden dark:block" style={{ color: "var(--icon-dark-color)" }}>
                        {iconElement}
                    </span>
                </span>
            ) : iconElement

            return { title, icon }
        })?.filter(Boolean) || []
    }, [children])

    if (tabs.length === 0) return <>{children}</>

    return (
        <div className="code-group">
            <div className="code-group-tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        data-active={activeIndex === index}
                        className="code-group-tab"
                    >
                        {tab?.icon}
                        {tab?.title}
                    </button>
                ))}
            </div>
            <div className="code-group-content">
                {React.Children.map(children, (child, index) => (
                    <div
                        key={index}
                        className={cn(
                            "code-block-wrapper",
                            activeIndex === index ? "block" : "hidden"
                        )}
                    >
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}


