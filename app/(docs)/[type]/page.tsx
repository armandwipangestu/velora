import { redirect, notFound } from "next/navigation";
import { docs } from "#site/content";

interface TypeIndexPageProps {
    params: Promise<{
        type: string;
    }>;
}

export default async function TypeIndexPage({ params }: TypeIndexPageProps) {
    const resolvedParams = await params;
    const typeDocs = docs.filter((doc) => doc.slug.startsWith(resolvedParams.type));

    if (typeDocs.length === 0) {
        notFound();
    }

    // Redirect to the first document in this section
    redirect(`/${typeDocs[0].slug}`);
}
