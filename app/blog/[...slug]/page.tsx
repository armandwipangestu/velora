import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import "@/styles/mdx.css"
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import Giscus from "@/components/giscus";
import { TocSidebar, MobileToc } from "@/components/toc";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PostItem } from "@/components/post-item"

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

export async function generateMetadata({
    params
}: PostPageProps): Promise<Metadata> {
    const post = await getPostFromParams(await params)

    if (!post) {
        return {}
    }

    const ogSearchParams = new URLSearchParams();
    ogSearchParams.set("title", post.title)

    return {
        title: post.title,
        description: post.description,
        authors: {
            name: siteConfig.author
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url: post.slug,
            images: [
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: post.title
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [
                `/api/og?${ogSearchParams.toString()}`
            ]
        }
    }
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
    // Related Posts
    const relatedPosts = posts
        .filter(p => p.slug !== post.slug && p.published && p.tags?.some(t => post.tags?.includes(t)))
        .slice(0, 3);

    return (
        <article className="container py-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
                {/* Main Content */}
                <div className="prose dark:prose-invert max-w-3xl">
                    <h1 className="mb-2">{post.title}</h1>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 not-prose mb-4">
                            {post.tags.map(tag => (
                                <Link
                                    key={tag}
                                    href={`/blog?tag=${tag}`}
                                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-6 text-xs")}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    )}

                    {post.description ? (
                        <p className="text-xl mt-0 text-muted-foreground">
                            {post.description}
                        </p>
                    ) : null}
                    <hr className="my-4" />

                    <MDXContent code={post.body} />

                    <hr className="my-8" />
                    <Giscus />

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="not-prose mt-12">
                            <h3 className="text-2xl font-bold mb-4">Related Posts</h3>
                            <div className="flex flex-col gap-4">
                                {relatedPosts.map(p => (
                                    <PostItem
                                        key={p.slug}
                                        slug={p.slug}
                                        title={p.title}
                                        date={p.date}
                                        description={p.description}
                                        tags={p.tags}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar TOC - Desktop */}
                <aside className="hidden lg:block">
                    <div className="sticky top-20">
                        <TocSidebar items={post.toc} />
                    </div>
                </aside>
            </div>

            {/* Mobile TOC */}
            <MobileToc items={post.toc} />
        </article>
    )
}