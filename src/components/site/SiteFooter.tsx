import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { navItems } from "@/content/site";
import { Brand } from "./Brand";
import { brandMedia } from "@/content/media";

export function SiteFooter() {
  function clearAccess() {
    localStorage.removeItem("eal-access-token");
    sessionStorage.removeItem("eal-locker-entered");
    window.location.reload();
  }
  return <footer className="locker-footer relative overflow-hidden border-t border-border bg-obsidian py-16 text-foreground"><div className="absolute inset-0 perforated-metal opacity-40" aria-hidden="true" /><div className="relative mx-auto max-w-[1440px] px-5 lg:px-10"><div className="grid gap-12 border-b border-border pb-14 md:grid-cols-[1.4fr_1fr_1fr]"><div><Brand /><img src={brandMedia.logo} alt="" className="mt-8 size-24 object-contain opacity-35" /><p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">Education, resources, and opportunities helping athletes build beyond the game.</p><div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-gold" /> Austin, Texas</div></div><div><p className="eyebrow">Explore</p><nav className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">{navItems.map((item) => <Link key={item.to} to={item.to} className="text-sm text-muted-foreground hover:text-gold">{item.label}</Link>)}<Link to="/contact" className="text-sm text-muted-foreground hover:text-gold">Contact</Link><Link to="/portal" className="text-sm text-muted-foreground hover:text-gold">Portal</Link></nav></div><div><p className="eyebrow">Connect</p><a href="mailto:hello@ealegacy.org" className="mt-5 flex items-center gap-2 text-sm text-foreground hover:text-gold"><Mail className="size-4" /> hello@ealegacy.org</a><Link to="/get-involved" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold">Build with us <ArrowUpRight className="size-4" /></Link></div></div><div className="flex flex-col gap-4 pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Empowering Athletes Legacy. All rights reserved.</p><div className="flex flex-wrap gap-5"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Button type="button" variant="link" className="h-auto min-h-0 p-0 text-xs text-muted-foreground" onClick={clearAccess}>Clear local access data</Button></div></div></div></footer>;
}
