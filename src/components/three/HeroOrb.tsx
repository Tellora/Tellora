"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroOrb() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;
        if (window.innerWidth < 1024) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });

        renderer.setSize(480, 480);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Primary torus knot
        const geometry = new THREE.TorusKnotGeometry(1.5, 0.38, 140, 64, 2, 3);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x4ac0e4,
            metalness: 0.6,
            roughness: 0.08,
            envMapIntensity: 1.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            wireframe: false,
            iridescence: 0.4,
            iridescenceIOR: 1.5,
        });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        // Wireframe overlay
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x4ac0e4,
            wireframe: true,
            opacity: 0.06,
            transparent: true,
        });
        const wireKnot = new THREE.Mesh(geometry.clone(), wireMat);
        wireKnot.scale.setScalar(1.04);
        scene.add(wireKnot);

        // Outer ring
        const ringGeo = new THREE.TorusGeometry(2.8, 0.015, 16, 200);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x4ac0e4, opacity: 0.3, transparent: true });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 3;
        scene.add(ring);

        const ring2Geo = new THREE.TorusGeometry(2.2, 0.01, 16, 200);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x2e7dbf, opacity: 0.2, transparent: true });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        ring2.rotation.x = -Math.PI / 4;
        ring2.rotation.y = Math.PI / 6;
        scene.add(ring2);

        // Floating particles
        const particleCount = 60;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            const r = 3 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({ color: 0x4ac0e4, size: 0.04, transparent: true, opacity: 0.7 });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));

        const pointLight1 = new THREE.PointLight(0x4ac0e4, 3, 0);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x2e7dbf, 2, 0);
        pointLight2.position.set(-5, -5, 3);
        scene.add(pointLight2);

        const rimLight = new THREE.PointLight(0x7dd4f0, 1.5, 0);
        rimLight.position.set(0, 6, -4);
        scene.add(rimLight);

        camera.position.z = 5;

        let frameId: number;
        const startTime = Date.now();

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            const t = (Date.now() - startTime) / 1000;

            torusKnot.rotation.x = t * 0.25;
            torusKnot.rotation.y = t * 0.35;
            wireKnot.rotation.x = t * 0.25;
            wireKnot.rotation.y = t * 0.35;

            const s = 1 + Math.sin(t * 1.8) * 0.04;
            torusKnot.scale.setScalar(s);

            ring.rotation.z = t * 0.15;
            ring2.rotation.z = -t * 0.1;
            ring2.rotation.x = -Math.PI / 4 + Math.sin(t * 0.3) * 0.1;

            particles.rotation.y = t * 0.05;

            // Dynamic light movement
            pointLight1.position.x = Math.sin(t * 0.7) * 5;
            pointLight1.position.y = Math.cos(t * 0.5) * 5;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);
            if (mountRef.current && renderer.domElement.parentNode) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-[480px] h-[480px] flex items-center justify-center"
            style={{ filter: "drop-shadow(0 0 40px rgba(74,192,228,0.25))" }}
        />
    );
}
