"use client"

import { Check, Copy, FileCode } from "lucide-react"
import { FaReact, FaCss3Alt, FaHtml5, FaMarkdown, FaFileCsv, FaJava, FaGolang, FaPython, FaDocker, FaRust, FaC, FaSwift, FaLaravel, FaDartLang, FaFlutter, FaNpm, FaYarn, FaNodeJs } from "react-icons/fa6"
import { RiJavascriptFill, RiPhpLine } from "react-icons/ri"
import { BiLogoTypescript } from "react-icons/bi"
import { BsFiletypeYml, BsFiletypeSql, BsFiletypeXml } from "react-icons/bs"
import { VscJson } from "react-icons/vsc"
import { SiGnubash, SiMdx, SiVim, SiZsh, SiLua, SiKotlin, SiPnpm, SiBun } from "react-icons/si"
import { DiRuby } from "react-icons/di"
import { MdDifference } from "react-icons/md"
import { PiFileCSharp, PiFileCppDuotone } from "react-icons/pi"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

export const languageIcons: Record<string, React.ReactNode> = {
    js: <RiJavascriptFill className="size-4" />,
    jsx: <FaReact className="size-4" />,
    ts: <BiLogoTypescript className="size-4" />,
    tsx: <FaReact className="size-4" />,
    node: <FaNodeJs className="size-4" />,
    nodejs: <FaNodeJs className="size-4" />,
    npm: <FaNpm className="size-4" />,
    yarn: <FaYarn className="size-4" />,
    pnpm: <SiPnpm className="size-4" />,
    bun: <SiBun className="size-4" />,
    css: <FaCss3Alt className="size-4" />,
    html: <FaHtml5 className="size-4" />,
    json: <VscJson className="size-4" />,
    md: <FaMarkdown className="size-4" />,
    mdx: <SiMdx className="size-4" />,
    ansi: <SiGnubash className="size-4" />,
    bash: <SiGnubash className="size-4" />,
    sh: <SiGnubash className="size-4" />,
    zsh: <SiZsh className="size-4" />,
    shell: <SiGnubash className="size-4" />,
    yml: <BsFiletypeYml className="size-4" />,
    yaml: <BsFiletypeYml className="size-4" />,
    csv: <FaFileCsv className="size-4" />,
    sql: <BsFiletypeSql className="size-4" />,
    java: <FaJava className="size-4" />,
    go: <FaGolang className="size-4" />,
    golang: <FaGolang className="size-4" />,
    py: <FaPython className="size-4" />,
    python: <FaPython className="size-4" />,
    rb: <DiRuby className="size-4" />,
    ruby: <DiRuby className="size-4" />,
    vim: <SiVim className="size-4" />,
    vimscript: <SiVim className="size-4" />,
    docker: <FaDocker className="size-4" />,
    dockerfile: <FaDocker className="size-4" />,
    diff: <MdDifference className="size-4" />,
    lua: <SiLua className="size-4" />,
    rust: <FaRust className="size-4" />,
    cs: <PiFileCSharp className="size-4" />,
    csharp: <PiFileCSharp className="size-4" />,
    cpp: <PiFileCppDuotone className="size-4" />,
    c: <FaC className="size-4" />,
    swift: <FaSwift className="size-4" />,
    dart: <FaDartLang className="size-4" />,
    flutter: <FaFlutter className="size-4" />,
    xml: <BsFiletypeXml className="size-4" />,
    xaml: <BsFiletypeXml className="size-4" />,
    php: <RiPhpLine className="size-4" />,
    blade: <FaLaravel className="size-4" />,
    laravel: <FaLaravel className="size-4" />,
    kotlin: <SiKotlin className="size-4" />,
    kt: <SiKotlin className="size-4" />,
}

