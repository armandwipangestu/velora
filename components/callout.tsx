import { cn } from "@/lib/utils";
import {
    AlertCircle,
    Info,
    Lightbulb,
    AlertTriangle,
    XCircle,
} from "lucide-react"
import type { ReactNode } from "react";

export type CalloutType = "note" | "tip" | "important" | "warning" | "caution"

export type CalloutDescriptionColor = "default" | "normal" | "muted"

interface CalloutProps {
    type?: CalloutType;
    title?: string;
    descriptionColor?: CalloutDescriptionColor;
    children: ReactNode;
}

const calloutConfig: Record<
    CalloutType,
    {
        icon: typeof Info;
        className: string;
        defaultTitle: string;
    }
> = {
    note: {
        icon: Info,
        className: "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        defaultTitle: "Note",
    },
    tip: {
        icon: Lightbulb,
        className: "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400",
        defaultTitle: "Tip",
    },
    important: {
        icon: AlertCircle,
        className: "border-purple-500/50 bg-purple-500/10 text-purple-600 dark:text-purple-400",
        defaultTitle: "Important",
    },
    warning: {
        icon: AlertTriangle,
        className: "border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        defaultTitle: "Warning",
    },
    caution: {
        icon: XCircle,
        className: "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400",
        defaultTitle: "Caution"
    }
}

export function Callout({ type = "note", title, children, descriptionColor = "default" }: CalloutProps) {
    const config = calloutConfig[type]
    const Icon = config.icon;

    return (
        <div
            className={cn(
                "my-6 flex gap-3 rounded-lg border p-4",
                config.className
            )}
        >
            <Icon className="h-5 w-5 shrink-0" />
            <div className="min-w-0">
                <p className="!m-0 !mb-1 font-semibold leading-tight">
                    {title || config.defaultTitle}
                </p>
                <div className={`text-sm [&>p]:m-0 ${descriptionColor === "default" ? "" : descriptionColor === "normal" ? "text-foreground" : "text-muted-foreground"}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}