"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname === "/" ? [] : pathname.split("/").filter((p) => p !== "");

    if (paths.length === 0) return null;

    const buildPath = (index: number) => "/" + paths.slice(0, index + 1).join("/");

    // Structured Data for BreadcrumbList
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://tellora.media/"
            },
            ...paths.map((path, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
                "item": `https://tellora.media${buildPath(index)}`
            }))
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav className="flex items-center text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40 mb-8 z-20 relative">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                {paths.map((path, index) => {
                    const isLast = index === paths.length - 1;
                    const formattedPath = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");
                    
                    return (
                        <div key={path} className="flex items-center">
                            <ChevronRight size={14} className="mx-2" />
                            {isLast ? (
                                <span className="text-primary">{formattedPath}</span>
                            ) : (
                                <Link href={buildPath(index)} className="hover:text-primary transition-colors">
                                    {formattedPath}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </>
    );
}
