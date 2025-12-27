"use client"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface MDXImageProps extends Omit<React.ComponentProps<typeof Image>, 'src'> {
    filename?: string;
    src?: string;
}

export function MDXImage({
    className,
    alt,
    width = 1920,
    height = 1080,
    filename,
    ...props
}: MDXImageProps) {
    const imageSrc = props.src || `${filename}`;

    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 })

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4))
    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) setPan({ x: 0, y: 0 }); // Reset pan on fully zoomed out
            return newZoom;
        })
    }
    const handleReset = () => {
        setZoom(1)
        setPan({ x: 0, y: 0 })
    }

    const handlePointerDown = (e: React.PointerEvent) => {
        if (zoom > 1) {
            setIsDragging(true)
            setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y })
            e.currentTarget.setPointerCapture(e.pointerId)
        }
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging && zoom > 1) {
            e.preventDefault()
            setPan({
                x: e.clientX - startPos.x,
                y: e.clientY - startPos.y
            })
        }
    }

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false)
        e.currentTarget.releasePointerCapture(e.pointerId)
    }

    return (
        <Dialog onOpenChange={(open) => {
            if (!open) {
                setZoom(1)
                setPan({ x: 0, y: 0 })
            }
        }}>
            <DialogTrigger asChild>
                <div className="flex flex-col gap-2">
                    <Image
                        className={cn("rounded-md border cursor-pointer hover:opacity-90 transition-opacity", className)}
                        alt={alt}
                        width={width}
                        height={height}
                        src={imageSrc}
                        {...props}
                    />
                    {alt && <span className="text-sm text-muted-foreground text-center">{alt}</span>}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-none bg-transparent shadow-none p-0 [&>button[data-dialog-close]]:bg-background/50 [&>button[data-dialog-close]]:hover:bg-background [&>button[data-dialog-close]]:text-foreground [&>button[data-dialog-close]]:top-0 [&>button[data-dialog-close]]:right-0 [&>button[data-dialog-close]]:z-50">
                <DialogTitle className="sr-only">{alt}</DialogTitle>
                <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className={cn(
                            "relative transition-transform duration-200 ease-out",
                            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                        )}
                        style={{
                            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                            transition: isDragging ? 'none' : 'transform 200ms ease-out'
                        }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                    >
                        <Image
                            src={imageSrc}
                            alt={alt}
                            width={1920}
                            height={1080}
                            className="object-contain max-h-[80vh] w-auto h-auto select-none"
                            quality={100}
                            draggable={false}
                        />
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    <Button variant="secondary" size="icon" onClick={handleZoomIn} disabled={zoom >= 4} className="cursor-pointer">
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleReset} disabled={zoom === 1} className="cursor-pointer">
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleZoomOut} disabled={zoom <= 1} className="cursor-pointer">
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
