/* eslint-disable react-hooks/static-components */
import Image from "next/image"
import Link from "next/link"
import * as runtime from "react/jsx-runtime"
import { Pre } from "./mdx-pre"
import { Callout } from "./callout"
import { CodeGroup } from "./mdx-code-group"
import { MDXImage } from "@/components/mdx-image"
import { cn } from "@/lib/utils"
import { MDXHeading } from "./mdx-heading"

const useMdxComponents = (code: string) => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

const headingStyles: Record<number, string> = {
    1: 'mt-12 scroll-m-20 text-4xl font-bold tracking-tight',
    2: 'mt-10 scroll-m-20 text-3xl font-semibold tracking-tight',
    3: 'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
    4: 'mt-6 scroll-m-20 text-xl font-semibold tracking-tight',
    5: 'mt-4 scroll-m-20 text-lg font-semibold',
    6: 'mt-4 scroll-m-20 text-base font-medium text-muted-foreground',
};

const headingComponents = Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map((level) => [
        `h${level}`,
        ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <MDXHeading
                level={level}
                className={cn(headingStyles[level], className)}
                {...props}
            />
        ),
    ])
);

const components = {
    Image: MDXImage,
    BlogImage: MDXImage,
    Link,
    Callout,
    pre: Pre,
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
        if ("data-code-group" in props) {
            return <CodeGroup>{children}</CodeGroup>
        }
        return <div {...props}>{children}</div>
    },
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
        <div className="my-6 w-full overflow-x-auto">
            <table className={cn("w-full", className)} {...props} />
        </div>
    ),
    /**
     * If you want to customize all of the components it rendered by mdx (not using prose dark:prose-invert on container MDXContent in [...slug]/page.tsx). You can define all of style like h1, h2, etc in this. For reference you can see the https://github.com/shadcn-ui/taxonomy/blob/main/components/mdx-components.tsx
     */

    // h1: ({ className, ...props }: { className: string }) => (
    //     <h1
    //         className={cn(
    //             "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
    //             className
    //         )}
    //         {...props}
    //     />
    // ),
    ...headingComponents,
}

interface MdxProps {
    code: string
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMdxComponents(code)

    return <Component components={components} />
}