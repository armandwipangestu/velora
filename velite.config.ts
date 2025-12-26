import { defineConfig, defineCollection, s } from "velite"
import { visit } from "unist-util-visit"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel } from "@shikijs/transformers"
import type { Root, Element, ElementContent } from "hast"

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
        tags: s.array(s.string()).optional(),
        body: s.mdx()
    }).transform(computedFields)
})

const pages = defineCollection({
    name: "Page",
    pattern: "*.mdx",
    schema: s.object({
        slug: s.path(),
        body: s.mdx()
    })
})

const rehypeCodeGroup = () => (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
        if (node.tagName === "p" && parent && typeof index === "number") {
            const firstChild = node.children[0]
            if (firstChild?.type === "text" && firstChild.value.trim() === "::: code-group") {
                // Found start
                let endIndex = -1
                for (let i = index + 1; i < parent.children.length; i++) {
                    const nextNode = parent.children[i]
                    if (nextNode.type === "element" && nextNode.tagName === "p") {
                        const nextFirstChild = nextNode.children[0]
                        if (nextFirstChild?.type === "text" && nextFirstChild.value.trim() === ":::") {
                            endIndex = i
                            break
                        }
                    }
                }

                if (endIndex !== -1) {
                    const children = parent.children.slice(index + 1, endIndex)
                    // Filter out whitespace/empty text nodes between code blocks
                    const filteredChildren = children.filter(c => 
                        c.type === "element" || (c.type === "text" && c.value.trim() !== "")
                    )
                    
                    const groupNode: Element = {
                        type: "element",
                        tagName: "div",
                        properties: { "data-code-group": "" },
                        children: filteredChildren as ElementContent[] // Cast to avoid RootContent vs ElementContent mismatch
                    }
                    parent.children.splice(index, endIndex - index + 1, groupNode)
                    return index
                }
            }
        }
    })
}

const rehypePreMeta = () => (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
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

        // 6. Extract Icon Color preference
        const iconColorMatch = meta.match(/iconColor=(true|false)/)
        if (iconColorMatch) {
            node.properties["data-icon-color"] = iconColorMatch[1]
        } else {
            node.properties["data-icon-color"] = "true"
        }

        // 7. Extract Caption if it exists
        const captionMatch = meta.match(/caption="([^"]*)"/)
        if (captionMatch) {
            node.properties["data-caption"] = captionMatch[1]
        }

        // 8. Determine language
        const language = node.properties["data-language"] as string || ""
        if (language) {
            node.properties["data-language"] = language
        }

        // If parent is a figure (from rehype-pretty-code), copy properties to it
        // This allows the CodeGroup component to see the properties on its direct children
        if (parent && parent.type === "element" && parent.tagName === "figure") {
            parent.properties = { ...parent.properties, ...node.properties }
        }
    })


    // Remove redundant title elements
    visit(tree, "element", (node: Element, index, parent) => {
        if (node.properties && "data-rehype-pretty-code-title" in node.properties) {
            if (parent && typeof index === "number") {
                parent.children.splice(index, 1)
                return index
            }
        }
    })
}

const docs = defineCollection({
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
        posts,
        pages,
        docs
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
            rehypeCodeGroup,
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