export const languageColors: Record<string, { light: string; dark: string }> = {
    js: { light: "#F7DF1E", dark: "#F7DF1E" },
    jsx: { light: "#61DAFB", dark: "#61DAFB" },
    ts: { light: "#3178C6", dark: "#3178C6" },
    tsx: { light: "#61DAFB", dark: "#61DAFB" },
    node: { light: "#66CC33", dark: "#336633" },
    nodejs: { light: "#66CC33", dark: "#336633" },
    npm: { light: "#CB3837", dark: "#CB3837" },
    yarn: { light: "#2C8EBB", dark: "#2C8EBB" },
    pnpm: { light: "#F6DA1A", dark: "#F6DA1A" },
    bun: { light: "#ccbea7", dark: "#FFFFFF" },
    css: { light: "#1572B6", dark: "#33A9DC" },
    html: { light: "#E34F26", dark: "#E34F26" },
    json: { light: "#000000", dark: "#FFFFFF" },
    md: { light: "#000000", dark: "#FFFFFF" },
    mdx: { light: "#FCB32C", dark: "#FCB32C" },
    yml: { light: "#CB171E", dark: "#CB171E" },
    yaml: { light: "#CB171E", dark: "#CB171E" },
    sql: { light: "#4479A1", dark: "#4479A1" },
    java: { light: "#007396", dark: "#007396" },
    go: { light: "#00ADD8", dark: "#00ADD8" },
    golang: { light: "#00ADD8", dark: "#00ADD8" },
    py: { light: "#3776AB", dark: "#3776AB" },
    python: { light: "#3776AB", dark: "#3776AB" },
    rb: { light: "#CC342D", dark: "#CC342D" },
    ruby: { light: "#CC342D", dark: "#CC342D" },
    docker: { light: "#2496ED", dark: "#2496ED" },
    dockerfile: { light: "#2496ED", dark: "#2496ED" },
    lua: { light: "#000080", dark: "#1717ff" },
    rust: { light: "#D34516", dark: "#D34516" },
    cs: { light: "#239120", dark: "#239120" },
    csharp: { light: "#239120", dark: "#239120" },
    cpp: { light: "#00599C", dark: "#00599C" },
    c: { light: "#A8B9CC", dark: "#A8B9CC" },
    swift: { light: "#F05138", dark: "#F05138" },
    dart: { light: "#0175C2", dark: "#0175C2" },
    flutter: { light: "#02569B", dark: "#02569B" },
    php: { light: "#777BB4", dark: "#777BB4" },
    blade: { light: "#FF2D20", dark: "#FF2D20" },
    laravel: { light: "#FF2D20", dark: "#FF2D20" },
    kotlin: { light: "#7F52FF", dark: "#7F52FF" },
    kt: { light: "#7F52FF", dark: "#7F52FF" },
}

export const languageAliases: Record<string, string> = {
    iJs: "js",
    iJsx: "jsx",
    iTs: "ts",
    iTsx: "tsx",
    iNode: "node",
    iNodejs: "nodejs",
    iNpm: "npm",
    iYarn: "yarn",
    iPnpm: "pnpm",
    iBun: "bun",
    iCss: "css",
    iHtml: "html",
    iJson: "json",
    iMd: "md",
    iMdx: "mdx",
    iAnsi: "ansi",
    iBash: "bash",
    iSh: "sh",
    iZsh: "zsh",
    iShell: "shell",
    iYml: "yml",
    iYaml: "yaml",
    iCsv: "csv",
    iSql: "sql",
    iJava: "java",
    iGo: "go",
    iGolang: "golang",
    iPy: "py",
    iPython: "python",
    iRb: "rb",
    iRuby: "ruby",
    iVim: "vim",
    iVimscript: "vimscript",
    iDocker: "docker",
    iDockerfile: "dockerfile",
    iDiff: "diff",
    iLua: "lua",
    iRust: "rust",
    iCs: "cs",
    iCsharp: "csharp",
    iCpp: "cpp",
    iC: "c",
    iSwift: "swift",
    iDart: "dart",
    iFlutter: "flutter",
    iXml: "xml",
    iXaml: "xaml",
    iPhp: "php",
    iBlade: "blade",
    iLaravel: "laravel",
    iKotlin: "kotlin",
    iKt: "kt",
};

import { useCodeGroup } from "./mdx-code-group"

