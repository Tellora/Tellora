"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Torus } from "@react-three/drei";

function TorusMesh() {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += 0.005;
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Torus ref={meshRef} args={[3, 1, 64, 128]}>
                <meshPhysicalMaterial
                    color="#0066FF"
                    roughness={0.2}
                    metalness={0.8}
                />
            </Torus>
        </Float>
    );
}

export function InteractiveThree() {
    const [mounted, setMounted] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (hasError) {
        return (
            <div className="w-full h-full flex items-center justify-center p-12">
                <div className="w-full h-full border-2 border-primary/20 rounded-[4rem] flex items-center justify-center bg-slate-50/50">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] animate-pulse">Neural Interface Offline</span>
                </div>
            </div>
        );
    }

    if (!mounted) {
        return <div className="w-full h-full bg-slate-50/50 rounded-[3rem] animate-pulse flex items-center justify-center text-[10px] font-black uppercase text-slate-300 tracking-[0.3em]">Synching Neural Mesh...</div>;
    }

    return (
        <div className="w-full h-full min-h-[400px]">
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    gl={{ antialias: true, alpha: true }}
                    onError={() => setHasError(true)}
                >
                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={2.5} />
                    <TorusMesh />
                </Canvas>
            </Suspense>
        </div>
    );
}



