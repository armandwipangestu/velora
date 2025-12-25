import { siteConfig } from "@/config/site";
import { Github, Globe } from "lucide-react";

export function SiteFooter() {
    return (
        <footer className="container py-12 mt-auto border-t border-border/40">
            <div className="mb-3 flex justify-center space-x-4">

                <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.personalSite}`}>
                    <span className="sr-only">Personal Site</span>
                    <Globe className="h-6 w-6" />
                </a>

                <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.github}`}>
                    <span className="sr-only">Github</span>
                    <Github className="h-6 w-6" />
                </a>
            </div>
            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                <p>Distributed under the MIT License.</p>
                <p>© 2025 Velora. All rights reserved.</p>
            </div>
        </footer>
    )
}