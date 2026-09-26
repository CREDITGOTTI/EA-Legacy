import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BlueprintModal } from "@/components/site/BlueprintModal";
import { LockerEntrance } from "@/components/site/LockerEntrance";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { trackEvent } from "@/lib/analytics";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() { return <main className="grid min-h-screen place-items-center bg-deep px-5 pt-20 text-center"><div><p className="eyebrow">404</p><h1 className="mt-5 font-display text-6xl">This path ends here.</h1><p className="mt-4 text-muted-foreground">The work continues. Return to the mission.</p><Button asChild variant="legacy" size="lg" className="mt-8"><Link to="/">Return home</Link></Button></div></main>; }
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) { const router = useRouter(); useEffect(() => reportLovableError(error, { boundary: "tanstack_root_error_component" }), [error]); return <main className="grid min-h-screen place-items-center px-5 text-center"><div><h1 className="font-display text-5xl">This page did not load.</h1><p className="mt-4 text-muted-foreground">Please try once more or return home.</p><div className="mt-7 flex justify-center gap-3"><Button variant="legacy" onClick={() => { router.invalidate(); reset(); }}>Try again</Button><Button asChild variant="gold"><Link to="/">Go home</Link></Button></div></div></main>; }

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }, { property: "og:type", content: "website" }, { property: "og:site_name", content: "Empowering Athletes Legacy" }, { name: "twitter:card", content: "summary_large_image" }],
    links: [{ rel: "stylesheet", href: appCss }, { rel: "preconnect", href: "https://fonts.googleapis.com" }, { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }, { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" }, { rel: "icon", href: "/favicon.png", type: "image/png" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Empowering Athletes Legacy", url: "https://EALegacy.org", areaServed: "Austin, Texas", slogan: "We See the Person Beyond the Player." }) }],
  }), shellComponent: RootShell, component: RootComponent, notFoundComponent: NotFoundComponent, errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) { return <html lang="en"><head><HeadContent /></head><body><a href="#main-content" className="fixed left-3 top-3 z-[100] -translate-y-20 bg-legacy px-4 py-3 text-xs font-bold text-obsidian focus:translate-y-0">Skip to content</a>{children}<Scripts /></body></html>; }
function RootComponent() { const { queryClient } = Route.useRouteContext(); const router = useRouter(); useEffect(() => { trackEvent("page_view", { path: router.state.location.pathname }); }, [router.state.location.pathname]); return <QueryClientProvider client={queryClient}><LockerEntrance /><SiteHeader /><main id="main-content"><Outlet /></main><SiteFooter /><BlueprintModal /></QueryClientProvider>; }
