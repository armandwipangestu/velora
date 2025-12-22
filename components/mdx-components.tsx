/* eslint-disable react-hooks/static-components */
import Image from "next/image"
import * as runtime from "react/jsx-runtime"
import { Pre } from "./mdx-pre"
import { Callout } from "./callout"

const useMdxComponents = (code: string) => {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

const components = {
    Image,
    Callout,
    pre: Pre,
    // Tell React to render nothing for the extra title tag
    figcaption: (props: Record<string, undefined>) => {
        if (props["data-rehype-pretty-code-title"] !== undefined) {
            return null
        }
        return <figcaption {...props} />
    }
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