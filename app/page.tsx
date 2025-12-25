import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Github, Rocket, ShieldCheck, Zap, Files } from "lucide-react";
import { pages } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import "@/styles/mdx.css"
import { InfiniteSlider } from "@/components/infinite-scroll";
import { BiLogoTypescript } from "react-icons/bi";
import { SiMdx, SiShadcnui, SiTailwindcss } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { FaDocker } from "react-icons/fa6";

interface IconConfig {
  Icon: React.ComponentType<{
    width?: number;
    height?: number;
    className?: string;
  }>;
  label: string;
}

const LOGO_TECH_STACKS: IconConfig[] = [
  { Icon: RiNextjsFill, label: "Next.js" },
  { Icon: BiLogoTypescript, label: "TypeScript" },
  { Icon: SiMdx, label: "MDX" },
  { Icon: SiTailwindcss, label: "Tailwind CSS" },
  { Icon: SiShadcnui, label: "Shadcn UI" },
  { Icon: FaDocker, label: "Docker" },
];

export default function Home() {
  const landingPage = pages.find((p) => p.slug === "landing");

  return (
    <div className="flex flex-col min-h-screen">
      <section className="container pt-8 pb-16 md:pt-32 md:pb-24 lg:pt-24 overflow-x-hidden">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 w-full text-center lg:text-left space-y-4 md:space-y-6">
            <h1 className="text-3xl sm:text-6xl md:text-4xl lg:text-5xl font-black tracking-tight text-balance leading-[1.2]">
              <span className="text-primary block">Velora</span>
              A developer-first MDX blog powered by Velite
            </h1>
            <p className="max-w-[42rem] mx-auto lg:mx-0 text-muted-foreground text-base sm:text-xl md:text-2xl text-balance font-medium">
              A type-safe, very rich code block feature, dynamic open graph image, and more.
            </p>

            <div className="w-full max-w-[42rem] mx-auto lg:mx-0 text-left prose dark:prose-invert prose-pre:my-0 prose-pre:rounded-none overflow-hidden">
              {landingPage ? (
                <MDXContent code={landingPage.body} />
              ) : (
                <p>No description available.</p>
              )}
            </div>

            <div className="space-y-6">
              <InfiniteSlider
                title="Build Using"
                icons={LOGO_TECH_STACKS}
                direction="left"
              />
            </div>

            <div className="flex flex-row gap-3 justify-center lg:justify-start pt-4 px-2">
              <Link
                href="/guide"
                className={cn(
                  buttonVariants({ size: "default" }),
                  "flex-1 sm:flex-none px-6 sm:px-8 rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 bg-[#10b981] hover:bg-[#10b981]/90"
                )}
              >
                Get Started
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="norefferrer noopener"
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "flex-1 sm:flex-none px-6 sm:px-8 rounded-full h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 bg-muted/50"
                )}
              >
                GitHub
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative flex justify-center items-center py-6 lg:py-0">
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#10b981]/30 via-[#06b6d4]/5 via-transparent-70% to-transparent blur-2xl sm:blur-3xl scale-90 sm:scale-80 animate-pulse pointer-events-none" />
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#10b981]/15 via-transparent to-transparent blur-xl sm:blur-2xl scale-75 sm:scale-110 pointer-events-none" />
            <div className="relative z-10 w-40 h-40 sm:w-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-transform duration-500 hover:scale-110">
              <Icons.logo className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-24 md:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Rocket className="text-orange-500" />}
            title="Out of the Box"
            description="Turns your Markdown / MDX, YAML, JSON, or other files into application data layer."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-yellow-500" />}
            title="Type-Safe Contents"
            description="Content Fields validation based on Zod schema, and auto-generated TypeScript types."
          />
          <FeatureCard
            icon={<Zap className="text-blue-500" />}
            title="Light & Efficient"
            description="Light-weight & High efficiency & Still powerful, faster startup, and better performance."
          />
          <FeatureCard
            icon={<Files className="text-yellow-600" />}
            title="Assets Processing"
            description="Built-in Assets Processing, such as relative path resolving, image optimization, etc."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group relative p-8 rounded-3xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="relative z-10 space-y-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-muted/50 text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}

