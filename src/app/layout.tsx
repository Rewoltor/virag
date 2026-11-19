import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Cormorant_Garamond, EB_Garamond, Jost } from "next/font/google";
import { SITE } from "@/lib/config";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-display", display: "swap" });
const body = EB_Garamond({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const label = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-label", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Flowers for Her, Delivered in Manhattan`, template: `%s | ${SITE.name}` },
  description:
    "Send flowers to your girlfriend in Manhattan. Three bouquets ($119, $229, $749) all-in with a handwritten card and delivery. Order on the web or let your AI assistant order via API or MCP.",
  alternates: { types: { "text/plain": "/llms.txt" } },
  openGraph: { type: "website", siteName: SITE.name },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID || "GTM-W6F7HRL4";
  const ga = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "G-21D21R99ZB"; // GA4 loaded directly; don't also add a GA4 tag inside GTM
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${label.variable}`}>
      <head>
        <link rel="alternate" type="application/json" href="/api/catalog" title="Product catalog (JSON)" />
        <link rel="service-desc" type="application/json" href="/openapi.json" />
      </head>
      <body>
        {gtm ? (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
          </noscript>
        ) : null}
        <header className="site">
          <div className="wrap">
            <Link href="/" className="brand" aria-label="Virág home">
              Virág
            </Link>
            <nav className="main" aria-label="Main">
              <Link href="/#bouquets">Bouquets</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/guides/what-to-write-on-a-flower-card">Card messages</Link>
              <Link href="/delivery">Delivery</Link>
              <Link href="/guides/ask-your-ai-assistant-to-send-flowers">For AI agents</Link>
            </nav>
            <Link href="/order" className="nav-cta">
              Send flowers
            </Link>
          </div>
        </header>
        {children}
        <footer className="site">
          <div className="wrap cols">
            <div>
              <strong>{SITE.name}</strong>
              <br />
              Flowers with a handwritten card, delivered anywhere in Manhattan, New York.
              <br />
              <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
            </div>
            <div>
              <strong>For AI agents</strong>
              <br />
              <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> · <a href="/api/catalog">Catalog JSON</a> · <a href="/openapi.json">OpenAPI</a> · MCP: <code>/mcp</code>
            </div>
            <div>
              <Link href="/delivery">Delivery areas</Link> · <Link href="/guides/flowers-for-mom">Flowers for Mom</Link> · <Link href="/faq">FAQ & policies</Link> · <Link href="/terms">Terms</Link>
            </div>
          </div>
        </footer>
        {gtm ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        ) : null}
        {ga ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
