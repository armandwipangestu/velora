"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
    TransformWrapper,
    TransformComponent,
    useTransformContext
} from "react-zoom-pan-pinch";
import {
    RotateCcw,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    ArrowLeftRight,
    Copy,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

// Initialize mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "var(--font-mono)",
});

interface MermaidProps {
    code: string;
}

type AnimationType =
    | "easeOut"
    | "linear"
    | "easeInQuad"
    | "easeOutQuad"
    | "easeInOutQuad"
    | "easeInCubic"
    | "easeOutCubic"
    | "easeInOutCubic"
    | "easeInQuart"
    | "easeOutQuart"
    | "easeInOutQuart"
    | "easeInQuint"
    | "easeOutQuint"
    | "easeInOutQuint";

interface ControlsProps {
    zoomIn: (step?: number, animationTime?: number, animationType?: AnimationType) => void;
    zoomOut: (step?: number, animationTime?: number, animationType?: AnimationType) => void;
    resetTransform: (animationTime?: number, animationType?: AnimationType) => void;
    setTransform: (x: number, y: number, scale: number, animationTime?: number, animationType?: AnimationType) => void;
    instance: {
        transformState: {
            positionX: number;
            positionY: number;
            scale: number;
        };
    };
    onCopy: () => void;
    isCopied: boolean;
}

const Controls = ({ zoomIn, zoomOut, resetTransform, setTransform, instance, onCopy, isCopied }: ControlsProps) => {
    const handlePan = (direction: 'up' | 'down' | 'left' | 'right') => {
        if (!instance) return;
        const step = 40;
        const { positionX, positionY, scale } = instance.transformState;
        switch (direction) {
            case 'up': setTransform(positionX, positionY + step, scale); break;
            case 'down': setTransform(positionX, positionY - step, scale); break;
            case 'left': setTransform(positionX + step, positionY, scale); break;
            case 'right': setTransform(positionX - step, positionY, scale); break;
        }
    };

    return (
        <>
            {/* Top Right Buttons */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button
                    className="p-2 bg-[#161b22]/80 hover:bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] rounded-md border border-[#30363d] transition-colors"
                    title="Toggle Width"
                >
                    <ArrowLeftRight className="size-4" />
                </button>
                <button
                    onClick={onCopy}
                    className="p-2 bg-[#161b22]/80 hover:bg-[#161b22] text-[#8b949e] hover:text-[#c9d1d9] rounded-md border border-[#30363d] transition-colors"
                    title="Copy Mermaid Code"
                >
                    {isCopied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                </button>
            </div>

            {/* Bottom Right Controls */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-4 items-end">
                {/* Pad 1: Navigation and Reset */}
                <div className="grid grid-cols-3 bg-[#161b22]/80 backdrop-blur-sm p-1.5 rounded-xl border border-[#30363d] shadow-2xl">
                    <div />
                    <button
                        onClick={() => handlePan('up')}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-lg transition-colors"
                        title="Pan Up"
                    >
                        <ChevronUp className="size-4" />
                    </button>
                    <div />

                    <button
                        onClick={() => handlePan('left')}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-lg transition-colors"
                        title="Pan Left"
                    >
                        <ChevronLeft className="size-4" />
                    </button>
                    <button
                        onClick={() => resetTransform()}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-lg transition-colors"
                        title="Reset View"
                    >
                        <RotateCcw className="size-4" />
                    </button>
                    <button
                        onClick={() => handlePan('right')}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-lg transition-colors"
                        title="Pan Right"
                    >
                        <ChevronRight className="size-4" />
                    </button>

                    <div />
                    <button
                        onClick={() => handlePan('down')}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-lg transition-colors"
                        title="Pan Down"
                    >
                        <ChevronDown className="size-4" />
                    </button>
                    <div />
                </div>

                {/* Pad 2: Zoom */}
                <div className="flex flex-col bg-[#161b22]/80 backdrop-blur-sm p-1.5 rounded-xl border border-[#30363d] shadow-2xl overflow-hidden">
                    <button
                        onClick={() => zoomIn()}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-t-lg transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn className="size-4" />
                    </button>
                    <button
                        onClick={() => zoomOut()}
                        className="p-2 hover:bg-[#30363d] text-[#8b949e] hover:text-[#c9d1d9] rounded-b-lg transition-colors border-t border-[#30363d]/50"
                        title="Zoom Out"
                    >
                        <ZoomOut className="size-4" />
                    </button>
                </div>
            </div>
        </>
    );
};

export function Mermaid({ code }: MermaidProps) {
    const [svg, setSvg] = useState<string>("");
    const [isCopied, setIsCopied] = useState(false);
    const [id] = useState(() => `mermaid-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!code || code.trim() === "") {
                console.warn("Mermaid code is empty");
                return;
            }
            try {
                // Clear any previous error states or content
                const { svg } = await mermaid.render(id, code);
                setSvg(svg);
            } catch (error) {
                console.error("Mermaid rendering failed:", error);
                setSvg(`<div class="text-red-500 font-medium flex items-center justify-center h-full text-lg">Failed to render Mermaid diagram</div>`);
            }
        };

        renderDiagram();
    }, [code, id]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <div className="mdx-mermaid-container relative w-full border border-border/40 rounded-xl overflow-hidden bg-[#0d1117] min-h-[450px] my-6 group">
            <TransformWrapper
                initialScale={1}
                minScale={0.1}
                maxScale={5}
                centerOnInit={true}
            >
                {({ zoomIn, zoomOut, resetTransform, setTransform, instance }) => (
                    <>
                        <Controls
                            zoomIn={zoomIn}
                            zoomOut={zoomOut}
                            resetTransform={resetTransform}
                            setTransform={setTransform}
                            instance={instance}
                            onCopy={handleCopy}
                            isCopied={isCopied}
                        />
                        <TransformComponent
                            wrapperStyle={{
                                width: "100%",
                                height: "600px",
                                cursor: "grab",
                            }}
                            contentStyle={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                className="mermaid-svg-container p-12 transition-all duration-300"
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
}
