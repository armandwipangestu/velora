"use client"

import React from "react";
import { InfiniteSlider } from "./infinite-scroll";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMdx, SiShadcnui, SiTailwindcss } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { FaDocker } from "react-icons/fa6";

const LOGO_TECH_STACKS = [
    { Icon: RiNextjsFill, label: "Next.js", color: undefined },
    { Icon: BiLogoTypescript, label: "TypeScript", color: "#3178C6" },
    { Icon: SiMdx, label: "MDX", color: "#F9AC00" },
    { Icon: SiTailwindcss, label: "Tailwind CSS", color: "#06B6D4" },
    { Icon: SiShadcnui, label: "Shadcn UI", color: undefined },
    { Icon: FaDocker, label: "Docker", color: "#2496ED" },
];

export function TechStack() {
    return (
        <div className="space-y-6">
            <InfiniteSlider
                title="Build With"
                icons={LOGO_TECH_STACKS}
                direction="left"
            />
        </div>
    );
}
