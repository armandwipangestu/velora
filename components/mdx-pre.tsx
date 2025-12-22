"use client"

import { Check, Copy, FileCode, FileJson, FileType, Terminal } from "lucide-react"
import { FaReact, FaCss3Alt, FaHtml5, FaMarkdown, FaFileCsv, FaJava, FaGolang, FaPython, FaDocker, FaRust, FaC, FaSwift, FaFlutter, FaLaravel } from "react-icons/fa6"
import { RiJavascriptFill, RiPhpLine } from "react-icons/ri"
import { BiLogoTypescript, BiSolidFileJson } from "react-icons/bi"
import { BsFiletypeJson, BsFiletypeYml, BsFiletypeSql, BsFiletypeXml } from "react-icons/bs"
import { VscJson } from "react-icons/vsc"
import { SiGnubash, SiMdx, SiVim, SiZsh, SiLua, SiKotlin } from "react-icons/si"
import { DiRuby } from "react-icons/di"
import { MdDifference } from "react-icons/md"
import { PiFileCSharp, PiFileCppDuotone } from "react-icons/pi"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

const languageIcons: Record<string, React.ReactNode> = {
    js: <RiJavascriptFill className="size-4" />,
    jsx: <FaReact className="size-4" />,
    ts: <BiLogoTypescript className="size-4" />,
    tsx: <FaReact className="size-4" />,
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
    flutter: <FaFlutter className="size-4" />,
    xml: <BsFiletypeXml className="size-4" />,
    xaml: <BsFiletypeXml className="size-4" />,
    php: <RiPhpLine className="size-4" />,
    blade: <FaLaravel className="size-4" />,
    kotlin: <SiKotlin className="size-4" />,
    kt: <SiKotlin className="size-4" />,
}

export function Pre({
    children,
    className,
    title,
    ...props
}: React.HTMLAttributes<HTMLPreElement> & { title?: string }) {
    const [isCopied, setIsCopied] = useState(false)
    const preRef = useRef<HTMLPreElement>(null)

    const language = (props as any)["data-language"] || "text"
    const icon = languageIcons[language] || <FileCode className="size-4" />

    const onCopy = async () => {
        if (!preRef.current) return

        const code = preRef.current.querySelector("code")?.innerText || ""
        await navigator.clipboard.writeText(code)
        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div className="my-6 overflow-hidden rounded-lg border bg-background">
            <div className="flex items-center justify-between border-b bg-[#f6f8fa] dark:bg-[#161a20] px-4 py-2.5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="size-3 rounded-full bg-red-400/60 border border-red-500/80" />
                        <div className="size-3 rounded-full bg-yellow-400/60 border border-yellow-500/80" />
                        <div className="size-3 rounded-full bg-green-400/60 border border-green-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        {icon}
                        <span>{title || language}</span>
                    </div>
                </div>
                <button
                    onClick={onCopy}
                    className="flex items-center gap-2 rounded-md p-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-ring/40 hover:text-foreground"
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
            <pre
                ref={preRef}
                className={cn("overflow-x-auto py-4 !mt-0 !mb-0 rounded-t-none rounded-b-none", className)}
                {...props}
            >
                {children}
            </pre>
        </div>
    )
}
