"use client";

import React, { useState, useMemo, useRef, createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { languageIcons, languageColors } from "./mdx-pre"
import { FileCode, Check, Copy } from "lucide-react"

interface CodeGroupContextType {
    isInCodeGroup: boolean
}

export const CodeGroupContext = createContext<CodeGroupContextType>({
    isInCodeGroup: false
})

export const useCodeGroup = () => useContext(CodeGroupContext)

interface CodeGroupProps {
    children: React.ReactNode
}

export function CodeGroup({ children }: CodeGroupProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isCopied, setIsCopied] = useState(false)
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
            }

            const title = props["data-title"] || props["data-language"] || "Code"
            const iconName = props["data-icon"]
            const language = props["data-language"] || "text"
            const iconColorEnabled = props["data-icon-color"] !== "false"
            const caption = props["data-caption"]

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

            return { title, icon, caption }
        })?.filter(Boolean) || []
    }, [children])

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
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    if (tabs.length === 0) return <>{children}</>

    const activeTab = tabs[activeIndex]

    return (
        <CodeGroupContext.Provider value={{ isInCodeGroup: true }}>
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
                                            "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap",
                                            activeIndex === index
                                                ? "bg-muted/80 text-foreground shadow-sm"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        {tab?.icon}
                                        {tab?.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={onCopy}
                            className="flex items-center gap-2 rounded-md p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-ring/40 hover:text-foreground shrink-0"
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
