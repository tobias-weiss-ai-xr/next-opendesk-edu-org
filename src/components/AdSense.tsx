import Script from "next/script";

/**
 * Google AdSense script.
 *
 * Loads the adsbygoogle.js library with the site's publisher ID.
 * Uses `strategy="afterInteractive"` so it doesn't block page load.
 *
 * The publisher ID (ca-pub-8452353139685392) is for opendesk-edu.org.
 */
export default function AdSense() {
  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8452353139685392"
      crossOrigin="anonymous"
    />
  );
}
