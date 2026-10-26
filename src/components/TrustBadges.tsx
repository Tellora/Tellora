import { Star } from "lucide-react";
import { GOOGLE_RATING } from "@/data/us-market";

/**
 * Third-party directory profiles. A badge only renders once `url` is set.
 * TODO: add verified profile links for Clutch, GoodFirms and DesignRush when those profiles are live.
 */
const DIRECTORIES: { name: string; url: string | null }[] = [
    { name: "Clutch", url: null }, // TODO: verified Clutch profile link
    { name: "GoodFirms", url: null }, // TODO: verified GoodFirms profile link
    { name: "DesignRush", url: null }, // TODO: verified DesignRush profile link
];

export default function TrustBadges({ className = "" }: { className?: string }) {
    return (
        <ul className={`flex flex-wrap gap-3 ${className}`} aria-label="Trust badges">
            <li>
                <a
                    href={GOOGLE_RATING.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white brutalist-border shadow-[3px_3px_0px_#000] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors"
                >
                    <Star size={12} className="fill-current" /> Google 5.0
                </a>
            </li>
            {DIRECTORIES.filter((d) => d.url).map((d) => (
                <li key={d.name}>
                    <a
                        href={d.url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 bg-white brutalist-border shadow-[3px_3px_0px_#000] text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors"
                    >
                        {d.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}
