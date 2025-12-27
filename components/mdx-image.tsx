"use client"
import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

export function MDXImage({
    className,
    alt,
    width,
    height,
    ...props
}: React.ComponentProps<typeof Image>) {
    const [zoom, setZoom] = useState(1)

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4))
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1))
    const handleReset = () => setZoom(1)

    return (
        <Dialog onOpenChange={(open) => !open && setZoom(1)}>
            <DialogTrigger asChild>
                <Image
                    className={cn("rounded-md border cursor-pointer hover:opacity-90 transition-opacity", className)}
                    alt={alt}
                    width={width}
                    height={height}
                    {...props}
                />
            </DialogTrigger>
            <DialogContent className="max-w-4xl border-none bg-transparent shadow-none p-0">
                <DialogTitle className="sr-only">{alt}</DialogTitle>
                <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
                    <div
                        className="relative transition-transform duration-200 ease-out"
                        style={{ transform: `scale(${zoom})` }}
                    >
                        <Image
                            src={props.src}
                            alt={alt}
                            width={1920}
                            height={1080}
                            className="object-contain max-h-[80vh] w-auto h-auto"
                            quality={100}
                        />
                    </div>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <Button variant="secondary" size="icon" onClick={handleZoomIn} disabled={zoom >= 4}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleReset} disabled={zoom === 1}>
                        <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={handleZoomOut} disabled={zoom <= 1}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
