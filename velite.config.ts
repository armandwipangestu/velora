import { defineConfig, defineCollection, s } from "velite"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel } from "@shikijs/transformers"

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
})

const posts = defineCollection({
    name: "Post",
    pattern: "blog/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(999),
        description: s.string().max(999).optional(),
        date: s.isodate(),
        published: s.boolean().default(true),
        body: s.mdx()
    }).transform(computedFields)
})

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[has:6].[ext]",
        clean: true
    },
    collections: {
        posts
    },
    mdx: {
        rehypePlugins: [
            rehypeSlug, 
            [rehypePrettyCode, 
                { 
                    theme: {
                        light: "github-light",
                        dark: "github-dark"
                    },
                    defaultLang: {
                        block: "plaintext"
                    },
                    transformers: [
                        transformerNotationDiff({ matchAlgorithm: 'v3' }),
                        transformerNotationHighlight({ matchAlgorithm: 'v3' }),
                        transformerNotationFocus({ matchAlgorithm: 'v3' }),
                        transformerNotationErrorLevel({ matchAlgorithm: 'v3' }),
                    ],
                }
            ],
            [rehypeAutolinkHeadings, 
                {
                    behavior: "wrap",
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section"
                    }
                }
            ]
        ],
        remarkPlugins: [],
    }
})