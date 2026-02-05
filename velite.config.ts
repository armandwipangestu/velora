import { defineConfig } from "velite"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { transformerNotationDiff, transformerNotationHighlight, transformerNotationFocus, transformerNotationErrorLevel } from "@shikijs/transformers"
import { transformerTwoslash, rendererRich } from "@shikijs/twoslash"
import { rehypeCodeGroup } from "./velite/rehype/plugins/rehype-code-group"
import { rehypePreMeta } from "./velite/rehype/plugins/rehype-pre-meta"
import { posts } from "./velite/collection/posts"
import { pages } from "./velite/collection/pages"
import { docs } from "./velite/collection/docs"

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
                        transformerTwoslash({
                            explicitTrigger: true,
                            renderer: rendererRich(),
                        }),
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