import { posts } from "#site/content"
import { BlogHeader } from "@/components/blog-header";
import { BlogSidebar } from "@/components/blog-sidebar";
import { PostItem } from "@/components/post-item"
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils"
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Blog",
    description: "My ramblings on all things web dev."
}

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
        query?: string;
        tag?: string;
        sort?: "newest" | "oldest";
        perPage?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedSearchParams = await searchParams;

    const query = resolvedSearchParams?.query || "";
    const tag = resolvedSearchParams?.tag || "";
    const sort = resolvedSearchParams?.sort || "newest";
    const perPage = Number(resolvedSearchParams?.perPage) || 5;
    const currentPage = Number(resolvedSearchParams?.page) || 1

    // 1. Get all published posts for tag aggregation
    const allPublishedPosts = posts.filter(post => post.published);

    // 2. Aggregate tags and counts
    const tags: Record<string, number> = {};
    allPublishedPosts.forEach(post => {
        post.tags?.forEach(t => {
            tags[t] = (tags[t] || 0) + 1;
        });
    });

    // 3. Filter posts
    let filteredPosts = allPublishedPosts.filter(post => {
        const searchLower = query.toLowerCase();
        const matchesQuery = !query || (
            post.title.toLowerCase().includes(searchLower) ||
            post.slug.toLowerCase().includes(searchLower) ||
            (post.description && post.description.toLowerCase().includes(searchLower)) ||
            (post.tags && post.tags.some(t => t.toLowerCase().includes(searchLower)))
        );

        const matchesTag = !tag || (post.tags && post.tags.includes(tag));

        return matchesQuery && matchesTag;
    });

    // 4. Sort posts
    filteredPosts = filteredPosts.sort((a, b) => {
        if (sort === "newest") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
    });

    const totalPages = Math.ceil(filteredPosts.length / perPage)

    const displayPosts = filteredPosts.slice(
        perPage * (currentPage - 1),
        perPage * currentPage
    )

    return (
        <>
            <BlogHeader />
            <main className="container max-w-6xl py-6 lg:py-10">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    {/* Posts List */}
                    <div className="flex-1">
                        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-8">
                            <div className="flex-1 space-y-4">
                                <h1 className="inline-block font-black text-4xl lg:text-5xl">
                                    Blog
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    My ramblings on all things web dev.
                                </p>
                            </div>
                        </div>

                        <hr className="my-8" />

                        {displayPosts?.length > 0 ? (
                            <ul className="flex flex-col">
                                {displayPosts.map((post) => {
                                    const { slug, date, title, description, tags } = post;

                                    return (
                                        <li key={slug}>
                                            <PostItem
                                                slug={slug}
                                                date={date}
                                                title={title}
                                                description={description}
                                                tags={tags}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <p>Nothing to see here yet.</p>
                        )}

                        <Suspense>
                            <QueryPagination totalPages={totalPages} className="justify-end mt-8" />
                        </Suspense>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[250px] shrink-0">
                        <div className="sticky top-20">
                            <BlogSidebar tags={tags} />
                        </div>
                    </aside>
                </div>
            </main>
        </>
    )
}