import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconFolderCode } from "@tabler/icons-react"

export default function NotFound() {
    return (
        <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden py-20 md:py-32">
            {/* Layer 2: Grid Pattern - Light Mode */}
            <div
                className="absolute inset-0 z-0 dark:hidden"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #f0f0f0 1px, transparent 1px), linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)",
                    backgroundSize: "6rem 4rem",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    opacity: 0.85,
                }}
            />

            {/* Layer 2: Grid Pattern - Dark Mode */}
            <div
                className="absolute inset-0 z-0 hidden dark:block"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "6rem 4rem",
                    maskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 70%)",
                    opacity: 0.8,
                }}
            />

            <div className="z-10 flex flex-col items-center justify-center text-center max-w-md px-4">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <IconFolderCode className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Page not found</h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
                </p>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/blog">
                            Browse Blog
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
