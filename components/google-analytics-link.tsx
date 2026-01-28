'use client';

import Link from 'next/link';
import { gaEvent } from '@/lib/ga';

interface GALinkProps {
    href: string;
    target?: string;
    rel?: string;
    action: string;
    category?: string;
    label?: string;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

export function GALink({
    href,
    target,
    rel,
    action,
    category,
    label,
    className,
    onClick,
    children,
}: GALinkProps) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className={className}
            onClick={() => {
                gaEvent({
                    action,
                    category,
                    label,
                });
                if (onClick) onClick();
            }}
        >
            {children}
        </Link>
    );
}