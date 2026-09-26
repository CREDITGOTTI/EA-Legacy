import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: ReactNode }) {
  return <section className="interior-locker-hero relative overflow-hidden border-b border-border bg-deep pt-36 pb-20 md:pt-48 md:pb-28"><div className="light-sweep absolute inset-0" aria-hidden /><div className="absolute inset-0 perforated-metal opacity-20" aria-hidden /><div className="relative mx-auto max-w-[1440px] px-5 lg:px-10"><p className="locker-nameplate animate-reveal">{eyebrow}</p><h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] text-balance md:text-7xl lg:text-8xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{intro}</p>{children}</div></section>;
}
