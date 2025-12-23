import { visit } from "unist-util-visit"
import type { Root, Element, ElementContent } from "hast"

export const rehypeCodeGroup = () => (tree: Root) => {
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
