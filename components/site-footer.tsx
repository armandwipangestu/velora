"use client";

import { siteConfig } from "@/config/site";
import { Github, Globe } from "lucide-react";
import { GALink } from "./google-analytics-link";
import { phCapture } from "@/lib/posthog";

export function SiteFooter() {
    return (
        <footer className="container py-12 mt-auto border-t border-border/40">
            <div className="mb-3 flex justify-center space-x-4">

                <GALink
                    action="click_personal_site"
                    category="navigation"
                    label="Footer"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${siteConfig.links.personalSite}`}
                    onClick={() =>
                        phCapture("personal_site_clicked", {
                            location: "footer",
                        })
                    }
                >
                    <span className="sr-only">Personal Site</span>
                    <Globe className="h-6 w-6" />
                </GALink>

                <GALink
                    action="click_github"
                    category="navigation"
                    label="Footer"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${siteConfig.links.github}`}
                    onClick={() =>
                        phCapture("github_clicked", {
                            location: "footer",
                        })
                    }
                >
                    <span className="sr-only">Github</span>
                    <Github className="h-6 w-6" />
                </GALink>
            </div>
            <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
                <p>Distributed under the MIT License.</p>
                <p>© 2025 Velora. All rights reserved.</p>
            </div>
        </footer>
    )
}