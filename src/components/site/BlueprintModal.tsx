import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BlueprintForm } from "./Forms";

export function BlueprintModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || localStorage.getItem("eal-blueprint-dismissed") || localStorage.getItem("eal-blueprint-converted")) return;
    let timer: number | undefined;
    let listening = false;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const exit = (event: MouseEvent) => { if (desktop && event.clientY <= 8) setOpen(true); };
    const begin = () => {
      if (listening) return;
      listening = true;
      if (desktop) document.addEventListener("mouseout", exit);
      else timer = window.setTimeout(() => setOpen(true), 14000);
    };
    if (sessionStorage.getItem("eal-locker-entered")) begin();
    else window.addEventListener("eal:locker-entered", begin, { once: true });
    return () => { document.removeEventListener("mouseout", exit); window.removeEventListener("eal:locker-entered", begin); if (timer) window.clearTimeout(timer); };
  }, []);
  return <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next && typeof window !== "undefined") localStorage.setItem("eal-blueprint-dismissed", "true"); }}><DialogContent className="max-w-2xl"><DialogHeader><p className="eyebrow">Complimentary guide</p><DialogTitle className="mt-3 font-display text-3xl leading-tight md:text-4xl">The Athlete Legacy Blueprint</DialogTitle><DialogDescription className="mt-2 leading-6">12 questions every athlete and family should answer before the game ends.</DialogDescription></DialogHeader><BlueprintForm source="intent-modal" /></DialogContent></Dialog>;
}
