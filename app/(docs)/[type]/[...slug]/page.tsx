import { notFound } from "next/navigation";
import { docs } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { DocsPager } from "@/components/docs-pager";
import { getPager } from "@/lib/docs";
import "@/styles/mdx.css"

interface DocPageProps {
    params: Promise<{
        type: string;
        slug: string[];
    }>;
}

export async function generateStaticParams() {
    return docs.map((doc) => ({
        type: doc.slug.split("/")[0],
        slug: doc.slug.split("/").slice(1),
    }));
}

export default async function DocPage({ params }: DocPageProps) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const slug = `${resolvedParams.type}/${slugArray.join("/")}`;
    const doc = docs.find((d) => d.slug === slug);

    if (!doc || !doc.published) {
        notFound();
    }

    const { prev, next } = getPager(docs, resolvedParams.type, doc.slug);

    // Get parent title for subheading if exists
    const slugParts = doc.slug.split("/");
    let displayTitle = doc.title;
    if (slugParts.length > 2) {
        const parentSlug = slugParts.slice(0, -1).join("/");
        const parentDoc = docs.find((d) => d.slug === parentSlug);
        if (parentDoc) {
            displayTitle = `${parentDoc.title} - ${doc.title}`;
        }
    }

    return (
        <article className="prose dark:prose-invert max-w-none">
            <div className="mb-4">
                {doc.category && (
                    <p className="text-sm font-black tracking-widest text-primary uppercase mb-2">
                        {doc.category}
                    </p>
                )}
                <h1 className="text-4xl font-black tracking-tight mt-0">{displayTitle}</h1>
                {doc.description && (
                    <p className="text-xl text-muted-foreground mt-4 mb-8">
                        {doc.description}
                    </p>
                )}
            </div>
            <hr className="my-8" />
            <MDXContent code={doc.body} />
            <hr className="my-12" />
            <DocsPager prev={prev} next={next} />
        </article>
    );
}
