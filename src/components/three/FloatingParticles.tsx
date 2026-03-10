"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FloatingParticles() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Performance Check: Disable on low-end devices/mobile
        const isMobile = window.innerWidth < 1024;
        if (isMobile) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false, // Extreme performance: Turn off antialiasing
            powerPreference: "high-performance",
            precision: "lowp" // Use low precision for better performance
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1); // Standardize pixel ratio at 1 to avoid high-dpi rendering overhead
        mountRef.current.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        // Massively reduced particle count for seamless scrolling
        const particlesCount = 400;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            posArray[i] = (Math.random() - 0.5) * 40;
            posArray[i + 1] = (Math.random() - 0.5) * 60;
            posArray[i + 2] = (Math.random() - 0.5) * 40;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x4ac0e4,
            transparent: true,
            opacity: 0.25,
            depthWrite: false,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 15;

        let frameId: number;
        let lastScrollY = window.scrollY;

        const onScroll = () => {
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // Very subtle and cheap camera movement
            const targetY = -(lastScrollY * 0.005);
            camera.position.y += (targetY - camera.position.y) * 0.05;

            particlesMesh.rotation.y += 0.0001;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', onScroll);
            if (mountRef.current && renderer.domElement.parentNode) {
                mountRef.current.removeChild(renderer.domElement);
            }
            particlesGeometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none w-full h-full opacity-60"
            ref={mountRef}
        />
    );
}
