import { defineCollection, s } from "velite"

export const pages = defineCollection({
    name: "Page",
    pattern: "*.mdx",
    schema: s.object({
        slug: s.path(),
        body: s.mdx()
    })
})