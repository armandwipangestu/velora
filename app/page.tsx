import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Github, Rocket, ShieldCheck, Zap, Files } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="container pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-48">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-balance">
              <span className="text-primary block">Velite</span>
              Make Creative Contents Easy
            </h1>
            <p className="max-w-[42rem] mx-auto lg:mx-0 text-muted-foreground text-lg sm:text-xl md:text-2xl text-balance font-medium">
              New Choices for Content-first Apps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/guide"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-fit px-8 rounded-full h-12 text-base font-semibold transition-all duration-300 hover:scale-105 bg-[#10b981] hover:bg-[#10b981]/90"
                )}
              >
                Get Started
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="norefferrer noopener"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-fit px-8 rounded-full h-12 text-base font-semibold transition-all duration-300 hover:scale-105 bg-muted/50"
                )}
              >
                <Github size={20} className="mr-2" />
                View on GitHub
              </Link>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center items-center py-20 lg:py-0">
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-[#10b981]/20 via-transparent to-transparent blur-3xl scale-150 animate-pulse pointer-events-none" />
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 drop-shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-transform duration-500 hover:scale-110">
              <Icons.logo className="w-full h-full text-foreground" />
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

      <footer className="container py-12 mt-auto border-t border-border/40">
        <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
          <p>Distributed under the MIT License.</p>
          <p>© 2025 Velora. All rights reserved.</p>
        </div>
      </footer>
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

