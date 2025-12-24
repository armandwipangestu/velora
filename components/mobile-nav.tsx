"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "./icons"
import { siteConfig } from "@/config/site"
import { ThemeToggle } from "./layout/theme-toggle"

export function MobileNav() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="w-10 px-0 sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>
                <div className="flex flex-col gap-6 mt-8">
                    <MobileLink onOpenChange={setOpen} href="/" className="flex items-center">
                        <Icons.logo className="mr-2 h-6 w-6" />
                        <span className="font-bold text-lg">{siteConfig.name}</span>
                    </MobileLink>

                    <div className="flex flex-col gap-4">
                        <MobileLink onOpenChange={setOpen} href="/guide" className="text-lg font-medium border-b border-border pb-2">
                            Guide
                        </MobileLink>
                        <MobileLink onOpenChange={setOpen} href="/reference" className="text-lg font-medium border-b border-border pb-2">
                            Reference
                        </MobileLink>
                        <MobileLink onOpenChange={setOpen} href="/examples" className="text-lg font-medium border-b border-border pb-2">
                            Examples
                        </MobileLink>
                    </div>

                    <div className="flex flex-col gap-4 p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Appearance</span>
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="flex justify-center mt-auto">
                        <Link
                            target="_blank"
                            rel="norefferrer noopener"
                            href={siteConfig.links.github}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Icons.gitHub className="h-8 w-8" />
                        </Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

interface MobileLinkProps extends LinkProps {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

function MobileLink({
    href,
    onOpenChange,
    children,
    className,
    ...props
}: MobileLinkProps) {
    const router = useRouter()

    return <Link href={href} onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
    }}
        className={className}
        {...props}
    >
        {children}
    </Link>
}