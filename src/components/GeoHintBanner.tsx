"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "tellora_us_banner_dismissed";

/** Time zones used across the US. No IP lookup or third-party call: this uses the browser's own settings. */
const isLikelyUs = () => {
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const usZones = /^(America\/(New_York|Detroit|Chicago|Indiana|Kentucky|Menominee|North_Dakota|Denver|Boise|Phoenix|Los_Angeles|Anchorage|Juneau|Sitka|Nome|Yakutat|Metlakatla|Adak)|Pacific\/Honolulu|US\/)/;
        return usZones.test(tz);
    } catch {
        return false;
    }
};

/** Dismissible hint for visitors who look US-based. Dismissal is remembered in localStorage. */
export default function GeoHintBanner() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        try {
            if (localStorage.getItem(STORAGE_KEY)) return;
        } catch {
            /* storage unavailable: still show once per page view */
        }
        if (isLikelyUs()) setShow(true);
    }, []);

    if (!show) return null;

    const dismiss = () => {
        setShow(false);
        try {
            localStorage.setItem(STORAGE_KEY, "1");
        } catch {
            /* ignore */
        }
    };

    return (
        <div
            role="region"
            aria-label="US visitors"
            className="fixed z-[130] left-3 right-3 bottom-[76px] md:bottom-6 md:left-6 md:right-auto md:max-w-sm bg-white brutalist-border shadow-[6px_6px_0px_#A855F7] p-4 flex items-start gap-3"
        >
            <p className="text-xs sm:text-sm font-black uppercase tracking-wide leading-snug flex-1">
                Based in the US?{" "}
                <Link href="/us/" onClick={dismiss} className="underline underline-offset-4 decoration-2 decoration-accent hover:text-accent">
                    See how we help US brands →
                </Link>
            </p>
            <button onClick={dismiss} aria-label="Dismiss" className="shrink-0 p-1 hover:bg-primary transition-colors">
                <X size={16} />
            </button>
        </div>
    );
}
