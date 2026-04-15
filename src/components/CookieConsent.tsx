"use client";

import { useCallback, useEffect, useState } from "react";
import {Link} from '@/i18n/navigation';
import { PLAUSIBLE_DOMAIN, CLARITY_ID } from "@/lib/config";

const CONSENT_KEY = "cookie-consent";

type ConsentState = "undecided" | "accepted" | "declined";

function readConsent(): ConsentState {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {
    // localStorage not available
  }
  return "undecided";
}

function loadAnalyticsScripts(): void {
  if (typeof document === "undefined") return;

  // Plausible Analytics
  if (PLAUSIBLE_DOMAIN) {
    const plausible = document.createElement("script");
    plausible.defer = true;
    plausible.dataset.domain = PLAUSIBLE_DOMAIN;
    plausible.src = "https://plausible.io/js/script.js";
    document.head.appendChild(plausible);
  }

  // Microsoft Clarity
  if (CLARITY_ID) {
    const clarity = document.createElement("script");
    clarity.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window,document,"clarity","script","${CLARITY_ID}");
    `;
    document.head.appendChild(clarity);
  }
}

export default function CookieConsent() {
  // Server renders hidden (null). Client hydrates consent from localStorage.
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- legitimate hydration from localStorage
    setConsent(stored);
    if (stored === "accepted") {
      loadAnalyticsScripts();
    }
  }, []);

  const accept = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "accepted");
    } catch {
      // localStorage not available
    }
    loadAnalyticsScripts();
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    try {
      localStorage.setItem(CONSENT_KEY, "declined");
    } catch {
      // localStorage not available
    }
    setConsent("declined");
  }, []);

  // Not yet hydrated or already decided → don't show banner
  if (consent !== "undecided") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground-secondary">
          We use privacy-friendly analytics. No cookies are set by default.{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            Learn more
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-background-secondary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-button transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
