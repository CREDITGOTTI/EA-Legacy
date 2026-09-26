import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brandMedia } from "@/content/media";
import { trackEvent } from "@/lib/analytics";
import { submitVisitorAccess } from "@/lib/legacy-access.functions";

const SESSION_KEY = "eal-locker-entered";
const ACCESS_TOKEN_KEY = "eal-access-token";

export function LockerEntrance() {
  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const [consent, setConsent] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY)) {
      sessionStorage.setItem(SESSION_KEY, "true");
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => enterRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(document.querySelectorAll<HTMLElement>(".locker-entry input, .locker-entry button, .locker-entry a[href]"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", containFocus);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", containFocus); };
  }, [visible]);

  function finish() {
    sessionStorage.setItem(SESSION_KEY, "true");
    window.dispatchEvent(new CustomEvent("eal:locker-entered"));
    trackEvent("cta_click", { cta: "unlock-the-legacy-room" });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    setOpening(true);
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    window.setTimeout(() => setVisible(false), mobile ? 1800 : 3000);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!consent || !ageConfirmed) { setError("Confirm both consent and the age safeguard to enter."); return; }
    const values = new FormData(form);
    setSubmitting(true); setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const result = await submitVisitorAccess({ data: {
        firstName: String(values.get("firstName") ?? ""),
        lastName: String(values.get("lastName") ?? ""),
        phone: String(values.get("phone") ?? ""),
        consentContact: true,
        ageConfirmed: true,
        website: String(values.get("website") ?? ""),
        startedAt: startedAt.current,
        attribution: { utmSource: params.get("utm_source") ?? undefined, utmMedium: params.get("utm_medium") ?? undefined, utmCampaign: params.get("utm_campaign") ?? undefined, referrer: document.referrer || undefined, landingPage: window.location.pathname },
        userAgent: navigator.userAgent,
      } });
      localStorage.setItem(ACCESS_TOKEN_KEY, result.accessToken);
      finish();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not unlock the room. Please try again.");
    } finally { setSubmitting(false); }
  }

  if (!visible) return null;
  return <div className={`locker-entry ${opening ? "is-opening" : ""}`} role="dialog" aria-modal="true" aria-label="Enter the EA Legacy locker room">
    <div className="locker-entry-glow" aria-hidden="true" />
    <div className="locker-door locker-door-left" aria-hidden="true"><span className="locker-door-vents" /></div>
    <div className="locker-door locker-door-right" aria-hidden="true"><span className="locker-door-vents" /></div>
    <div className="locker-entry-content locker-access-panel">
      <div className="locker-entry-status"><span className="size-1.5 bg-legacy shadow-[0_0_12px_var(--legacy)]" /> Visitor access // EAL 01</div>
      <img src={brandMedia.logo} alt="EA Legacy" className="locker-entry-crest" />
      <div className="locker-lock" aria-hidden="true"><span className="locker-lock-ring"><LockKeyhole className="size-5" /></span><ScanLine className="locker-lock-scan size-4" /></div>
      <h2 className="mt-5 font-display text-3xl text-gold">Enter the Legacy Room</h2>
      <p className="mt-2 max-w-md text-center text-xs leading-5 text-muted-foreground">Purpose is the access point. Share your details to enter and stay connected to EA Legacy.</p>
      <form onSubmit={submit} className="mt-6 w-full max-w-xl" noValidate>
        <div className="grid gap-4 sm:grid-cols-2"><div><Label htmlFor="access-first" className="mb-2 block">First Name</Label><Input id="access-first" name="firstName" required maxLength={80} autoComplete="given-name" className="h-12 bg-obsidian/70" /></div><div><Label htmlFor="access-last" className="mb-2 block">Last Name</Label><Input id="access-last" name="lastName" required maxLength={80} autoComplete="family-name" className="h-12 bg-obsidian/70" /></div><div className="sm:col-span-2"><Label htmlFor="access-phone" className="mb-2 block">Mobile Phone Number</Label><Input id="access-phone" name="phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" placeholder="(512) 555-0123" className="h-12 bg-obsidian/70" /></div></div>
        <div className="hidden" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div className="mt-5 space-y-4"><div className="flex items-start gap-3"><Checkbox id="access-consent" checked={consent} onCheckedChange={(value) => { setConsent(value === true); setError(""); }} /><Label htmlFor="access-consent" className="text-xs leading-5 text-muted-foreground">I permit Empowering Athletes Legacy to store this information and contact me about programs, resources, events, and opportunities.</Label></div><div className="flex items-start gap-3"><Checkbox id="access-age" checked={ageConfirmed} onCheckedChange={(value) => { setAgeConfirmed(value === true); setError(""); }} /><Label htmlFor="access-age" className="text-xs leading-5 text-muted-foreground">I am 18 or older, or I have permission from a parent or legal guardian.</Label></div></div>
        <p className="mt-4 text-[11px] leading-5 text-muted-foreground">Message and data rates may apply. Consent is not a condition of participation. You may opt out at any time. Read our <Link to="/privacy" className="text-gold underline underline-offset-4">Privacy Policy</Link>.</p>
        {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
        <Button ref={enterRef} type="submit" variant="legacy" size="lg" className="mt-6 w-full" disabled={submitting}>{submitting ? "Unlocking…" : "Unlock the Legacy Room"} <ArrowRight /></Button>
      </form>
    </div>
    <div className="locker-entry-reveal" aria-hidden="true"><span>EA LEGACY</span></div>
  </div>;
}