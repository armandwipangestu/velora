"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { Icons } from "./icons"
import { siteConfig } from "@/config/site"
import { VersionBadge } from "./ui/version-badge"
import { navLinks } from "./layout/navbar"

export function MobileNav() {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="flex flex-col w-full sm:w-full p-0 gap-0">
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Mobile navigation menu</SheetDescription>

                {/* Custom Header */}
                <div className="flex h-16 items-center justify-between px-4 border-b">
                    <div className="flex items-center gap-2">
                        <MobileLink onOpenChange={setOpen} href="/" className="flex items-center gap-2">
                            <Icons.logo className="h-8 w-8" />
                        </MobileLink>
                        <VersionBadge />
                    </div>
                </div>

                <div className="flex flex-col flex-1 px-4 py-8 overflow-y-auto">
                    <nav className="flex flex-col space-y-1">
                        {navLinks.map((link) => (
                            <MobileLink
                                key={link.href}
                                onOpenChange={setOpen}
                                href={link.href}
                                className="text-lg font-medium py-4 border-b border-border/50 transition-colors hover:text-primary active:bg-muted/50"
                            >
                                {link.label}
                            </MobileLink>
                        ))}
                    </nav>

                    <div className="mt-12 flex justify-center">
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