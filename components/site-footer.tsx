import { siteConfig } from "@/config/site";
import { Github, Gitlab, Globe, Instagram, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
    return (
        <footer>
            <div className="mb-6 mt-14 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    <a target="_blank" rel="noopener noreferrer" href={`mailto:${siteConfig.links.email}`}>
                        <span className="sr-only">Mail</span>
                        <Mail className="h-6 w-6" />
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.personalSite}`}>
                        <span className="sr-only">Personal Site</span>
                        <Globe className="h-6 w-6" />
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.github}`}>
                        <span className="sr-only">Github</span>
                        <Github className="h-6 w-6" />
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.gitlab}`}>
                        <span className="sr-only">Gitlab</span>
                        <Gitlab className="h-6 w-6" />
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.linkedin}`}>
                        <span className="sr-only">Linkedin</span>
                        <Linkedin className="h-6 w-6" />
                    </a>

                    <a target="_blank" rel="noopener noreferrer" href={`${siteConfig.links.instagram}`}>
                        <span className="sr-only">Instagram</span>
                        <Instagram className="h-6 w-6" />
                    </a>
                </div>
                <div className="mb-2 flex space-x-2 text-sm text-muted-foreground">
                    <a href={siteConfig.links.personalSite} target="_blank" rel="noopener noreferrer">
                        {siteConfig.author}
                    </a>
                    <span>© 2025 - {new Date().getFullYear()}. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}