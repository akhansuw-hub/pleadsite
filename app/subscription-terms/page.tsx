import type { Metadata } from "next";
import { LegalDocument } from "@/components/LegalLayout";
import { getLegalDoc, legalMetadata } from "@/lib/legal";

const SLUG = "subscription-terms" as const;

export function generateMetadata(): Metadata {
  const doc = getLegalDoc(SLUG);
  return legalMetadata({ title: doc.title, summary: doc.summary, path: "/subscription-terms/" });
}

export default function Page() {
  return <LegalDocument doc={getLegalDoc(SLUG)} />;
}
