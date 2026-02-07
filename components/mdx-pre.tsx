"use client"

import { Check, Copy, FileCode, WrapText, ChevronDown } from "lucide-react"
import { GrTextAlignLeft } from "react-icons/gr";
import { LuWrapText } from "react-icons/lu";
import { FaReact, FaCss3Alt, FaHtml5, FaMarkdown, FaFileCsv, FaJava, FaGolang, FaPython, FaDocker, FaRust, FaC, FaSwift, FaLaravel, FaDartLang, FaFlutter, FaNpm, FaYarn, FaNodeJs, FaVuejs, FaAngular, FaSass, FaGitAlt, FaGithub } from "react-icons/fa6"
import { FaGitlab } from "react-icons/fa"
import { RiJavascriptFill, RiPhpLine } from "react-icons/ri"
import { BiLogoTypescript, BiLogoPostgresql } from "react-icons/bi"
import { BsFiletypeYml, BsFiletypeSql, BsFiletypeXml } from "react-icons/bs"
import { VscJson } from "react-icons/vsc"
import { SiGnubash, SiMdx, SiVim, SiZsh, SiLua, SiKotlin, SiPnpm, SiBun, SiTerraform, SiAnsible, SiOpentofu, SiKubernetes, SiNginx, SiArduino, SiTailwindcss, SiDotnet, SiGraphql, SiPrisma, SiMysql, SiMariadb, SiRabbitmq, SiApachekafka, SiRedis, SiMongodb, SiSupabase, SiGithubactions, SiPodman, SiArgo, SiPosthog, SiGoogleanalytics } from "react-icons/si"
import { TbBrandTypescript } from "react-icons/tb";
import { DiRuby, DiMsqlServer } from "react-icons/di"
import { MdDifference } from "react-icons/md"
import { PiFileCSharp, PiFileCppDuotone } from "react-icons/pi"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { gaEvent } from "@/lib/ga";

export const languageIcons: Record<string, React.ReactNode> = {
    js: <RiJavascriptFill className="size-4" />,
    jsx: <FaReact className="size-4" />,
    ts: <BiLogoTypescript className="size-4" />,
    dts: <TbBrandTypescript className="size-4" />,
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
    vue: <FaVuejs className="size-4" />,
    vuejs: <FaVuejs className="size-4" />,
    angular: <FaAngular className="size-4" />,
    sass: <FaSass className="size-4" />,
    git: <FaGitAlt className="size-4" />,
    github: <FaGithub className="size-4" />,
    gitlab: <FaGitlab className="size-4" />,
    postgresql: <BiLogoPostgresql className="size-4" />,
    tf: <SiTerraform className="size-4" />,
    terraform: <SiTerraform className="size-4" />,
    ansible: <SiAnsible className="size-4" />,
    tofu: <SiOpentofu className="size-4" />,
    kubernetes: <SiKubernetes className="size-4" />,
    k8s: <SiKubernetes className="size-4" />,
    nginx: <SiNginx className="size-4" />,
    arduino: <SiArduino className="size-4" />,
    tailwind: <SiTailwindcss className="size-4" />,
    dotnet: <SiDotnet className="size-4" />,
    graphql: <SiGraphql className="size-4" />,
    prisma: <SiPrisma className="size-4" />,
    mysql: <SiMysql className="size-4" />,
    mariadb: <SiMariadb className="size-4" />,
    rabbitmq: <SiRabbitmq className="size-4" />,
    kafka: <SiApachekafka className="size-4" />,
    redis: <SiRedis className="size-4" />,
    mongodb: <SiMongodb className="size-4" />,
    supabase: <SiSupabase className="size-4" />,
    githubactions: <SiGithubactions className="size-4" />,
    mssql: <DiMsqlServer className="size-4" />,
    sqlserver: <DiMsqlServer className="size-4" />,
    podman: <SiPodman className="size-4" />,
    argo: <SiArgo className="size-4" />,
    posthog: <SiPosthog className="size-4" />,
    ga: <SiGoogleanalytics className="size-4" />,
}

