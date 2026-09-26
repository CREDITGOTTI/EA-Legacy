import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Building2, CircleDollarSign, HeartPulse, House, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programs } from "@/content/site";

function itemAt<T>(items: readonly T[], index: number): T {
  const item = items[index] ?? items[0];
  if (!item) throw new Error("Interactive content requires at least one item.");
  return item;
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, window.scrollY / height) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  return <div className="fixed inset-x-0 top-20 z-30 h-px bg-border/30" aria-hidden="true"><span className="block h-full origin-left bg-legacy shadow-[0_0_12px_var(--legacy)]" style={{ transform: `scaleX(${progress})` }} /></div>;
}

export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`section-enter ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

const ecosystemNodes = [
  { label: "Financial literacy", text: "Clear education for stewardship, risk, and long-term decisions.", icon: CircleDollarSign },
  { label: "Mentorship", text: "Trusted relationships that challenge, guide, and protect the whole person.", icon: Users },
  { label: "Wellness", text: "Connected support for mental, physical, and emotional health.", icon: HeartPulse },
  { label: "Business", text: "Practical development for ownership, work, and durable opportunity.", icon: Building2 },
  { label: "Family legacy", text: "Tools that strengthen families and multiply impact across generations.", icon: House },
] as const;

export function EcosystemWidget() {
  const [active, setActive] = useState(0);
  const selectedNode = itemAt(ecosystemNodes, active);
  return <div className="ecosystem-widget strategy-board" aria-label="EA Legacy athlete ecosystem strategy board">
    <div className="ecosystem-grid" aria-hidden="true" />
    <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_.78fr] lg:items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[35rem]">
        <span className="ecosystem-ring inset-[11%]" aria-hidden="true" />
        <span className="ecosystem-ring inset-[29%] animation-delay" aria-hidden="true" />
        <div className="absolute inset-[34%] grid place-items-center border border-legacy/60 bg-obsidian text-center shadow-[0_0_45px_color-mix(in_oklab,var(--legacy)_18%,transparent)] [clip-path:polygon(12%_0,100%_0,100%_88%,88%_100%,0_100%,0_12%)]">
          <div><Sparkles className="mx-auto size-5 text-legacy" /><strong className="mt-2 block text-xs uppercase tracking-[0.18em]">The Athlete</strong><span className="mt-1 block text-[10px] text-muted-foreground">Person first</span></div>
        </div>
        {ecosystemNodes.map((node, index) => {
          const Icon = node.icon;
          return <Button key={node.label} variant="glass" size="sm" aria-pressed={active === index} onClick={() => setActive(index)} className={`ecosystem-node ecosystem-node-${index + 1} ${active === index ? "is-active" : ""}`}><Icon /><span>{node.label}</span></Button>;
        })}
      </div>
      <div className="border-l border-gold/50 pl-6 md:pl-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-legacy">Strategy link 0{active + 1}</span>
        <h3 className="mt-4 font-display text-4xl md:text-5xl">{selectedNode.label}</h3>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{selectedNode.text}</p>
      </div>
    </div>
  </div>;
}

export function ProgramRail() {
  const [active, setActive] = useState(0);
  const selected = itemAt(programs, active);
  const Icon = selected.icon;
  return <div className="mt-12">
    <div className="locker-bay-open grid min-h-[20rem] gap-8 border border-border bg-surface/65 p-6 backdrop-blur md:grid-cols-[.7fr_1.3fr] md:p-10">
      <div className="flex flex-col justify-between border-b border-border pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8"><div><span className="locker-nameplate">Locker 0{active + 1} / 08</span><Icon className="mt-8 size-9 text-burnt" /></div><div className="mt-12 h-1 overflow-hidden bg-border"><span className="block h-full origin-left bg-legacy transition-transform duration-500" style={{ transform: `scaleX(${(active + 1) / programs.length})` }} /></div></div>
      <div className="flex flex-col justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-burnt">Bay illuminated</p><h3 className="mt-3 font-display text-4xl leading-none md:text-6xl">{selected.title}</h3><p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{selected.short}</p><p className="mt-5 max-w-2xl text-sm leading-7 text-foreground">{selected.receive}</p></div><a href="/programs" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">Open the full playbook <ArrowRight className="size-4" /></a></div>
    </div>
    <div className="rail-scroll mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3" aria-label="Select a program">
      {programs.map((program, index) => <Button key={program.title} variant="glass" aria-pressed={active === index} onClick={() => setActive(index)} className={`locker-bay-tab h-auto min-h-20 min-w-[72%] snap-start justify-start whitespace-normal px-4 text-left sm:min-w-[16rem] ${active === index ? "is-open border-legacy text-legacy" : ""}`}><span className="text-burnt">0{index + 1}</span><span className="leading-5">{program.title}</span></Button>)}
    </div>
  </div>;
}

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || ran.current) return;
      ran.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setCount(value); observer.disconnect(); return; }
      const start = performance.now();
      const duration = 1400;
      const frame = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      observer.disconnect();
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}