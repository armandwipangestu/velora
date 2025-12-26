import { posts } from "#site/content"
import { BlogHeader } from "@/components/blog-header";
import { PostItem } from "@/components/post-item"
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Blog",
    description: "My ramblings on all things web dev."
}

const POSTS_PER_PAGE = 5;

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedSearchParams = await searchParams;

    const currentPage = Number(resolvedSearchParams?.page) || 1
    const sortedPosts = sortPosts(posts.filter(post => post.published))
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

    const displayPosts = sortedPosts.slice(
        POSTS_PER_PAGE * (currentPage - 1),
        POSTS_PER_PAGE * currentPage
    )

    return (
        <>
            <BlogHeader />
            <div className="container max-w-4xl py-6 lg:py-10">
                <div className="flex flex-col items-start gap-4 md:flex-rows md:justify-between md:gap-8">
                    <div className="flex-1 space-y-4">
                        <h1 className="inline-block font-black text-4xl lg:text-5xl">
                            Blog
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            My ramblings on all things web dev.
                        </p>
                    </div>
                </div>

                <hr className="mt-8" />

                {displayPosts?.length > 0 ? (
                    <ul className="flex flex-col">
                        {displayPosts.map((post) => {
                            const { slug, date, title, description } = post;

                            return (
                                <li key={slug}>
                                    <PostItem slug={slug} date={date} title={title} description={description} />
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p>Nothing to see here yet.</p>
                )}

                <Suspense>
                    <QueryPagination totalPages={totalPages} className="justify-end mt-4" />
                </Suspense>
            </div>
        </>
    )
}