export const languageColors: Record<string, { light: string; dark: string }> = {
    js: { light: "#F7DF1E", dark: "#F7DF1E" },
    jsx: { light: "#61DAFB", dark: "#61DAFB" },
    ts: { light: "#3178C6", dark: "#3178C6" },
    dts: { light: "#3178C6", dark: "#3178C6" },
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
    vim: { light: "#169744", dark: "#41B883" },
    vimscript: { light: "#169744", dark: "#41B883" },
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
    vue: { light: "#4FC08D", dark: "#4FC08D" },
    vuejs: { light: "#4FC08D", dark: "#4FC08D" },
    angular: { light: "#DD0031", dark: "#DD0031" },
    sass: { light: "#CC6699", dark: "#F06292" },
    git: { light: "#F05032", dark: "#F05032" },
    github: { light: "#181717", dark: "#FFFFFF" },
    gitlab: { light: "#FC6D26", dark: "#FC6D26" },
    postgresql: { light: "#4169E1", dark: "#336791" },
    tf: { light: "#7B42BC", dark: "#844FBA" },
    terraform: { light: "#7B42BC", dark: "#844FBA" },
    ansible: { light: "#000000", dark: "#FFFFFF" },
    tofu: { light: "#FFDA18", dark: "#FFDA18" },
    kubernetes: { light: "#326CE5", dark: "#326CE5" },
    k8s: { light: "#326CE5", dark: "#326CE5" },
    nginx: { light: "#009639", dark: "#009639" },
    arduino: { light: "#00979D", dark: "#00979D" },
    tailwind: { light: "#06B6D4", dark: "#38BDF8" },
    dotnet: { light: "#512BD4", dark: "#512BD4" },
    graphql: { light: "#E10098", dark: "#E10098" },
    prisma: { light: "#2D3748", dark: "#FFFFFF" },
    mysql: { light: "#4479A1", dark: "#4479A1" },
    mariadb: { light: "#003545", dark: "#FFFFFF" },
    rabbitmq: { light: "#FF6600", dark: "#FF6600" },
    kafka: { light: "#231F20", dark: "#FFFFFF" },
    redis: { light: "#DC382D", dark: "#DC382D" },
    mongodb: { light: "#47A248", dark: "#47A248" },
    supabase: { light: "#3ECF8E", dark: "#3ECF8E" },
    githubactions: { light: "#2088FF", dark: "#47A1FF" },
    mssql: { light: "#CC2927", dark: "#FF5F5E" },
    sqlserver: { light: "#CC2927", dark: "#FF5F5E" },
    podman: { light: "#892CA0", dark: "#B166CC" },
    argo: { light: "#ef7b4d", dark: "#ffa07a" },
    posthog: { light: "#F7A501", dark: "#FBBF24" },
    ga: { light: "#E8710A", dark: "#F9AB00" },
}

export const fontAliases: Record<string, string> = {
    "Ubuntu Mono": "var(--font-ubuntu-mono)",
    "Geist Mono": "var(--font-mono)",
};

export const languageAliases: Record<string, string> = {
    iJs: "js",
    iJsx: "jsx",
    iTs: "ts",
    iDts: "dts",
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
    iVue: "vue",
    iVuejs: "vuejs",
    iAngular: "angular",
    iSass: "sass",
    iGit: "git",
    iGithub: "github",
    iGitlab: "gitlab",
    iPostgresql: "postgresql",
    iTf: "tf",
    iTerraform: "terraform",
    iAnsible: "ansible",
    iTofu: "tofu",
    iKubernetes: "kubernetes",
    iK8s: "k8s",
    iNginx: "nginx",
    iArduino: "arduino",
    iIno: "arduino",
    iTailwind: "tailwind",
    iDotnet: "dotnet",
    iGraphql: "graphql",
    iPrisma: "prisma",
    iMysql: "mysql",
    iMariadb: "mariadb",
    iRabbitmq: "rabbitmq",
    iKafka: "kafka",
    iRedis: "redis",
    iMongodb: "mongodb",
    iSupabase: "supabase",
    iGithubactions: "githubactions",
    iMssql: "mssql",
    iSqlserver: "sqlserver",
    iPodman: "podman",
    iArgo: "argo",
    iPosthog: "posthog",
    iGa: "ga",
    iGoogleAnalytics: "ga",
};

