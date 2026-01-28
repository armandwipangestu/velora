"use client";

import Script from 'next/script';

const GoogleAnalytics = () => {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
        <>
            <Script
                strategy='lazyOnload'
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />

            <Script id='' strategy='lazyOnload'>
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              });
          `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;