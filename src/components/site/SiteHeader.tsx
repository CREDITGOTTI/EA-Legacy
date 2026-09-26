import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { navItems } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { Brand } from "./Brand";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const openSignup = () => {
    setOpen(false);
    trackEvent("cta_click", { cta: "sign-up" });
    window.dispatchEvent(new CustomEvent("eal:open-signup"));
  };
  return (
    <header className="locker-header fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-10">
        <Brand />
        <nav className="hidden items-center justify-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.to} to={item.to} className="nav-link" activeProps={{ className: "nav-link nav-link-active" }}>{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="glass" size="sm"><Link to="/portal">Portal</Link></Button>
          <Button variant="glass" size="sm" onClick={openSignup}>Sign Up</Button>
          <Button asChild variant="legacy" size="sm"><Link to="/get-involved" onClick={() => trackEvent("donation_interest", { placement: "header" })}>Donate</Link></Button>
        </div>
        <Button variant="ghost" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <div className="border-t border-border bg-background px-5 py-6 lg:hidden"><nav className="flex flex-col" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border py-4 text-base text-foreground">{item.label}</Link>)}<Link to="/portal" onClick={() => setOpen(false)} className="border-b border-border py-4 text-base text-foreground">Portal</Link><Button variant="glass" size="lg" className="mt-5" onClick={openSignup}>Sign Up</Button><Button asChild variant="legacy" size="lg" className="mt-3"><Link to="/get-involved" onClick={() => setOpen(false)}>Donate</Link></Button></nav></div>}
    </header>
  );
}
