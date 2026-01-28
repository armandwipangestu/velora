"use client";

import { useScrollDepth } from "@/hooks/use-scroll-depth";

interface BlogPostTrackingProps {
    postTitle: string;
    postSlug: string;
}

export function BlogPostTracking({ postTitle, postSlug }: BlogPostTrackingProps) {
    useScrollDepth({
        metadata: {
            post_title: postTitle,
            post_slug: postSlug,
            content_type: "blog_post",
        },
    });

    return null;
}
