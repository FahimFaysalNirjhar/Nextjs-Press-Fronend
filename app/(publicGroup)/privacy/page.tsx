// app/(publicGroup)/privacy/page.tsx
import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/shared/legal-page";
import {
  CONTACT_EMAIL,
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
  SITE_NAME,
} from "../_config/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your personal information.`,
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      `${SITE_NAME} is operated by ${LEGAL_ENTITY}. This policy explains what personal information we collect when you use our website, and what we do with it.`,
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    bullets: [
      "Account information: your name, email address, password (stored in hashed form) and, if you add one, your profile photo and bio.",
      "Content you create: comments you post on stories.",
      "Subscription information: if you subscribe, payment is handled by Stripe. We do not see or store your full card number. We keep only your subscription status and related identifiers.",
      "Usage information: pages viewed, article view counts, and basic technical data such as browser type and IP address in server logs.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    bullets: [
      "To create and manage your account and keep you logged in.",
      "To provide free and premium content, and to verify your subscription.",
      "To display your comments and author profile where applicable.",
      "To maintain security, prevent abuse and fix problems.",
      "To understand how the site is used so we can improve it.",
      "To respond to messages you send us.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    paragraphs: [
      "We use essential cookies to keep you signed in and to protect your account. These are required for the site to work. If we add analytics or advertising cookies in the future, we will update this policy and ask for consent where the law requires it.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share information with",
    paragraphs: [
      "We do not sell your personal information. We share it only with service providers that help us run the site, and only as needed:",
    ],
    bullets: [
      "Stripe, to process subscription payments.",
      "Hosting and infrastructure providers that store our data and serve the website.",
      "Authorities, if we are legally required to do so.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      "We keep your account information while your account is active. If you delete your account, we remove or anonymize your personal information, except where we must keep certain records (for example, payment records) to meet legal obligations.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    paragraphs: [
      `You can view and update your name, photo and bio from your profile page. You can also ask us to access, correct, export or delete your personal information by contacting ${CONTACT_EMAIL}. Depending on where you live, you may have additional rights under local data protection law.`,
    ],
  },
  {
    id: "security",
    title: "Security",
    paragraphs: [
      "We use reasonable technical and organizational measures to protect your information, including encrypted connections and hashed passwords. No system is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "Our service is not directed to children under 13, and we do not knowingly collect their personal information. If you believe a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time. When we make significant changes, we will update the date at the top of this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [`Questions about this policy? Email us at ${CONTACT_EMAIL}.`],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="We collect only what we need to run Nextjs Press, and we never sell your personal information."
      updated={LEGAL_LAST_UPDATED}
      sections={sections}
    />
  );
}
