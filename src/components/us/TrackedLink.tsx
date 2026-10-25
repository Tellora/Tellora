"use client";

import Link from "next/link";
import { ConversionEventName, trackEvent } from "@/lib/gtag";

/** Link that fires a conversion event on click, then navigates normally. */
export default function TrackedLink({
    href,
    event,
    eventParams,
    children,
    ...rest
}: {
    href: string;
    event: ConversionEventName;
    eventParams?: Record<string, string | number | boolean>;
    children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
    const external = /^https?:\/\//.test(href);
    const onClick = () => trackEvent(event, eventParams);
    if (external) {
        return (
            <a href={href} onClick={onClick} target="_blank" rel="noopener noreferrer" {...rest}>
                {children}
            </a>
        );
    }
    return (
        <Link href={href} onClick={onClick} {...rest}>
            {children}
        </Link>
    );
}
