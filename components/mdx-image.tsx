"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function MDXImage({
    className,
    alt,
    width,
    height,
    ...props
}: React.ComponentProps<typeof Image>) {
    return (
        <Dialog>
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
                <div className="relative h-[80vh] w-full">
                    <Image
                        src={props.src}
                        alt={alt}
                        fill
                        className="object-contain"
                        quality={100}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
