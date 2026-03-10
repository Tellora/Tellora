"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("tellora_admin_auth");
        if (auth === "true") {
            router.push("/admin/dashboard");
        } else {
            router.push("/admin/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-[#080B12] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
    );
}
