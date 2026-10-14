"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Zap, MessageCircle } from "lucide-react";

const items = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/services", label: "Services", Icon: Layers },
    { href: "/seo-checker", label: "Audit", Icon: Zap },
    { href: "/contact", label: "Talk", Icon: MessageCircle },
];

/** App-style bottom navigation, phones only. Reuses existing routes. */
export function MobileDock() {
    const pathname = usePathname() || "/";
    const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
    return (
        <nav
            aria-label="Quick navigation"
            className="md:hidden fixed bottom-0 inset-x-0 z-[120] bg-white border-t-[4px] border-black grid grid-cols-4 pb-[env(safe-area-inset-bottom)]"
        >
            {items.map(({ href, label, Icon }) => {
                const active = isActive(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[9px] font-black uppercase tracking-widest active:scale-95 transition-transform ${active ? "bg-primary text-black" : "text-black"}`}
                    >
                        <Icon size={20} strokeWidth={2.5} />
                        {label}
                        {active && <span className="absolute top-0 inset-x-4 h-[4px] bg-black" />}
                    </Link>
                );
            })}
        </nav>
    );
}
