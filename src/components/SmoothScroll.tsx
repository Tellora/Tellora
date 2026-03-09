"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        // Optimized Lenis settings for snappier, lag-free performance
        <ReactLenis root options={{
            lerp: 0.12,
            syncTouch: true,
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.5,
        }}>
            {children}
        </ReactLenis>
    );
}
