"use client";

import dynamic from "next/dynamic";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });
const SearchDialogWrapper = dynamic(() => import("@/components/SearchDialogWrapper"), {
  ssr: false,
});

export function ClientProviders() {
  return (
    <>
      <ScrollToTop />
      <CookieConsent />
      <SearchDialogWrapper />
    </>
  );
}
