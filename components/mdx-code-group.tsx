"use client";

import React, { useState, useMemo, useRef, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { gaEvent } from "@/lib/ga";
import { languageIcons, languageColors, languageAliases } from "./mdx-pre"
import { FileCode, Check, Copy } from "lucide-react"
import { GrTextAlignLeft } from "react-icons/gr";
import { LuWrapText } from "react-icons/lu";
import { phCapture } from "@/lib/posthog";

interface CodeGroupContextType {
    isInCodeGroup: boolean
    isWrapped?: boolean
}

export const CodeGroupContext = createContext<CodeGroupContextType>({
    isInCodeGroup: false,
    isWrapped: false
})

export const useCodeGroup = () => useContext(CodeGroupContext)

interface CodeGroupProps {
    children: React.ReactNode
}

export function CodeGroup({ children }: CodeGroupProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isCopied, setIsCopied] = useState(false)
    const [isWrapped, setIsWrapped] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const tabs = useMemo(() => {
        return React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null

            const props = child.props as {
                "data-title"?: string
                "data-language"?: string
                "data-icon"?: string
                "data-icon-color"?: string
                "data-caption"?: string
                "data-wrap-toggle-button"?: string
            }

            const title = props["data-title"] || props["data-language"] || "Code"
            const language = props["data-language"] || "text"
            const iconColorEnabled = props["data-icon-color"] !== "false"
            const caption = props["data-caption"]
            const rawIcon = props["data-icon"] as string;
            const hasWrapToggle = props["data-wrap-toggle-button"] === "true"

            // Helper to resolve aliases (e.g., "iNpm" -> "npm")
            const resolveKey = (key: string) => languageAliases[key] || key;

            const iconKey = resolveKey(rawIcon);
            const langKey = resolveKey(language);

            const iconElement = languageIcons[iconKey]
                || languageIcons[langKey]
                || <FileCode className="size-4" />;

            const colors = languageColors[iconKey || langKey];
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

            return { title, icon, caption, hasWrapToggle }
        })?.filter(Boolean) || []
    }, [children])

    // Check if any tab has wrap toggle enabled
    const showWrapToggle = tabs.some(tab => tab?.hasWrapToggle)

    const WrapToggleIcon = isWrapped ? LuWrapText : GrTextAlignLeft;
    const wrapToggleLabel = isWrapped
        ? "Disable text wrapping"
        : "Enable text wrapping";

    const onCopy = async () => {
        if (!containerRef.current) return

        // Find the active code block's content
        const activeBlock = containerRef.current.querySelectorAll(".code-block-wrapper")[activeIndex]
        const code = activeBlock?.querySelector("code")?.innerText || ""

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(code)
                setIsCopied(true)
            } else {
                const textArea = document.createElement("textarea")
                textArea.value = code
                textArea.style.position = "fixed"
                textArea.style.left = "-9999px"
                textArea.style.top = "0"
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                try {
                    document.execCommand('copy')
                    setIsCopied(true)
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err)
                }
                document.body.removeChild(textArea)
            }
            setTimeout(() => setIsCopied(false), 2000)

            gaEvent({
                action: "copy_code_group",
                category: "blog_engagement",
                label: activeTab?.title || "Code Group",
            });

            phCapture("code_group_copied", {
                active_tab: activeTab?.title,
                location: "blog_post",
            });
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const onToggleWrap = () => {
        setIsWrapped(!isWrapped)
    }

    if (tabs.length === 0) return <>{children}</>

    const activeTab = tabs[activeIndex]

    return (
        <CodeGroupContext.Provider value={{ isInCodeGroup: true, isWrapped }}>
            <div className="my-6">
                <div ref={containerRef} className="code-group overflow-hidden rounded-lg border bg-background">
                    {/* Integrated Title Bar */}
                    <div className="flex items-center justify-between border-b bg-[#f6f8fa] dark:bg-[#161a20] px-4 py-1">
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="size-3 rounded-full bg-red-400/60 border border-red-500/80" />
                                <div className="size-3 rounded-full bg-yellow-400/60 border border-yellow-500/80" />
                                <div className="size-3 rounded-full bg-green-400/60 border border-green-500/80" />
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
                                {tabs.map((tab, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        data-active={activeIndex === index}
                                        className={cn(
                                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap cursor-pointer",
                                            activeIndex === index
                                                ? "bg-foreground/10 text-foreground border-2 border-foreground/15"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        {tab?.icon}
                                        {tab?.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {showWrapToggle && (
                                <button
                                    onClick={onToggleWrap}
                                    className={cn(
                                        "flex items-center gap-2 rounded-md p-1.5 text-xs font-medium transition-all cursor-pointer",
                                        isWrapped
                                            ? "text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10"
                                            : "text-muted-foreground hover:bg-ring/40 hover:text-foreground"
                                    )}
                                    aria-label={wrapToggleLabel}
                                    title={wrapToggleLabel}
                                >
                                    <WrapToggleIcon className="size-3.5" />
                                </button>
                            )}
                            <button
                                onClick={onCopy}
                                className={cn(
                                    "flex items-center gap-2 rounded-md p-1.5 text-xs font-medium transition-all cursor-pointer",
                                    isCopied
                                        ? "text-green-600 dark:text-green-400 bg-green-500/10 dark:bg-green-400/10"
                                        : "text-muted-foreground hover:bg-ring/40 hover:text-foreground"
                                )}
                                aria-label="Copy code"
                            >
                                {isCopied ? (
                                    <>
                                        <Check className="size-3.5" />
                                        <span>Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="size-3.5" />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="code-group-content">
                        {React.Children.map(children, (child, index) => {
                            if (!React.isValidElement(child)) return null

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "code-block-wrapper",
                                        activeIndex === index ? "block" : "hidden"
                                    )}
                                >
                                    {child}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {activeTab?.caption && (
                    <div className="mt-2 text-center text-sm text-muted-foreground">
                        {activeTab.caption}
                    </div>
                )}
            </div>
        </CodeGroupContext.Provider>
    )
}
