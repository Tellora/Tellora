"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Globe, Shield, Link as LinkIcon, AlertTriangle,
    Save, Check, Lock, Database, Trash2, ShieldAlert
} from "lucide-react";
import { getSettings, saveSettings, SiteSettings } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("Profile");
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [settings, setSettings] = useState<SiteSettings | null>(null);

    // Profile State (Mocked since we use Supabase Auth but might not have profile update methods implemented)
    const [profileName, setProfileName] = useState("Administrator");
    const [profileEmail, setProfileEmail] = useState("admin@tellora.com");

    // Security State
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");

    // Integrations State
    const [googleAnalyticsId, setGoogleAnalyticsId] = useState("UA-XXXXXXXXX-X");
    const [metaPixelId, setMetaPixelId] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");

    useEffect(() => {
        getSettings().then(setSettings);
    }, []);

    if (!settings) return null;

    const update = (patch: Partial<SiteSettings>) => setSettings((prev) => prev ? { ...prev, ...patch } : prev);

    const handleSave = async () => {
        setIsSaving(true);
        if (settings) {
            await saveSettings(settings);
        }
        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handlePasswordChange = async () => {
        setPwError("");
        setPwSuccess("");
        if (newPassword.length < 6) {
            setPwError("New password must be at least 6 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwError("Passwords do not match.");
            return;
        }
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setPwSuccess("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setPwSuccess(""), 4000);
        } catch (e: any) {
            setPwError(e.message || "Failed to update password");
        }
    };

    const handleClearCache = () => {
        if (window.confirm("Are you sure you want to clear the local browser cache? This will log you out if sessions are stored locally.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    const tabs = [
        { id: "Profile", label: "Profile Settings", icon: User },
        { id: "Brand", label: "Brand & Site", icon: Globe },
        { id: "Integrations", label: "Integrations", icon: LinkIcon },
        { id: "Security", label: "Security", icon: Shield },
        { id: "System", label: "System", icon: Database },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Settings</h1>
                    <p className="text-white/50 text-sm mt-2">Manage your account settings, integrations, and global site preferences.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                    {isSaving ? <span className="animate-spin text-lg">↻</span> : saved ? <Check size={18} /> : <Save size={18} />}
                    {isSaving ? "Saving..." : saved ? "Saved" : "Save Changes"}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 shrink-0">
                    <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${isActive
                                        ? "bg-primary text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon size={18} className={isActive ? "text-white" : "text-white/50"} />
                                    <span className="font-medium text-sm">{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 bg-[#0D121F]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Profile Tab */}
                            {activeTab === "Profile" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Profile Details</h2>
                                        <p className="text-white/50 text-sm mt-1">Update your personal information and how you appear in the admin panel.</p>
                                    </div>
                                    <div className="grid gap-6 max-w-2xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Full Name</label>
                                            <input
                                                type="text"
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Email Address</label>
                                            <input
                                                type="email"
                                                value={profileEmail}
                                                onChange={(e) => setProfileEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Brand & Site Tab */}
                            {activeTab === "Brand" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Brand & SEO</h2>
                                        <p className="text-white/50 text-sm mt-1">Manage global site appearance and search engine optimization parameters.</p>
                                    </div>
                                    <div className="grid gap-6 max-w-2xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Site Title</label>
                                            <input
                                                type="text"
                                                value={settings.site_title || ""}
                                                onChange={(e) => update({ site_title: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Meta Description</label>
                                            <textarea
                                                rows={3}
                                                value={settings.meta_description || ""}
                                                onChange={(e) => update({ meta_description: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Brand Primary Color</label>
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="color"
                                                    value={settings.brand_accent || "#4ac0e4"}
                                                    onChange={(e) => update({ brand_accent: e.target.value })}
                                                    className="w-12 h-12 rounded-xl bg-transparent cursor-pointer border-none"
                                                />
                                                <input
                                                    type="text"
                                                    value={settings.brand_accent || "#4ac0e4"}
                                                    onChange={(e) => update({ brand_accent: e.target.value })}
                                                    className="w-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all uppercase"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Integrations Tab */}
                            {activeTab === "Integrations" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Integrations</h2>
                                        <p className="text-white/50 text-sm mt-1">Connect third-party services and social links to your website.</p>
                                    </div>
                                    <div className="grid gap-6 max-w-2xl">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Google Analytics ID</label>
                                            <input
                                                type="text"
                                                value={googleAnalyticsId}
                                                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                                                placeholder="G-XXXXXXXXXX"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Meta Pixel ID</label>
                                            <input
                                                type="text"
                                                value={metaPixelId}
                                                onChange={(e) => setMetaPixelId(e.target.value)}
                                                placeholder="XXXXXXXXXXXXXXX"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-white/80">Company LinkedIn URL</label>
                                            <input
                                                type="url"
                                                value={linkedinUrl}
                                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                                placeholder="https://linkedin.com/company/tellora"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Security Tab */}
                            {activeTab === "Security" && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Security & Access</h2>
                                        <p className="text-white/50 text-sm mt-1">Update your authentication credentials to keep your account secure.</p>
                                    </div>
                                    <div className="grid gap-6 max-w-2xl p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                        <h3 className="text-base font-medium text-white flex items-center gap-2">
                                            <Lock size={16} className="text-primary" /> Update Password
                                        </h3>
                                        
                                        {pwError && <p className="text-red-400 text-sm font-medium">{pwError}</p>}
                                        {pwSuccess && <p className="text-green-400 text-sm font-medium">{pwSuccess}</p>}

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm text-white/70">New Password</label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm text-white/70">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all"
                                                />
                                            </div>
                                            <button
                                                onClick={handlePasswordChange}
                                                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all mt-2"
                                            >
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* System Tab */}
                            {activeTab === "System" && (
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">System Configuration</h2>
                                        <p className="text-white/50 text-sm mt-1">Advanced settings for maintenance and data persistence.</p>
                                    </div>
                                    
                                    <div className="grid gap-4 max-w-3xl">
                                        {/* Maintenance Mode */}
                                        <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                            <div>
                                                <h3 className="text-base font-medium text-white flex items-center gap-2">
                                                    Maintenance Mode
                                                </h3>
                                                <p className="text-sm text-white/50 mt-1">Hide the public site and show a maintenance page to visitors.</p>
                                            </div>
                                            <button
                                                onClick={() => update({ stealth_mode: !settings.stealth_mode })}
                                                className={`relative w-14 h-8 rounded-full transition-colors ${settings.stealth_mode ? "bg-primary" : "bg-white/20"}`}
                                            >
                                                <motion.div
                                                    animate={{ x: settings.stealth_mode ? 24 : 4 }}
                                                    className="absolute top-1 bottom-1 w-6 bg-white rounded-full shadow-sm"
                                                />
                                            </button>
                                        </div>

                                        {/* Database / Supabase */}
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                                            <h3 className="text-base font-medium text-white flex items-center gap-2">
                                                Database Settings (Supabase)
                                            </h3>
                                            <div className="space-y-4 pt-2">
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/70">Project URL</label>
                                                    <input
                                                        type="text"
                                                        value={settings.supabase_url || ""}
                                                        onChange={(e) => update({ supabase_url: e.target.value })}
                                                        placeholder="https://your-project.supabase.co"
                                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-mono text-sm"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-white/70">Anon Key</label>
                                                    <input
                                                        type="password"
                                                        value={settings.supabase_anon_key || ""}
                                                        onChange={(e) => update({ supabase_anon_key: e.target.value })}
                                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-mono text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl space-y-4 mt-4">
                                            <h3 className="text-base font-medium text-red-400 flex items-center gap-2">
                                                <ShieldAlert size={18} /> Danger Zone
                                            </h3>
                                            <p className="text-sm text-white/50">Irreversible actions that affect your entire workspace.</p>
                                            
                                            <div className="flex gap-4 pt-2">
                                                <button
                                                    onClick={handleClearCache}
                                                    className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-sm font-medium transition-all border border-red-500/20 hover:border-red-500/40"
                                                >
                                                    <Trash2 size={16} />
                                                    Clear Local Cache
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
