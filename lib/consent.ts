"use client";

/**
 * Minimal cookie-consent store (CONTRACTS-v2 amendment "m").
 * No non-essential tags ship today. When analytics/advertising are added,
 * gate their loading on `useConsent().consent.analytics` / `.advertising`.
 */
import { useSyncExternalStore } from "react";

export type ConsentCategory = "necessary" | "analytics" | "advertising";

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  /** ISO timestamp of the visitor's last choice; null = no choice yet. */
  decidedAt: string | null;
  version: 1;
}

interface Snapshot {
  /** false during SSR / before hydration. */
  ready: boolean;
  consent: ConsentState;
  panelOpen: boolean;
}

export const CONSENT_STORAGE_KEY = "plead-consent";

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  advertising: false,
  decidedAt: null,
  version: 1,
};

const SERVER_SNAPSHOT: Snapshot = { ready: false, consent: DEFAULT_CONSENT, panelOpen: false };

let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function read(): ConsentState {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (parsed.version !== 1) return DEFAULT_CONSENT;
    return {
      ...DEFAULT_CONSENT,
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : null,
    };
  } catch {
    return DEFAULT_CONSENT;
  }
}

function getSnapshot(): Snapshot {
  if (!snapshot) snapshot = { ready: true, consent: read(), panelOpen: false };
  return snapshot;
}

function emit(next: Snapshot) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Save a choice. `necessary` is always on. */
export function setConsent(choice: { analytics: boolean; advertising: boolean }) {
  const consent: ConsentState = {
    ...DEFAULT_CONSENT,
    analytics: choice.analytics,
    advertising: choice.advertising,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* storage blocked: keep choice for this page view only */
  }
  emit({ ...getSnapshot(), consent, panelOpen: false });
}

export const acceptAll = () => setConsent({ analytics: true, advertising: true });
export const rejectNonEssential = () => setConsent({ analytics: false, advertising: false });

/** Open the cookie settings panel (used by the footer "Cookie settings" link). */
export function openCookieSettings() {
  emit({ ...getSnapshot(), panelOpen: true });
}

export function closeCookieSettings() {
  emit({ ...getSnapshot(), panelOpen: false });
}

/** Non-hook read for scripts: has the visitor granted this category? */
export function hasConsent(category: ConsentCategory): boolean {
  if (typeof window === "undefined") return category === "necessary";
  return category === "necessary" ? true : getSnapshot().consent[category];
}

export function useConsent() {
  const s = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  return {
    ...s,
    needsDecision: s.ready && s.consent.decidedAt === null,
    setConsent,
    acceptAll,
    rejectNonEssential,
    openCookieSettings,
    closeCookieSettings,
  };
}
