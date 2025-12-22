import { defineConfig, defineCollection, s } from "velite"
import { visit } from "unist-util-visit"
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

const rehypePreMeta = () => (tree: any) => {
    visit(tree, "element", (node: any) => {
        // Look for the code element inside the pre
        if (node.tagName !== "pre") return
        const codeEl = node.children.find((child: any) => child.tagName === "code")
        if (!codeEl) return

        // 1. Get the raw metadata string
        const meta = codeEl.data?.meta || codeEl.properties?.meta || ""
        
        // 2. Extract title if it exists
        const titleMatch = meta.match(/title="([^"]*)"/)
        if (titleMatch) {
            // Assign directly to the PRE node so your component sees it
            node.properties["data-title"] = titleMatch[1]
        }

        // 3. Extract Icon if it exists
        const iconMatch = meta.match(/icon="([^"]*)"/)
        if (iconMatch) {
            node.properties["data-icon"] = iconMatch[1]
        }
    })
}

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
            rehypePreMeta,
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