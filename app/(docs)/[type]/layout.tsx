import { docs, Doc } from "#site/content";
import { getDocsSidebar } from "@/lib/docs";
import { DocsSidebar } from "@/components/docs-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsMobileNav } from "@/components/docs-mobile-nav";
import { DocsToc } from "@/components/docs-toc";

interface DocsLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        type: string;
        slug?: string[];
    }>;
}

export default async function DocsLayout({ children, params }: DocsLayoutProps) {
    const resolvedParams = await params;
    const sidebarItems = getDocsSidebar(docs, resolvedParams.type);

    // Find current doc to get TOC
    const slugArray = resolvedParams.slug || [];
    const currentSlug = `${resolvedParams.type}/${slugArray.join("/")}`;
    const doc = docs.find((d) => d.slug === currentSlug);

    return (
        <div className="flex flex-col min-h-screen">
            <DocsMobileNav
                sidebar={<DocsSidebar items={sidebarItems} />}
                toc={doc ? <DocsToc items={doc.toc} /> : null}
            />
            <div className="max-w-[1440px] mx-auto w-full flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)_240px] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)_280px] lg:gap-10 px-4 md:px-6">
                <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
                    <ScrollArea className="h-full py-6 pr-6">
                        <DocsSidebar items={sidebarItems} />
                    </ScrollArea>
                </aside>
                <main className="relative py-8 lg:py-10">
                    <div className="mx-auto w-full min-w-0 max-w-5xl">
                        {children}
                    </div>
                </main>
                <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
                    <ScrollArea className="h-full py-6 pl-6">
                        {doc && <DocsToc items={doc.toc} />}
                    </ScrollArea>
                </aside>
            </div>
        </div>
    );
}
