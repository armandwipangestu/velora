import { docs } from "#site/content";
import { DocsToc } from "@/components/docs-toc";

interface TocPageProps {
    params: Promise<{
        type: string;
        slug: string[];
    }>;
}

export default async function TocPage({ params }: TocPageProps) {
    const resolvedParams = await params;
    const slugArray = resolvedParams.slug || [];
    const currentSlug = `${resolvedParams.type}/${slugArray.join("/")}`;
    const doc = docs.find((d) => d.slug === currentSlug);

    if (!doc) {
        return null;
    }

    return <DocsToc items={doc.toc} />;
}
