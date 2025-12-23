import { visit } from "unist-util-visit"
import type { Root, Code } from "mdast"
import { parseMeta } from "./utils"

/**
 * Strips custom attributes from the meta string.
 */
const stripMeta = (meta: string) => {
    // Match patterns like key="value" or key=value
    // We want to remove these and any following space
    return meta.replace(/([a-zA-Z0-9]+)=("[^"]*"|[^ ]+)/g, "").trim()
}

export const remarkExtractMeta = () => (tree: Root) => {
    visit(tree, "code", (node: Code) => {
        if (!node.meta) return

        const attributes = parseMeta(node.meta)
        
        // Mapping of meta keys to data attributes
        const metaMap: Record<string, string> = {
            title: "data-title",
            icon: "data-icon",
            font: "data-font",
            fontLigatures: "data-ligatures",
            iconColor: "data-icon-color",
            caption: "data-caption"
        }

        // Initialize hProperties if they don't exist
        node.data = node.data || {}
        node.data.hProperties = (node.data.hProperties as Record<string, any>) || {}

        // Apply extracted attributes to hProperties
        Object.entries(metaMap).forEach(([metaKey, dataAttr]) => {
            if (attributes[metaKey] !== undefined) {
                (node.data!.hProperties as Record<string, any>)[dataAttr] = attributes[metaKey]
            }
        })

        // Strip custom attributes from the meta string so rehype-pretty-code doesn't see them
        node.meta = stripMeta(node.meta)
    })
}
