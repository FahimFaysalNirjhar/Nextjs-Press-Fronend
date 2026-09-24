// app/(publicGroup)/terms/page.tsx
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import {
  CONTACT_EMAIL,
  COUNTRY,
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
  SITE_NAME,
} from "../_config/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The rules for using ${SITE_NAME}.`,
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Accepting these terms",
    paragraphs: [
      `By accessing or using ${SITE_NAME}, operated by ${LEGAL_ENTITY}, you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    id: "accounts",
    title: "Your account",
    bullets: [
      "You must provide accurate information when you register.",
      "You are responsible for keeping your password secure and for activity on your account.",
      "Accounts come in different roles (reader, author, admin). Access to features depends on your role.",
    ],
  },
  {
    id: "content",
    title: "Our content",
    paragraphs: [
      "Articles, images, design and other material on the site are owned by us or our authors and are protected by copyright. You may read and share links to our content for personal, non-commercial use. You may not copy, republish, scrape or resell our content without written permission.",
    ],
  },
  {
    id: "premium",
    title: "Premium subscriptions",
    bullets: [
      "Premium gives you access to premium articles for as long as your subscription is active.",
      "Payments are processed securely by Stripe. Prices and billing period are shown at checkout.",
      "Subscriptions renew automatically until cancelled. You can cancel at any time, and access continues until the end of the period you have paid for.",
      "Unless the law requires otherwise, payments already made are non-refundable.",
      "Sharing your account or premium content with others is not allowed.",
    ],
  },
  {
    id: "comments",
    title: "Comments and user content",
    paragraphs: [
      "You keep ownership of what you post, but you give us a licence to display it on the site. You agree not to post content that is:",
    ],
    bullets: [
      "Unlawful, defamatory, hateful, threatening or harassing.",
      "Spam, advertising or misleading.",
      "Infringing someone else's rights, including copyright or privacy.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    bullets: [
      "Do not try to bypass the paywall, access other users' accounts or interfere with the site's security.",
      "Do not use bots or automated tools to scrape or overload the service.",
      "Do not use the site for any unlawful purpose.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and termination",
    paragraphs: [
      "We may suspend or close accounts that break these terms. You may stop using the site, or ask us to delete your account, at any time.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    paragraphs: [
      'We work hard to be accurate, but the site and its content are provided "as is" without warranties of any kind. Articles are for general information and are not professional advice.',
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, we are not liable for indirect or consequential losses arising from your use of the site. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. If you keep using the site after a change, you accept the updated terms.",
    ],
  },
  {
    id: "law",
    title: "Governing law",
    paragraphs: [`These terms are governed by the laws of ${COUNTRY}.`],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [`Questions about these terms? Email us at ${CONTACT_EMAIL}.`],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="The simple rules that keep Nextjs Press fair, safe and useful for everyone."
      updated={LEGAL_LAST_UPDATED}
      sections={sections}
    />
  );
}
