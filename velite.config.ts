import { defineConfig, defineCollection, s } from "velite"
import { visit } from "unist-util-visit"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel } from "@shikijs/transformers"
import type { Root, Element } from "hast"

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

const rehypePreMeta = () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
        // Look for the code element inside the pre
        if (node.tagName !== "pre") return

        // Find the code element
        const codeEl = node.children.find(
            (child): child is Element => child.type === "element" && child.tagName === "code"
        )
        if (!codeEl) return

        // Initialize properties if they don't exist
        node.properties = node.properties || {}

        // 1. Get metadata
        // We use type casting here because 'data' and 'meta' aren't always in the base HAST spec
        const codeData = codeEl.data as { meta?: string } | undefined
        const meta = codeData?.meta || (codeEl.properties?.meta as string) || ""
        
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

        // 4. Extract Font if it exists
        const fontMatch = meta.match(/font="([^"]*)"/)
        if (fontMatch) {
            node.properties["data-font"] = fontMatch[1]
        }

        // 5. Extract Font Ligatures preference
        const ligatureMatch = meta.match(/fontLigatures=(true|false)/)
        if (ligatureMatch) {
            node.properties["data-ligatures"] = ligatureMatch[1]
        } else {
            // Set a default if you want, or handle it in React/CSS
            node.properties["data-ligatures"] = "true" 
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