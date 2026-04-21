"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        // Optimized Lenis settings for snappier, lag-free performance
        <ReactLenis root options={{
            lerp: 0.08,
            syncTouch: true,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.2,
        }}>
            {children}
        </ReactLenis>
    );
}
