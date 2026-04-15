import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    siteName: SITE_NAME,
    images: ["/static/brand/icon.svg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: [{ url: "/static/brand/icon.svg", type: "image/svg+xml" }],
  manifest: "/static/manifest.json",
  robots: { index: true, follow: true },
};

function JsonLdOrganization() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/static/brand/icon.svg`,
    description: "Open-source digital workplace for higher education.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@opendesk-edu.org",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="light"?"light":"dark";document.documentElement.setAttribute("data-theme",d)}catch(e){}})()`,
      }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} data-theme="dark">
      <head>
        <meta name="theme-color" content="#341291" />
        <ThemeScript />
        <JsonLdOrganization />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <ErrorBoundary>
            <main id="main-content">{children}</main>
          </ErrorBoundary>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
