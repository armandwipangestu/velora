import { visit } from "unist-util-visit"
import type { Root, Element, ElementContent } from "hast"

export const rehypePreMeta = () => (tree: Root) => {
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

        // 9. Extract Wrap preference
        const wrapMatch = meta.match(/wrap=(true|false)/)
        if (wrapMatch) {
            node.properties["data-wrap"] = wrapMatch[1]
        } else {
            // Check if 'wrap' is mentioned without a value (treat as true)
            if (meta.includes("wrap")) {
                node.properties["data-wrap"] = "true"
            }
        }

        // 10. Extract Wrap Toggle Button preference
        const wrapToggleMatch = meta.match(/wrapToggleButton=(true|false)/)
        if (wrapToggleMatch) {
            node.properties["data-wrap-toggle-button"] = wrapToggleMatch[1]
        } else {
            // Check if 'wrapToggleButton' is mentioned without a value (treat as true)
            if (meta.includes("wrapToggleButton")) {
                node.properties["data-wrap-toggle-button"] = "true"
            }
        }

        // 11. Extract Max Lines preference
        const maxLinesMatch = meta.match(/maxLines=(\d+)/)
        if (maxLinesMatch) {
            node.properties["data-max-lines"] = maxLinesMatch[1]
        }

        // 12. Extract Expandable preference
        const expandableMatch = meta.match(/expandable=(true|false)/)
        if (expandableMatch) {
            node.properties["data-expandable"] = expandableMatch[1]
        } else {
            // Check if 'expandable' is mentioned without a value (treat as true)
            if (meta.includes("expandable")) {
                node.properties["data-expandable"] = "true"
            }
        }

        // 13. Extract Expand Label
        const expandLabelMatch = meta.match(/expandLabel="([^"]*)"/)
        if (expandLabelMatch) {
            node.properties["data-expand-label"] = expandLabelMatch[1]
        } else {
            node.properties["data-expand-label"] = "Expand code"
        }

        // 14. Extract Collapse Label
        const collapseLabelMatch = meta.match(/collapseLabel="([^"]*)"/)
        if (collapseLabelMatch) {
            node.properties["data-collapse-label"] = collapseLabelMatch[1]
        } else {
            node.properties["data-collapse-label"] = "Collapse"
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