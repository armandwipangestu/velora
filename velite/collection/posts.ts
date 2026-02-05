import { defineCollection, s } from "velite"

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
})

export const posts = defineCollection({
    name: "Post",
    pattern: "blog/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(999),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        published: s.boolean().default(true),
        tags: s.array(s.string()).optional(),
        toc: s.toc(),
        body: s.mdx()
    }).transform(computedFields)
})