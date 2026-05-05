"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCompanyStats, CompanyStat } from "@/lib/store";
import { TrendingUp, Users, Target, Zap } from "lucide-react";

export default function StatsStrip() {
    const [stats, setStats] = useState<CompanyStat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getCompanyStats();
            if (data && data.length > 0) {
                setStats(data);
            } else {
                // Fallback to high-impact success metrics if table is empty or missing
                setStats([
                    { value: "8.4x", label: "Average ROAS", color: "#A855F7" },
                    { value: "240%", label: "Lead Growth", color: "#22C55E" },
                    { value: "Global", label: "Market Scale", color: "#F3E84A" }
                ]);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    if (loading || stats.length === 0) return null;

    return (
        <section className="relative z-20 -mt-12 md:-mt-16 mb-24 pointer-events-none">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 pointer-events-auto items-stretch">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white p-4 md:p-10 brutalist-border shadow-[4px_4px_0px_#000] hover:shadow-[10px_10px_0px_#000] group/stat hover:-translate-y-1 transition-all h-full flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-black opacity-30 group-hover/stat:opacity-100 transition-opacity">
                                    {i === 0 ? <TrendingUp className="w-4 h-4 md:w-5 md:h-5" /> : i === 1 ? <Users className="w-4 h-4 md:w-5 md:h-5" /> : <Target className="w-4 h-4 md:w-5 md:h-5" />}
                                </div>
                                <div className="p-1.5 md:p-2 bg-primary/5 rounded-lg group-hover/stat:bg-primary/10 transition-colors">
                                    <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary fill-current" />
                                </div>
                            </div>
                            
                            <h4 
                                className="text-xl md:text-5xl font-heading font-black mb-1 md:mb-2 tracking-tighter"
                                style={{ color: stat.color }}
                            >
                                {stat.value}
                            </h4>
                            <p className="font-black text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-black/40 group-hover/stat:text-black transition-colors leading-tight">
                                {stat.label}
                            </p>
                            
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/[0.02] to-transparent pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
