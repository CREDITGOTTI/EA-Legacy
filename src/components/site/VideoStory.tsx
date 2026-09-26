import { useState } from "react";
import { Play } from "lucide-react";
import familyImage from "@/assets/eal-family.jpg";
import filmAsset from "@/assets/Eagles_Practice_V1.mp4.asset.json";
import { trackEvent } from "@/lib/analytics";

export function VideoStory() {
  const [playing, setPlaying] = useState(false);
  return <div className="relative aspect-video overflow-hidden bg-charcoal grain">{playing ? <video src={filmAsset.url} poster={familyImage} controls autoPlay playsInline preload="metadata" className="absolute inset-0 size-full bg-obsidian object-contain" aria-label="Eagles Practice V1" /> : <><img src={familyImage} alt="An athlete and family in conversation with a trusted mentor" width={1408} height={1008} loading="lazy" className="size-full object-cover opacity-80 transition-all duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" /><button type="button" className="absolute inset-0 grid size-full place-items-center" aria-label="Play Who We Are video" onClick={() => { setPlaying(true); trackEvent("video_play", { video: "eagles-practice-v1", provider: "ealegacy" }); }}><span className="grid size-20 place-items-center rounded-full border border-ivory/60 bg-background/30 backdrop-blur-sm transition-transform hover:scale-110"><Play className="ml-1 size-7 fill-current" /></span></button><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><p className="eyebrow">Who We Are</p><p className="mt-2 text-sm text-foreground">Eagles Practice V1</p></div><span className="hidden text-xs text-muted-foreground sm:block">04:38</span></div></>}</div>;
}
