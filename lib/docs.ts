import { Doc } from "#site/content";
import { SidebarGroup, SidebarItem } from "@/components/docs-sidebar";

export function getDocsSidebar(docs: Doc[], type: string): SidebarGroup[] {
    const filteredDocs = docs.filter((doc) => doc.slug.startsWith(type));
    
    const groups: Record<string, SidebarItem[]> = {};
    
    filteredDocs.forEach((doc) => {
        const category = doc.category || "General";
        if (!groups[category]) {
            groups[category] = [];
        }
        
        const slugParts = doc.slug.split("/").slice(1);
        let currentItems = groups[category];
        
        for (let i = 0; i < slugParts.length; i++) {
            const currentSlug = `${type}/${slugParts.slice(0, i + 1).join("/")}`;
            const isLast = i === slugParts.length - 1;
            
            let item = currentItems.find((itm) => itm.href === `/${currentSlug}` || (!itm.href && itm.title === slugParts[i]));
            
            if (!item) {
                item = {
                    title: isLast ? doc.title : slugParts[i],
                    href: isLast ? `/${doc.slug}` : undefined,
                    items: [],
                };
                currentItems.push(item);
            } else if (isLast) {
                // If item existed but was a placeholder parent, update its title and href
                item.title = doc.title;
                item.href = `/${doc.slug}`;
            }
            
            currentItems = item.items!;
        }
    });

    return Object.entries(groups).map(([title, items]) => ({
        title,
        items: items.sort((a, b) => (a.href && b.href ? 0 : a.title.localeCompare(b.title))),
    }));
}

export function getPager(docs: Doc[], type: string, slug: string) {
    const filteredDocs = docs.filter((doc) => doc.slug.startsWith(type));
    const index = filteredDocs.findIndex((doc) => doc.slug === slug);
    
    return {
        prev: index > 0 ? { title: filteredDocs[index - 1].title, href: `/${filteredDocs[index - 1].slug}` } : null,
        next: index < filteredDocs.length - 1 ? { title: filteredDocs[index + 1].title, href: `/${filteredDocs[index + 1].slug}` } : null,
    };
}
