import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css"

interface PostPageProps {
    params: Promise<{
        slug: string[];
    }>
}

async function getPostFromParams(params: Awaited<PostPageProps["params"]>) {
    const slug = params?.slug?.join("/")
    const post = posts.find((post) => post.slugAsParams === slug)

    return post
}

export async function generateStaticParams(): Promise<Awaited<PostPageProps["params"]>[]> {
    return posts.map(post => ({
        slug: post.slugAsParams.split("/")
    }))
}

export default async function PostPage({ params }: PostPageProps) {
    const resolvedParams = await params
    const post = await getPostFromParams(resolvedParams)

    if (!post || !post.published) {
        notFound()
    }


    /**
     * If you want to customize all of the components it rendered by mdx (not using prose dark:prose-invert). You can check mdx-components.tsx for more info
     */
    return <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
        <h1 className="mb-2">{post.title}</h1>
        {post.description ? (
            <p className="text-xl mt-0 text-muted-foreground">
                {post.description}
            </p>
        ) : null}
        <hr className="my-4" />

        <MDXContent code={post.body} />
    </article>
}