'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export function PostHogPageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        const url =
            pathname + (searchParams.toString() ? `?${searchParams}` : '');

        posthog.capture('$pageview', {
            $current_url: url,
        });
    }, [pathname, searchParams]);

    return null;
}