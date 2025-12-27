/* eslint-disable react-hooks/static-components */
import Image from "next/image"
import Link from "next/link"
import * as runtime from "react/jsx-runtime"
import { Pre } from "./mdx-pre"
import { Callout } from "./callout"
import { CodeGroup } from "./mdx-code-group"

const useMdxComponents = (code: string) => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

import { MDXImage } from "@/components/mdx-image"

import { cn } from "@/lib/utils"

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
}

interface MdxProps {
    code: string
}

export function MDXContent({ code }: MdxProps) {
    const Component = useMdxComponents(code)

    return <Component components={components} />
}