import { useCodeGroup } from "./mdx-code-group"
import { phCapture } from "@/lib/posthog"

export function Pre({
    children,
    className,
    title,
    hideTitleBar: hideTitleBarProp = false,
    hideBorder: hideBorderProp = false,
    wrap: wrapProp = false,
    wrapToggleButton: wrapToggleButtonProp = false,
    maxLines: maxLinesProp,
    expandable: expandableProp = false,
    expandLabel: expandLabelProp,
    collapseLabel: collapseLabelProp,
    ...props
}: React.HTMLAttributes<HTMLPreElement> & {
    title?: string;
    hideTitleBar?: boolean;
    hideBorder?: boolean;
    wrap?: boolean;
    wrapToggleButton?: boolean;
    maxLines?: number;
    expandable?: boolean;
    expandLabel?: string;
    collapseLabel?: string;
}) {
    // 1. Check props for data-title (passed from rehype)
    const dataTitle = (props as Record<string, unknown>)["data-title"] as string
    const dataFont = (props as Record<string, unknown>)["data-font"] as string
    const dataLigatures = (props as Record<string, unknown>)["data-ligatures"] as string
    const dataIconColor = (props as Record<string, unknown>)["data-icon-color"] as string
    const rawIcon = (props as Record<string, unknown>)["data-icon"] as string;
    const language = (props as Record<string, unknown>)["data-language"] as string || "text"
    const dataWrap = (props as Record<string, unknown>)["data-wrap"] as string
    const dataWrapToggleButton = (props as Record<string, unknown>)["data-wrap-toggle-button"] as string
    const dataMaxLines = (props as Record<string, unknown>)["data-max-lines"] as string
    const dataExpandable = (props as Record<string, unknown>)["data-expandable"] as string
    const dataExpandLabel = (props as Record<string, unknown>)["data-expand-label"] as string
    const dataCollapseLabel = (props as Record<string, unknown>)["data-collapse-label"] as string

    const { isInCodeGroup } = useCodeGroup()
    const hideTitleBar = hideTitleBarProp || isInCodeGroup
    const hideBorder = hideBorderProp || isInCodeGroup
    const wrap = wrapProp || dataWrap === "true"
    const showWrapToggle = wrapToggleButtonProp || dataWrapToggleButton === "true"
    const maxLines = maxLinesProp || (dataMaxLines ? parseInt(dataMaxLines, 10) : undefined)
    const expandable = expandableProp || dataExpandable === "true"
    const expandLabel = expandLabelProp ?? dataExpandLabel ?? "Expand code"
    const collapseLabel = collapseLabelProp ?? dataCollapseLabel ?? "Collapse"

    const [isCopied, setIsCopied] = useState(false)
    const [isWrapped, setIsWrapped] = useState(wrap)
    const [isExpanded, setIsExpanded] = useState(false)
    const preRef = useRef<HTMLPreElement>(null)

    // Update isWrapped when wrap prop changes (from code group)
    useEffect(() => {
        setIsWrapped(wrap)
    }, [wrap])

    // Also check if we're in a code group and use its wrap state
    const { isWrapped: codeGroupWrapped } = useCodeGroup()
    useEffect(() => {
        if (isInCodeGroup && codeGroupWrapped !== undefined) {
            setIsWrapped(codeGroupWrapped)
        }
    }, [codeGroupWrapped, isInCodeGroup])

    // Helper to resolve aliases (e.g., "iNpm" -> "npm")
    const resolveKey = (key: string) => languageAliases[key] || key;
    const resolveFont = (font: string) => fontAliases[font] || font;

    const iconKey = resolveKey(rawIcon);
    const langKey = resolveKey(language);
    const fontValue = resolveFont(dataFont);

    // 2. Determine the display label:
    // Priority: Prop title > data-title attribute from rehype > language extension
    const displayTitle = title || dataTitle || language
    const isTwoslash = className?.includes("twoslash")

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
        fontFamily: fontValue ? `${fontValue}, monospace` : undefined,
        // Set the CSS variable we added to mdx.css
        ...((fontValue) && { ["--mdx-font-family" as string]: `${fontValue}, monospace` }),
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

                gaEvent({
                    action: "copy_code",
                    category: "blog_engagement",
                    label: displayTitle,
                });

                phCapture("code_copied", {
                    block_title: displayTitle,
                    language: language,
                    location: "blog_post",
                });
            }, 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const onToggleWrap = () => {
        setIsWrapped(!isWrapped)
    }

    // Icon changes based on wrap state
    const WrapToggleIcon = isWrapped ? LuWrapText : GrTextAlignLeft;

    // Tooltip & accessibility labels
    const wrapToggleLabel = isWrapped
        ? "Disable text wrapping"
        : "Enable text wrapping";

    const onToggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    // Calculate max height for clamping - using line-height of 1.5
    // Each line is approximately 1.5em, so we add padding (py-4 = 1rem top + 1rem bottom)
    const maxHeightValue = maxLines ? `calc(${maxLines} * 1.5em + 2rem)` : undefined

    useEffect(() => {
        function reposition(e: MouseEvent) {
            const hover = (e.target as HTMLElement)?.closest(".twoslash-hover");
            if (!hover) return;

            const popup = hover.querySelector(".twoslash-popup-container") as HTMLElement;
            if (!popup) return;

            const rect = hover.getBoundingClientRect();

            popup.style.left = `${rect.left}px`;
            popup.style.top = `${rect.bottom + 6}px`;
        }

        return () => document.removeEventListener("mousemove", reposition);
    }, []);

    useEffect(() => {
        let activePopup: HTMLElement | null = null;
        let hideTimeout: number | null = null;

        function showPopup(hover: HTMLElement) {
            const popup = hover.querySelector(
                ".twoslash-popup-container"
            ) as HTMLElement | null;

            if (!popup) return;

            const rect = hover.getBoundingClientRect();

            popup.style.left = `${rect.left}px`;
            popup.style.top = `${rect.bottom + 6}px`;
            popup.style.opacity = "1";
            popup.style.pointerEvents = "auto";

            activePopup = popup;
        }

        function hidePopupDelayed() {
            if (!activePopup) return;

            hideTimeout = window.setTimeout(() => {
                if (activePopup) {
                    activePopup.style.opacity = "0";
                    activePopup.style.pointerEvents = "none";
                    activePopup = null;
                }
            }, 120);
        }

        function cancelHide() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
        }

        function getClosest(
            target: EventTarget | null,
            selector: string
        ): HTMLElement | null {
            if (!(target instanceof Element)) return null
            return target.closest(selector) as HTMLElement | null
        }

        function onPointerEnter(e: PointerEvent) {
            const el = getClosest(
                e.target,
                ".twoslash-hover, .twoslash-popup-container"
            )

            if (!(el instanceof HTMLElement)) return;

            cancelHide();

            if (el.classList.contains("twoslash-hover")) {
                showPopup(el);
            }
        }

        function onPointerLeave(e: PointerEvent) {
            const fromEl = e.target instanceof Element ? e.target : null
            const toEl = e.relatedTarget instanceof Element ? e.relatedTarget : null

            if (!fromEl || !toEl) {
                hidePopupDelayed()
                return
            }

            const leavingHover = fromEl.closest(".twoslash-hover")
            const enteringHover = toEl.closest(".twoslash-hover")

            const leavingPopup = fromEl.closest(".twoslash-popup-container")
            const enteringPopup = toEl.closest(".twoslash-popup-container")

            if (enteringHover || enteringPopup) return

            if (leavingHover || leavingPopup) {
                hidePopupDelayed()
            }
        }

        document.addEventListener("pointerenter", onPointerEnter, true);
        document.addEventListener("pointerleave", onPointerLeave, true);

        return () => {
            document.removeEventListener("pointerenter", onPointerEnter, true);
            document.removeEventListener("pointerleave", onPointerLeave, true);
        };
    }, []);

    return (
        <div
            className={cn(
                "my-6 relative",
                !hideBorder && "rounded-lg border bg-background overflow-hidden"
            )}
            style={{
                ...((fontValue) && { ["--mdx-font-family" as string]: `${fontValue}, monospace` }),
            }}
        >
            {!hideTitleBar && (
                <div className="flex items-center justify-between border-b bg-[#f6f8fa] dark:bg-[#161a20] px-4 py-2.5 rounded-t-[calc(var(--radius,0.5rem)-1px)]">
                    <div className="flex items-center gap-4 overflow-hidden">
                        <div className="flex items-center gap-1.5 shrink-0">
                            <div className="size-3 rounded-full bg-red-400/60 border border-red-500/80" />
                            <div className="size-3 rounded-full bg-yellow-400/60 border border-yellow-500/80" />
                            <div className="size-3 rounded-full bg-green-400/60 border border-green-500/80" />
                        </div>
                        {/* Icon and Title/Extension */}
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground overflow-x-auto scrollbar-hide whitespace-nowrap">
                            <span className="shrink-0">{icon}</span>
                            <span className="overflow-x-auto scrollbar-hide">{displayTitle}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
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
            )}
            <div className={cn(
                "relative overflow-x-auto",
                maxLines && !isExpanded && "overflow-y-hidden",
                !maxLines || !expandable ? "rounded-b-[calc(var(--radius,0.5rem)-1px)]" : ""
            )}>
                <pre
                    {...props}
                    ref={preRef}
                    className={cn(
                        "py-4 mt-0! mb-0!",
                        !isWrapped && "min-w-max",
                        isWrapped && "whitespace-pre-wrap break-words",
                        maxLines && !isExpanded ? "overflow-hidden select-none" : "",
                        className
                    )}
                    style={{
                        ...style,
                        ...(maxLines && !isExpanded && {
                            maxHeight: maxHeightValue,
                            overflow: "hidden",
                        })
                    }}
                >
                    {children}
                </pre>
            </div>
            {maxLines && expandable && (
                <div className={cn(
                    "relative",
                    !isExpanded ? "absolute bottom-0 inset-x-0 h-28 flex flex-col justify-end" : "border-t border-border/40"
                )}>
                    {!isExpanded && (
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none"
                            aria-hidden="true"
                        />
                    )}

                    <button
                        onClick={onToggleExpand}
                        className={cn(
                            "relative z-10 w-full px-4 text-xs font-medium transition-all duration-200 cursor-pointer",
                            "flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground",
                            !isExpanded
                                ? "pb-4 pt-10 bg-none"
                                : "py-3 bg-background/50 backdrop-blur-sm border-t border-border/20"
                        )}
                    >
                        <div className="flex items-center gap-2 bg-background/80 dark:bg-muted/20 px-3 py-1.5 rounded-full border border-border/80 backdrop-blur-md">
                            <ChevronDown
                                className={cn(
                                    "size-3.5 transition-transform duration-300",
                                    isExpanded && "rotate-180"
                                )}
                            />
                            <span>{isExpanded ? collapseLabel : expandLabel}</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
    )
}

