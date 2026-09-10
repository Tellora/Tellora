"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    return (
        // Optimized Lenis settings: syncTouch disabled so iOS/touch devices retain natural, moderate momentum
        <ReactLenis root options={{
            lerp: 0.08,
            syncTouch: false,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.0,
        }}>
            {children}
        </ReactLenis>
    );
}
