export const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
})

/**
 * Parses the meta string from a code block and extracts attributes.
 * Example: title="example.tsx" icon="typescript" fontLigatures=true
 */
export const parseMeta = (meta: string) => {
    const attributes: Record<string, string> = {}
    
    // Match patterns like key="value" or key=value
    const regex = /([a-zA-Z0-9]+)=("[^"]*"|[^ ]+)/g
    let match
    
    while ((match = regex.exec(meta)) !== null) {
        const key = match[1]
        let value = match[2]
        
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1)
        }
        
        attributes[key] = value
    }
    
    return attributes
}