export function Pre({
    children,
    className,
    title, // This comes from MDX props if passed like <Pre title="foo" />
    hideTitleBar: hideTitleBarProp = false,
    hideBorder: hideBorderProp = false,
    ...props
}: React.HTMLAttributes<HTMLPreElement> & {
    title?: string;
    hideTitleBar?: boolean;
    hideBorder?: boolean;
}) {
    const { isInCodeGroup } = useCodeGroup()
    const hideTitleBar = hideTitleBarProp || isInCodeGroup
    const hideBorder = hideBorderProp || isInCodeGroup

    const [isCopied, setIsCopied] = useState(false)
    const preRef = useRef<HTMLPreElement>(null)

    // 1. Check props for data-title (passed from rehype)
    const dataTitle = (props as Record<string, unknown>)["data-title"] as string
    const dataFont = (props as Record<string, unknown>)["data-font"] as string
    const dataLigatures = (props as Record<string, unknown>)["data-ligatures"] as string
    const dataIconColor = (props as Record<string, unknown>)["data-icon-color"] as string
    const rawIcon = (props as Record<string, unknown>)["data-icon"] as string;
    const language = (props as Record<string, unknown>)["data-language"] as string || "text"

    // Helper to resolve aliases (e.g., "iNpm" -> "npm")
    const resolveKey = (key: string) => languageAliases[key] || key;

    const iconKey = resolveKey(rawIcon);
    const langKey = resolveKey(language);

    // 2. Determine the display label:
    // Priority: Prop title > data-title attribute from rehype > language extension
    const displayTitle = title || dataTitle || language

    // 3. Determine Icon
    // Priority: Custom icon from meta > language-based icon > default FileCode
    const iconElement = languageIcons[iconKey]
        || languageIcons[langKey]
        || <FileCode className="size-4" />;

    // 5. Apply Icon Color if enabled
    const colors = languageColors[iconKey || langKey];
    const icon = dataIconColor === "true" && colors ? (
        <span
            className="flex items-center justify-center"
            style={{
                color: colors.light,
                // We use a CSS variable to handle the dark mode switch
                // This is cleaner than trying to use Tailwind classes for dynamic colors
                ["--icon-dark-color" as string]: colors.dark
            } as React.CSSProperties}
        >
            <span className="dark:hidden">{iconElement}</span>
            <span className="hidden dark:block" style={{ color: "var(--icon-dark-color)" }}>
                {iconElement}
            </span>
        </span>
    ) : iconElement;

    // 4. Determine Font
    // Priority: Custom font from meta > default Fira Code
    // Logic: If dataFont exists, use it. 
    // We add !important via the style object if needed, 
    // but usually React inline styles win over CSS files.
    const style: React.CSSProperties = {
        ...props.style,
        fontFamily: dataFont ? `"${dataFont}", monospace` : undefined,
        // If fontLigatures=false is explicitly passed, we force them off via inline style
        ...(dataLigatures === "false" && {
            fontVariantLigatures: "none",
            fontFeatureSettings: '"liga" 0, "calt" 0',
        })
    };

    const onCopy = async () => {
        if (!preRef.current) return

        const code = preRef.current.querySelector("code")?.innerText || ""

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(code)
                setIsCopied(true)
            } else {
                // Fallback for mobile/non-secure contexts
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

            setTimeout(() => {
                setIsCopied(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className={cn(
            "my-6 overflow-hidden",
            !hideBorder && "rounded-lg border bg-background"
        )}>
            {!hideTitleBar && (
                <div className="flex items-center justify-between border-b bg-[#f6f8fa] dark:bg-[#161a20] px-4 py-2.5">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="size-3 rounded-full bg-red-400/60 border border-red-500/80" />
                            <div className="size-3 rounded-full bg-yellow-400/60 border border-yellow-500/80" />
                            <div className="size-3 rounded-full bg-green-400/60 border border-green-500/80" />
                        </div>
                        {/* Icon and Title/Extension */}
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                            {icon}
                            <span className="truncate">{displayTitle}</span>
                        </div>
                    </div>
                    <button
                        onClick={onCopy}
                        className="flex items-center gap-2 rounded-md p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-ring/40 hover:text-foreground cursor-pointer"
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
            )}
            <pre
                ref={preRef}
                style={style}
                className={cn(
                    "overflow-x-auto py-4 mt-0! mb-0!",
                    !hideTitleBar && "rounded-t-none",
                    !hideBorder && "rounded-b-none",
                    className
                )}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}

