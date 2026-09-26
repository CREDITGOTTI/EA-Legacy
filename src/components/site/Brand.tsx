import { Link } from "@tanstack/react-router";
import { brandMedia } from "@/content/media";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="EA Legacy home">
      <span className="grid size-11 shrink-0 place-items-center overflow-hidden border border-border bg-obsidian p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--gold)_18%,transparent)] transition-colors group-hover:border-gold"><img src={brandMedia.logo} alt="" className="size-full object-contain" /></span>
      {!compact && <span className="text-xs font-semibold tracking-[0.22em] text-foreground">EA LEGACY</span>}
    </Link>
  );
}
