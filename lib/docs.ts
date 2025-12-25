import { Doc } from "#site/content";
import { SidebarGroup, SidebarItem } from "@/components/docs-sidebar";

export function getDocsSidebar(docs: Doc[], type: string): SidebarGroup[] {
    const filteredDocs = docs.filter((doc) => doc.slug.startsWith(type));
    
    const groups: Record<string, SidebarItem[]> = {};
    const categoryOrder: Record<string, number> = {};
    
    filteredDocs.forEach((doc) => {
        const category = doc.category || "General";
        if (!groups[category]) {
            groups[category] = [];
            categoryOrder[category] = doc.categoryOrder || 999;
        }
        
        const slugParts = doc.slug.split("/").slice(1);
        let currentItems = groups[category];
        
        for (let i = 0; i < slugParts.length; i++) {
            const currentSlug = `${type}/${slugParts.slice(0, i + 1).join("/")}`;
            const isLast = i === slugParts.length - 1;
            
            let item = currentItems.find((itm) => itm.href === `/${currentSlug}` || (!itm.href && itm.title === slugParts[i]));
            
            if (!item) {
                // Find potential doc for this parent to get its order and title
                const parentDoc = docs.find(d => d.slug === currentSlug);
                item = {
                    title: isLast ? doc.title : (parentDoc?.title || slugParts[i]),
                    href: isLast ? `/${doc.slug}` : (parentDoc ? `/${parentDoc.slug}` : undefined),
                    items: [],
                    order: isLast ? doc.order : (parentDoc?.order || 999)
                } as SidebarItem & { order: number };
                currentItems.push(item);
            } else if (isLast) {
                item.title = doc.title;
                item.href = `/${doc.slug}`;
                (item as any).order = doc.order;
            }
            
            currentItems = item.items!;
        }
    });

    const sortItems = (items: SidebarItem[]) => {
        items.sort((a, b) => ((a as any).order || 999) - ((b as any).order || 999));
        items.forEach(item => {
            if (item.items) sortItems(item.items);
        });
    };

    return Object.entries(groups)
        .sort(([nameA], [nameB]) => categoryOrder[nameA] - categoryOrder[nameB])
        .map(([title, items]) => {
            sortItems(items);
            return { title, items };
        });
}

export function getPager(docs: Doc[], type: string, slug: string) {
    const filteredDocs = docs
        .filter((doc) => doc.slug.startsWith(type))
        .sort((a, b) => {
            if (a.categoryOrder !== b.categoryOrder) {
                return (a.categoryOrder || 999) - (b.categoryOrder || 999);
            }
            return (a.order || 999) - (b.order || 999);
        });
        
    const index = filteredDocs.findIndex((doc) => doc.slug === slug);
    
    return {
        prev: index > 0 ? { title: filteredDocs[index - 1].title, href: `/${filteredDocs[index - 1].slug}` } : null,
        next: index < filteredDocs.length - 1 ? { title: filteredDocs[index + 1].title, href: `/${filteredDocs[index + 1].slug}` } : null,
    };
}
