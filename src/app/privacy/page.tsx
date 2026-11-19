import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Virág collects when you or your AI assistant order flowers, why, and who processes it.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>Privacy (pilot)</h1>
        <p className="muted">Plain-language privacy notice for the Virág pilot. Last updated 2026-11-19.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Order details you or your assistant send: recipient name, phone and address, delivery date, card message, sender name, and optionally your email.</li>
          <li>Payment is handled entirely by Stripe. We never see or store card numbers.</li>
          <li>Basic request logs: page or API path, user agent (for example which AI assistant made the request), rough location (city/country), and a daily-salted hash of the IP address. We don&apos;t store IP addresses.</li>
          <li>Google Analytics on web pages (cookies only in browsers that run JavaScript).</li>
        </ul>
        <h2>Why</h2>
        <ul>
          <li>To make and deliver the order. The recipient&apos;s details go to the partner florist only for delivery.</li>
          <li>To send your receipt and delivery confirmation.</li>
          <li>To understand which assistants and pages people use (aggregate counts).</li>
        </ul>
        <h2>Who processes it</h2>
        <p>Vercel (hosting), Google Firebase (order database), Stripe (payment), Telegram (order alerts to the shop owner), Google Analytics, and the partner florist. We don&apos;t sell or share data for advertising.</p>
        <h2>Your choices</h2>
        <p>
          Ask us to see or delete your data at any time: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>. We keep order records only as long as needed to fulfil the order and for accounting.
        </p>
      </div>
    </main>
  );
}
