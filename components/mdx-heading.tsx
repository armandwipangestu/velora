'use client';

import { cn } from '@/lib/utils';
import { gaEvent } from '@/lib/ga';
import { phCapture } from '@/lib/posthog';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface MDXHeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement> {
    level: HeadingLevel;
}

export function MDXHeading({
    level,
    id,
    className,
    children,
    ...props
}: MDXHeadingProps) {
    const Tag = (`h${level}` as HeadingTag);

    return (
        <Tag
            id={id}
            className={cn('group relative scroll-mt-24', className)}
            {...props}
        >
            {id && (
                <a
                    href={`#${id}`}
                    aria-label="Link to this section"
                    className="hidden sm:inline absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 select-none text-muted-foreground hover:text-foreground transition-opacity"
                    onClick={() => {
                        gaEvent({
                            action: 'click_mdx_heading_anchor',
                            category: 'blog_navigation',
                            label: `h${level}: ${id}`,
                        });

                        phCapture("click_mdx_heading_anchor", {
                            heading_title: children,
                            heading_id: id,
                        });
                    }}
                >
                    #
                </a>
            )}
            <span>{children}</span>
        </Tag>
    );
}