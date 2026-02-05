import { defineCollection, s } from "velite"

export const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
})

export const docs = defineCollection({
    name: "Doc",
    pattern: "{guide,reference,examples}/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(999),
        description: s.string().max(999).optional(),
        published: s.boolean().default(true),
        category: s.string().optional(),
        categoryOrder: s.number().default(0),
        order: s.number().default(0),
        toc: s.toc(),
        body: s.mdx()
    }).transform(computedFields)
})