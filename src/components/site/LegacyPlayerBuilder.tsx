import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Edit3, RotateCcw, Save, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveLegacyProfile } from "@/lib/legacy-access.functions";

const stages = ["Youth Athlete", "College Athlete", "Professional Athlete", "Former Athlete"] as const;
const paths = [
  { title: "Stocks and Market Investing", text: "Learn ownership, diversification, risk, and long-term decision making before committing capital." },
  { title: "Real Estate Ownership", text: "Explore property fundamentals, responsible leverage, operations, and patient due diligence." },
  { title: "Buying, Building, and Selling Existing Businesses", text: "Study durable value, cash flow, operations, people, and responsible ownership transitions." },
] as const;
const industries = ["Sports and Performance", "Technology and AI", "Health and Wellness", "Real Estate and Housing", "Agriculture and Land", "Media and Entertainment", "Education", "Financial Services", "Fashion and Consumer Products", "Community Development", "Energy and Sustainability", "Other"];
const attributeNames = ["Financial Literacy", "Investment Readiness", "Business Ownership", "Brand Partnership Readiness", "Land and Agricultural Stewardship", "Youth Empowerment", "Community Leadership", "Purpose and Faith", "Family and Generational Planning", "Health and Personal Wellness"] as const;
const categories = [
  { label: "Purpose", keys: ["Purpose and Faith"] },
  { label: "Ownership", keys: ["Financial Literacy", "Investment Readiness", "Business Ownership", "Brand Partnership Readiness", "Land and Agricultural Stewardship"] },
  { label: "Wellness", keys: ["Health and Personal Wellness"] },
  { label: "Family", keys: ["Family and Generational Planning"] },
  { label: "Impact", keys: ["Youth Empowerment", "Community Leadership"] },
] as const;
const TOTAL_POINTS = 500;
const initialAttributes = Object.fromEntries(attributeNames.map((name) => [name, 50])) as Record<(typeof attributeNames)[number], number>;

type BuilderState = {
  legacyName: string; sport: string; careerStage: string; positionRole: string; purposeStatement: string; legacyAudience: string;
  primaryInvestmentPath: string; industries: string[]; innovationIndustry: string; worldNeed: string; problemToSolve: string;
  attributes: typeof initialAttributes;
};

const initialState: BuilderState = { legacyName: "", sport: "", careerStage: "", positionRole: "", purposeStatement: "", legacyAudience: "", primaryInvestmentPath: "", industries: [], innovationIndustry: "", worldNeed: "", problemToSolve: "", attributes: initialAttributes };

function fieldClass() { return "h-12 border-gold/25 bg-obsidian/55 focus-visible:ring-gold"; }

