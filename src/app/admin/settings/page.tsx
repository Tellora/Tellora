"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings, Palette, Globe, Shield, Bell, Database, Code,
    Save, RotateCcw, Sparkles, Zap, Lock, Cpu, Fingerprint,
    Check, Terminal, Eye, EyeOff, Monitor, ShieldCheck,
    HardDrive, Activity, Signal, RefreshCw, Network, Plus, X, AlertTriangle
} from "lucide-react";
import { getSettings, saveSettings, SiteSettings } from "@/lib/store";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("Brand Identity");
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");
    const [newKeyword, setNewKeyword] = useState("");
    const [rollbackConfirm, setRollbackConfirm] = useState(false);

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    if (!settings) return null;

    const update = (patch: Partial<SiteSettings>) => setSettings((prev) => prev ? { ...prev, ...patch } : prev);

    const handleSave = () => {
        setIsSaving(true);
        saveSettings(settings);
        setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1200);
    };

    const handlePasswordChange = () => {
        setPwError("");
        setPwSuccess("");
        if (currentPassword !== settings.adminPassword) {
            setPwError("Current password is incorrect.");
            return;
        }
        if (newPassword.length < 6) {
            setPwError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwError("Passwords do not match.");
            return;
        }
        update({ adminPassword: newPassword });
        saveSettings({ ...settings, adminPassword: newPassword });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPwSuccess("Password changed successfully!");
        setTimeout(() => setPwSuccess(""), 4000);
    };

    const handleRollback = () => {
        if (!rollbackConfirm) { setRollbackConfirm(true); return; }
        localStorage.clear();
        window.location.reload();
    };

    const addKeyword = () => {
        if (!newKeyword.trim()) return;
        update({ keywords: [...settings.keywords, newKeyword.trim()] });
        setNewKeyword("");
    };

    const removeKeyword = (i: number) => update({ keywords: settings.keywords.filter((_, idx) => idx !== i) });

    const tabs = [
        { name: "Brand Identity", icon: Palette },
        { name: "Global SEO", icon: Globe },
        { name: "System Access", icon: Shield },
        { name: "Data Matrix", icon: Database },
        { name: "Core Engine", icon: Cpu },
    ];

    return (
        <div className="space-y-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div>
                    <div className="flex items-center gap-3 mb-3">
                        <Terminal size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Core Configuration Protocol</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic leading-none">
                        System <span className="text-primary italic">Parameters</span>
                    </h1>
                    <p className="text-white/30 font-medium text-sm mt-6 tracking-wide max-w-xl italic border-l-2 border-primary/20 pl-8 py-2">
                        Manage site settings, SEO, admin access, and data persistence.
                    </p>
                </div>
                <div className="flex gap-6">
                    <button
                        onClick={handleRollback}
                        className={`flex items-center gap-4 px-10 py-6 border rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 ${rollbackConfirm ? "bg-red-500/10 border-red-500/30 text-red-400" : "border-white/10 text-white/30 hover:text-white hover:bg-white/5"}`}
                    >
                        {rollbackConfirm ? <AlertTriangle size={18} /> : <RotateCcw size={18} />}
                        {rollbackConfirm ? "Confirm Reset" : "Factory Reset"}
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-4 px-14 py-6 bg-primary text-white rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] hover:shadow-[0_20px_40px_rgba(74,192,228,0.4)] transition-all active:scale-95 disabled:opacity-50 group"
                    >
                        {isSaving ? <RefreshCw size={18} className="animate-spin" /> : saved ? <Check size={18} /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
                        {isSaving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
                    </button>
                </div>
            </div>

            {saved && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-6 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center gap-4">
                    <Check size={20} className="text-green-400" />
                    <p className="text-green-400 font-black uppercase tracking-widest text-[11px]">Settings committed to memory successfully.</p>
                </motion.div>
            )}

            <div className="grid lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center justify-between p-8 rounded-[2.5rem] transition-all group relative overflow-hidden ${activeTab === tab.name
                                    ? "bg-primary text-white shadow-3xl shadow-primary/30"
                                    : "bg-[#0D121F]/60 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-primary/20"
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                <tab.icon size={22} className={activeTab === tab.name ? "text-white" : "group-hover:text-primary transition-colors"} />
                                <span className="text-[12px] font-black uppercase tracking-[0.3em] italic">{tab.name}</span>
                            </div>
                            {activeTab === tab.name && (
                                <motion.div layoutId="tab-dot" className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_white]" />
                            )}
                        </button>
                    ))}

                    <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                        <div className="flex items-center gap-4 mb-6">
                            <Activity size={16} className="text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">System Status</span>
                        </div>
                        <div className="space-y-4">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div animate={{ width: "97%" }} className="h-full bg-primary" />
                            </div>
                            <span className="block text-[10px] font-black text-white/20 uppercase tracking-[0.2em] italic">All Systems Operational</span>
                        </div>
                    </div>
                </div>

                {/* Content Pane */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#0D121F]/60 backdrop-blur-3xl border border-white/10 rounded-[5rem] p-16 relative overflow-hidden min-h-[600px]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-14 pb-14 border-b border-white/5">
                                <div className="flex items-center gap-10">
                                    <div className="w-20 h-20 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        {(() => { const Icon = tabs.find(t => t.name === activeTab)?.icon; return Icon ? <Icon size={40} /> : null; })()}
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-black text-white italic tracking-tighter">{activeTab}</h2>
                                        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 mt-2 italic">Live Configuration Panel</p>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-full border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 font-mono">LIVE</span>
                                </div>
                            </div>

                            <div className="space-y-16">
                                {/* Brand Identity */}
                                {activeTab === "Brand Identity" && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Site Display Name</label>
                                            <input
                                                value={settings.siteTitle}
                                                onChange={(e) => update({ siteTitle: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white font-black italic text-2xl outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Brand Accent Color</label>
                                            <div className="flex items-center gap-6 p-3 bg-white/5 rounded-[2.5rem] border border-white/10 group/color hover:border-primary/40 transition-all">
                                                <input
                                                    type="color"
                                                    value={settings.brandAccent}
                                                    onChange={(e) => update({ brandAccent: e.target.value })}
                                                    className="w-20 h-20 rounded-[2rem] border-none cursor-pointer bg-transparent shrink-0"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.brandAccent}
                                                    onChange={(e) => update({ brandAccent: e.target.value })}
                                                    className="flex-1 bg-transparent border-none text-white font-mono text-xl uppercase outline-none px-6 italic font-black"
                                                />
                                            </div>
                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest italic ml-2">
                                                Note: Refresh admin panel after saving to see color changes apply.
                                            </p>
                                        </div>
                                        <div className="p-12 bg-primary/5 border border-primary/10 rounded-[4rem] flex items-center gap-10">
                                            <div className="w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-3xl shrink-0" style={{ background: settings.brandAccent }}>
                                                <Sparkles size={40} className="text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-black text-white mb-2 italic">Brand Preview</h4>
                                                <p className="text-white/50 text-sm italic">{settings.siteTitle}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest mt-3 italic" style={{ color: settings.brandAccent }}>
                                                    Accent: {settings.brandAccent}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Global SEO */}
                                {activeTab === "Global SEO" && (
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Page Title (shown in browser tab)</label>
                                            <input
                                                value={settings.siteTitle}
                                                onChange={(e) => update({ siteTitle: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-white font-black italic text-2xl outline-none focus:border-primary transition-all"
                                            />
                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest ml-2 italic">
                                                Character count: {settings.siteTitle.length}/70
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Meta Description</label>
                                            <textarea
                                                rows={4}
                                                value={settings.metaDescription}
                                                onChange={(e) => update({ metaDescription: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-[3rem] p-10 text-white font-medium outline-none resize-none focus:border-primary transition-all italic text-lg"
                                            />
                                            <p className="text-[10px] text-white/20 font-black uppercase tracking-widest ml-2 italic">
                                                Character count: {settings.metaDescription.length}/160
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">SEO Keywords</label>
                                            <div className="flex flex-wrap gap-4 p-8 bg-white/5 border border-white/10 rounded-[3.5rem]">
                                                {settings.keywords.map((k, i) => (
                                                    <div key={i} className="flex items-center gap-2 px-6 py-3 bg-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border border-primary/20">
                                                        {k}
                                                        <button type="button" onClick={() => removeKeyword(i)} className="hover:text-white transition-colors ml-1">
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        value={newKeyword}
                                                        onChange={(e) => setNewKeyword(e.target.value)}
                                                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
                                                        placeholder="Add keyword..."
                                                        className="bg-transparent outline-none text-white font-black text-[11px] uppercase tracking-widest italic placeholder:text-white/20 w-40"
                                                    />
                                                    <button type="button" onClick={addKeyword} className="text-primary hover:text-white transition-all">
                                                        <Plus size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* System Access */}
                                {activeTab === "System Access" && (
                                    <div className="space-y-12">
                                        {/* Stealth Mode */}
                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div
                                                className={`p-10 rounded-[4rem] border transition-all cursor-pointer ${settings.stealthMode ? "bg-red-500/10 border-red-500/20" : "bg-white/5 border-white/10 hover:border-primary/30"}`}
                                                onClick={() => update({ stealthMode: !settings.stealthMode })}
                                            >
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${settings.stealthMode ? "bg-red-500 text-white" : "bg-white/10 text-white/40"}`}>
                                                        <ShieldCheck size={32} />
                                                    </div>
                                                    <div className={`w-14 h-7 rounded-full relative transition-all p-1 ${settings.stealthMode ? "bg-red-500" : "bg-white/10"}`}>
                                                        <motion.div animate={{ x: settings.stealthMode ? 28 : 0 }} className="w-5 h-5 rounded-full bg-white shadow-xl" />
                                                    </div>
                                                </div>
                                                <h4 className="text-xl font-black text-white italic">Maintenance Mode</h4>
                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-3 italic">
                                                    Shows maintenance page to site visitors.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Change Password */}
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60 ml-2 italic">Change Admin Password</h4>
                                            {pwError && (
                                                <p className="text-red-400 text-[11px] font-black uppercase tracking-widest">{pwError}</p>
                                            )}
                                            {pwSuccess && (
                                                <p className="text-green-400 text-[11px] font-black uppercase tracking-widest">{pwSuccess}</p>
                                            )}
                                            <div className="space-y-4">
                                                {[
                                                    { label: "Current Password", value: currentPassword, onChange: (v: string) => setCurrentPassword(v) },
                                                    { label: "New Password", value: newPassword, onChange: (v: string) => setNewPassword(v) },
                                                    { label: "Confirm New Password", value: confirmPassword, onChange: (v: string) => setConfirmPassword(v) },
                                                ].map((field, fi) => (
                                                    <div key={fi} className="relative">
                                                        <label className="text-[9px] font-black uppercase tracking-widest text-primary italic block mb-2">{field.label}</label>
                                                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-primary transition-all">
                                                            <input
                                                                type={showPw ? "text" : "password"}
                                                                value={field.value}
                                                                onChange={(e) => field.onChange(e.target.value)}
                                                                className="flex-1 bg-transparent p-5 text-white font-medium outline-none"
                                                                placeholder="••••••••"
                                                            />
                                                            {fi === 0 && (
                                                                <button type="button" onClick={() => setShowPw(!showPw)} className="px-5 text-white/30 hover:text-white transition-colors">
                                                                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={handlePasswordChange}
                                                    className="w-full py-5 bg-primary/20 border border-primary/30 text-primary font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Data Matrix */}
                                {activeTab === "Data Matrix" && (
                                    <div className="space-y-12">
                                        <div className="grid md:grid-cols-3 gap-8">
                                            {[
                                                { label: "Neural Cache", key: "neuralCache" as const, icon: Cpu },
                                                { label: "Auto Optimization", key: "autoOptimization" as const, icon: Zap },
                                                { label: "Deep Link Sync", key: "deepLinkSync" as const, icon: Network },
                                            ].map((sensor, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => update({ [sensor.key]: !settings[sensor.key] })}
                                                    className={`p-10 rounded-[3.5rem] border transition-all cursor-pointer ${settings[sensor.key] ? "bg-primary/10 border-primary/40" : "bg-white/5 border-white/10 opacity-50"}`}
                                                >
                                                    <div className="flex justify-between items-start mb-8">
                                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${settings[sensor.key] ? "bg-primary text-white" : "bg-white/10 text-white/40"}`}>
                                                            <Database size={24} />
                                                        </div>
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${settings[sensor.key] ? "bg-primary/20 text-primary" : "bg-white/10 text-white/10"}`}>
                                                            <Check size={16} />
                                                        </div>
                                                    </div>
                                                    <h4 className="text-xl font-black text-white italic tracking-tighter">{sensor.label}</h4>
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-3 italic">{settings[sensor.key] ? "ACTIVE" : "INACTIVE"}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-12 bg-[#080B12] border border-white/5 rounded-[4rem]">
                                            <div className="flex items-center gap-8 mb-10">
                                                <div className="w-14 h-14 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-400/20">
                                                    <HardDrive size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-2xl font-black text-white italic">Local Storage Usage</h4>
                                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">All data stored in browser storage</p>
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                {[
                                                    { label: "Messages (Inbox)", key: "tellora_inbox_messages" },
                                                    { label: "Services", key: "tellora_services_v2" },
                                                    { label: "Case Studies", key: "tellora_case_studies_v2" },
                                                    { label: "Reels", key: "tellora_reels_v2" },
                                                    { label: "Settings", key: "tellora_site_settings" },
                                                ].map((store, i) => {
                                                    const raw = typeof window !== "undefined" ? localStorage.getItem(store.key) : null;
                                                    const count = raw ? JSON.parse(raw).length || 1 : 0;
                                                    const val = Math.min(count * 12, 100);
                                                    return (
                                                        <div key={i}>
                                                            <div className="flex justify-between mb-2 px-1">
                                                                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">{store.label}</span>
                                                                <span className="text-[10px] font-black text-primary italic">{count} record{count !== 1 ? "s" : ""}</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(val + 10, 95)}%` }} className="h-full bg-primary shadow-[0_0_10px_rgba(74,192,228,0.5)]" transition={{ duration: 1, delay: i * 0.1 }} />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Core Engine */}
                                {activeTab === "Core Engine" && (
                                    <div className="space-y-12">
                                        <div className="bg-[#080B12] rounded-[4rem] p-12 border border-white/5 font-mono">
                                            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                                                <div className="flex items-center gap-4 text-primary">
                                                    <Monitor size={18} />
                                                    <span className="text-[11px] font-black uppercase tracking-widest">TELLORA_KERNEL_SHELL</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                                                    <div className="w-3 h-3 rounded-full bg-orange-400/50" />
                                                    <div className="w-3 h-3 rounded-full bg-green-400/50" />
                                                </div>
                                            </div>
                                            <div className="space-y-4 text-[12px] font-bold leading-relaxed">
                                                <p className="text-primary italic">{`>`} INITIALIZING_CORE_DIAGNOSTICS...</p>
                                                <p className="text-white/40 italic"> [SYSTEM] Reading site settings from LocalStorage... {settings ? "OK" : "FAIL"}</p>
                                                <p className="text-white/40 italic"> [SYSTEM] Admin password: {settings.adminPassword ? "SET" : "DEFAULT"}</p>
                                                <p className="text-white/40 italic"> [SYSTEM] Neural cache: {settings.neuralCache ? "ENABLED" : "DISABLED"}</p>
                                                <p className="text-white/40 italic"> [SYSTEM] Auto-optimization: {settings.autoOptimization ? "ENABLED" : "DISABLED"}</p>
                                                <p className="text-green-400 italic">{`>`} KERNEL_STABLE: All systems nominal.</p>
                                                <p className="text-primary animate-pulse italic">{`>`} Awaiting command_</p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10">
                                            <button
                                                type="button"
                                                onClick={() => { localStorage.removeItem("tellora_activity_logs"); alert("Activity log cleared."); }}
                                                className="p-10 border border-white/10 rounded-[3.5rem] bg-white/5 hover:bg-white/10 transition-all flex items-center gap-8 group/btn text-left"
                                            >
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary group-hover/btn:rotate-12 transition-all border border-primary/20">
                                                    <Signal size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-white italic">Flush Activity Log</h4>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-2">Clear recent dashboard events.</p>
                                                </div>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                className="p-10 border border-primary/20 rounded-[3.5rem] bg-primary/5 hover:bg-primary/10 transition-all flex items-center gap-8 group/btn text-left"
                                            >
                                                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center text-primary shadow-inner border border-primary/20 group-hover/btn:scale-110 transition-all">
                                                    <Zap size={32} />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-white italic">Force Sync</h4>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mt-2">Commit all settings immediately.</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