export function LegacyPlayerBuilder() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<BuilderState>(initialState);
  const [saveConsent, setSaveConsent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const spent = Object.values(profile.attributes).reduce((sum, value) => sum + value, 0);
  const topAttributes = useMemo(() => [...attributeNames].sort((a, b) => profile.attributes[b] - profile.attributes[a]).slice(0, 3), [profile.attributes]);
  const wholeAthlete = Math.round(categories.reduce((sum, category) => sum + category.keys.reduce((group, key) => group + profile.attributes[key], 0) / category.keys.length, 0) / categories.length);
  const recommendation = profile.primaryInvestmentPath === paths[1].title ? "Begin with EA Legacy’s ownership fundamentals and a guided real estate due diligence worksheet." : profile.primaryInvestmentPath === paths[2].title ? "Begin with EA Legacy’s business ownership fundamentals and opportunity evaluation framework." : "Begin with EA Legacy’s financial literacy foundations and long-term investing education.";

  const set = <K extends keyof BuilderState>(key: K, value: BuilderState[K]) => setProfile((current) => ({ ...current, [key]: value }));
  const canContinue = step === 1 ? Boolean(profile.legacyName && profile.sport && profile.careerStage && profile.purposeStatement && profile.legacyAudience) : step === 2 ? Boolean(profile.primaryInvestmentPath) : step === 3 ? Boolean(profile.industries.length && profile.innovationIndustry) : true;
  function updateAttribute(name: (typeof attributeNames)[number], next: number) {
    const current = profile.attributes[name];
    const available = TOTAL_POINTS - (spent - current);
    const value = Math.max(0, Math.min(99, next, available));
    set("attributes", { ...profile.attributes, [name]: value });
  }
  function reset() { setProfile(initialState); setStep(1); setSaved(false); setSaveConsent(false); setError(""); }
  async function save() {
    if (!saveConsent) { setError("Confirm that you want EA Legacy to store this completed profile."); return; }
    const accessToken = localStorage.getItem("eal-access-token");
    if (!accessToken) { setError("Enter the Legacy Room first, then return to save your profile."); return; }
    setSaving(true); setError("");
    try {
      await saveLegacyProfile({ data: { accessToken, legacyName: profile.legacyName, sport: profile.sport, careerStage: profile.careerStage as typeof stages[number], positionRole: profile.positionRole, purposeStatement: profile.purposeStatement, legacyAudience: profile.legacyAudience, primaryInvestmentPath: profile.primaryInvestmentPath as typeof paths[number]["title"], industries: profile.industries, innovationIndustry: profile.innovationIndustry, worldNeed: profile.worldNeed, problemToSolve: profile.problemToSolve, attributes: profile.attributes, topAttributes, recommendedNextStep: recommendation, explicitSaveConsent: true, website: "" } });
      setSaved(true);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Your profile could not be saved. Please try again."); }
    finally { setSaving(false); }
  }

  return <div className="legacy-builder" aria-label="EA Legacy Player Builder">
    <div className="legacy-builder-topline"><span>EA LEGACY // PLAYER BUILDER</span><span>STEP {step} / 5</span></div>
    <div className="legacy-builder-progress" aria-hidden="true"><span style={{ transform: `scaleX(${step / 5})` }} /></div>
    <nav className="legacy-builder-steps" aria-label="Builder progress">{["Identity", "Investment", "Innovation", "Attributes", "Profile"].map((label, index) => <button key={label} type="button" disabled={index + 1 > step} onClick={() => setStep(index + 1)} aria-current={step === index + 1 ? "step" : undefined}><span>0{index + 1}</span>{label}</button>)}</nav>

    <div className="legacy-builder-stage">
      {step === 1 && <fieldset><legend>Identity</legend><p className="builder-intro">Define who you are becoming and who your legacy will serve.</p><div className="builder-fields"><BuilderField label="Name or Legacy Name" id="legacy-name"><Input id="legacy-name" value={profile.legacyName} onChange={(e) => set("legacyName", e.target.value)} maxLength={100} className={fieldClass()} /></BuilderField><BuilderField label="Sport" id="legacy-sport"><Input id="legacy-sport" value={profile.sport} onChange={(e) => set("sport", e.target.value)} maxLength={80} className={fieldClass()} /></BuilderField><div className="sm:col-span-2"><Label>Current career stage</Label><div className="builder-choice-grid mt-2">{stages.map((stage) => <Button key={stage} type="button" variant="glass" aria-pressed={profile.careerStage === stage} onClick={() => set("careerStage", stage)}>{stage}</Button>)}</div></div><BuilderField label="Position or role (optional)" id="legacy-position"><Input id="legacy-position" value={profile.positionRole} onChange={(e) => set("positionRole", e.target.value)} maxLength={100} className={fieldClass()} /></BuilderField><BuilderField label="Who do you want your legacy to serve?" id="legacy-audience"><Input id="legacy-audience" value={profile.legacyAudience} onChange={(e) => set("legacyAudience", e.target.value)} maxLength={300} className={fieldClass()} /></BuilderField><BuilderField label="Primary purpose statement" id="legacy-purpose" className="sm:col-span-2"><Textarea id="legacy-purpose" value={profile.purposeStatement} onChange={(e) => set("purposeStatement", e.target.value)} maxLength={500} className="min-h-28 border-gold/25 bg-obsidian/55" /></BuilderField></div></fieldset>}
      {step === 2 && <fieldset><legend>Investment Path</legend><p className="builder-intro">Choose one primary learning path. Each begins with responsible education and due diligence.</p><div className="grid gap-3">{paths.map((path, index) => <button type="button" key={path.title} className="builder-path" aria-pressed={profile.primaryInvestmentPath === path.title} onClick={() => set("primaryInvestmentPath", path.title)}><span>PATH 0{index + 1}</span><strong>{path.title}</strong><small>{path.text}</small></button>)}</div><p className="builder-disclaimer"><ShieldCheck /> Educational only. This is not personalized financial, legal, tax, or investment advice.</p></fieldset>}
      {step === 3 && <fieldset><legend>Innovation and Ownership</legend><p className="builder-intro">Map your experience to the need you feel called to meet.</p><Label>Select connected or relevant industries</Label><div className="builder-chips">{industries.map((industry) => { const selected = profile.industries.includes(industry); return <button type="button" key={industry} aria-pressed={selected} onClick={() => set("industries", selected ? profile.industries.filter((item) => item !== industry) : [...profile.industries, industry])}>{selected && <Check />} {industry}</button>; })}</div><div className="builder-fields mt-7"><BuilderField label="What industry would you like to innovate within?" id="innovation-industry"><Input id="innovation-industry" value={profile.innovationIndustry} onChange={(e) => set("innovationIndustry", e.target.value)} maxLength={120} className={fieldClass()} /></BuilderField><BuilderField label="What industry are you currently connected to?" id="current-industry"><Input id="current-industry" value={profile.industries[0] ?? ""} readOnly className={fieldClass()} /></BuilderField><BuilderField label="Where do you see a need in today’s world?" id="world-need"><Textarea id="world-need" value={profile.worldNeed} onChange={(e) => set("worldNeed", e.target.value)} maxLength={500} className="min-h-28 border-gold/25 bg-obsidian/55" /></BuilderField><BuilderField label="What problem do you feel called to solve?" id="problem-solve"><Textarea id="problem-solve" value={profile.problemToSolve} onChange={(e) => set("problemToSolve", e.target.value)} maxLength={500} className="min-h-28 border-gold/25 bg-obsidian/55" /></BuilderField></div></fieldset>}
      {step === 4 && <fieldset><legend>Legacy Attributes</legend><div className="builder-attribute-header"><p className="builder-intro">Allocate 500 development points across your self-selected priorities.</p><div><strong>{TOTAL_POINTS - spent}</strong><span> points available</span></div></div><div className="grid gap-8 lg:grid-cols-[1.35fr_.65fr]"><div className="space-y-4">{attributeNames.map((name) => <div className="builder-attribute" key={name}><div><Label htmlFor={`attribute-${name}`}>{name}</Label><output>{profile.attributes[name]}</output></div><input id={`attribute-${name}`} type="range" min="0" max="99" value={profile.attributes[name]} onChange={(e) => updateAttribute(name, Number(e.target.value))} aria-valuetext={`${profile.attributes[name]} self-selected development points`} style={{ "--attribute-progress": `${profile.attributes[name]}%` } as React.CSSProperties} /></div>)}</div><div className="whole-athlete"><div className="whole-athlete-ring" style={{ "--balance": `${wholeAthlete * 3.6}deg` } as React.CSSProperties}><span><strong>{wholeAthlete}</strong><small>Legacy Balance</small></span></div>{categories.map((category) => <div key={category.label}><span>{category.label}</span><i style={{ width: `${Math.round(category.keys.reduce((sum, key) => sum + profile.attributes[key], 0) / category.keys.length)}%` }} /></div>)}<p>Legacy Vision Profile based on your priorities, not a verified competency assessment.</p></div></div></fieldset>}
      {step === 5 && <fieldset><legend>Legacy Player Card</legend><div className="legacy-player-card"><div className="player-card-glow" aria-hidden="true" /><div className="relative"><div className="flex items-start justify-between gap-4"><div><span>EA LEGACY // VISION PROFILE</span><h3>{profile.legacyName}</h3><p>{profile.sport} · {profile.careerStage}</p></div><div className="player-card-rating"><strong>{wholeAthlete}</strong><small>Balance</small></div></div><div className="player-card-grid"><div><small>Primary investment interest</small><strong>{profile.primaryInvestmentPath}</strong></div><div><small>Innovation industry</small><strong>{profile.innovationIndustry}</strong></div></div><blockquote>“{profile.purposeStatement}”</blockquote><div><small>Top legacy priorities</small><div className="mt-2 flex flex-wrap gap-2">{topAttributes.map((name) => <span className="locker-nameplate" key={name}>{name}</span>)}</div></div><div className="player-card-next"><Sparkles /><div><small>Recommended next educational step</small><p>{recommendation}</p></div></div></div></div><p className="mt-5 text-xs leading-6 text-muted-foreground">This profile reflects self-selected priorities and is not a professional assessment.</p><div className="mt-5 flex items-start gap-3"><Checkbox id="profile-save-consent" checked={saveConsent} onCheckedChange={(value) => { setSaveConsent(value === true); setError(""); }} /><Label htmlFor="profile-save-consent" className="text-xs leading-5 text-muted-foreground">I explicitly consent to Empowering Athletes Legacy storing this completed Legacy Vision Profile and linking it to my submitted access record.</Label></div>{error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}{saved && <p role="status" className="mt-4 text-sm text-legacy">Your Legacy Vision Profile has been saved.</p>}<div className="mt-6 flex flex-wrap gap-3"><Button type="button" variant="legacy" onClick={save} disabled={saving || saved}><Save /> {saving ? "Saving…" : saved ? "Profile Saved" : "Save My Legacy Profile"}</Button><Button asChild variant="glass"><Link to="/programs">Explore EA Legacy Resources</Link></Button><Button asChild variant="glass"><Link to="/contact">Speak With Our Team</Link></Button></div></fieldset>}
    </div>
    <div className="legacy-builder-actions"><Button type="button" variant="glass" onClick={step === 1 ? reset : () => setStep(step - 1)}>{step === 1 ? <RotateCcw /> : <ArrowLeft />} {step === 1 ? "Reset" : "Back"}</Button>{step < 5 && <Button type="button" variant="legacy" disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue <ArrowRight /></Button>}{step === 5 && <Button type="button" variant="glass" onClick={() => setStep(1)}><Edit3 /> Edit Profile</Button>}</div>
  </div>;
}

function BuilderField({ label, id, className, children }: { label: string; id: string; className?: string; children: React.ReactNode }) { return <div className={className}><Label htmlFor={id} className="mb-2 block">{label}</Label>{children}</div>; }