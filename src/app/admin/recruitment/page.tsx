"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Edit2,
    Briefcase,
    Users,
    ArrowRight,
    X,
    Filter,
    CheckCircle2,
    Download,
    Mail,
    FileText,
    Calendar,
    MapPin,
    Clock,
    Eye,
    ChevronRight,
    Archive
} from "lucide-react";
import { getAdminData, saveAdminData } from "@/lib/serverDb";

export default function RecruitmentAdmin() {
    const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
    const [jobs, setJobs] = useState<any[]>([]);
    const [applications, setApplications] = useState<any[]>([]);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [viewingApp, setViewingApp] = useState<any>(null);

    // Load data
    const loadData = async () => {
        const storedJobs = await getAdminData("recruitment_jobs", []);
        if (storedJobs.length > 0) setJobs(storedJobs);
        else {
            const initialJobs = [
                { id: 1, title: "Creative Director", department: "Design", location: "Remote", type: "Full-time", status: "Published", description: "Lead our creative vision...", requirements: "8+ years experience...", benefits: "Health, Equity, Remote-first" },
                { id: 2, title: "Senior Performance Engineer", department: "Engineering", location: "Global (Remote)", type: "Contract", status: "Published", description: "Optimize web performance...", requirements: "Deep knowledge of Next.js...", benefits: "Competitive pay, flexible hours" }
            ];
            setJobs(initialJobs);
        }

        const storedApps = await getAdminData("recruitment_apps", []);
        if (storedApps.length > 0) setApplications(storedApps);
        else {
            const initialApps = [
                { id: 1, jobId: 1, jobTitle: "Creative Director", candidateName: "Alex Rivera", candidateEmail: "alex@example.com", resumeUrl: "/demo-resume.pdf", coverLetter: "I've been following Tellora for years...", status: "In Review", date: "2026-03-05" },
                { id: 2, jobId: 1, jobTitle: "Creative Director", candidateName: "Sarah Chen", candidateEmail: "sarah@design.io", resumeUrl: "/resume-sarah.pdf", coverLetter: "My portfolio speaks for itself...", status: "Interviewed", date: "2026-03-07" }
            ];
            setApplications(initialApps);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Sync helpers
    const saveJobs = async (newJobs: any[]) => {
        setJobs(newJobs);
        await saveAdminData("recruitment_jobs", newJobs);
    };

    const saveApps = async (newApps: any[]) => {
        setApplications(newApps);
        await saveAdminData("recruitment_apps", newApps);
    };

    const helperRecordActivity = async (action: string, item: string) => {
        const logs = await getAdminData('tellora_activity_logs', []);
        const newLog = {
            id: Date.now().toString(),
            type: action.toLowerCase(),
            item: item,
            user: "Talent Ops",
            time: "Just Now",
            status: "Updated"
        };
        await saveAdminData('tellora_activity_logs', [newLog, ...logs].slice(0, 5));
    };

    const handleSaveJob = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const jobData = {
            title: formData.get('title'),
            department: formData.get('department'),
            location: formData.get('location'),
            type: formData.get('type'),
            status: formData.get('status'),
            description: formData.get('description'),
            requirements: formData.get('requirements'),
            benefits: formData.get('benefits'),
        };

        if (editingJob) {
            const updated = jobs.map(j => j.id === editingJob.id ? { ...j, ...jobData } : j);
            await saveJobs(updated);
            await helperRecordActivity('Update', `Job: ${jobData.title}`);
        } else {
            const newJob = { id: Date.now(), ...jobData };
            await saveJobs([...jobs, newJob]);
            await helperRecordActivity('Create', `Job: ${jobData.title}`);
        }
        setIsJobModalOpen(false);
        setEditingJob(null);
    };

    const handleDeleteJob = async (id: number) => {
        if (confirm("Permanently archive this opportunity node?")) {
            const job = jobs.find(j => j.id === id);
            await saveJobs(jobs.filter(j => j.id !== id));
            await helperRecordActivity('Archive', `Job: ${job?.title}`);
        }
    };

    const handleUpdateAppStatus = async (appId: number, status: string) => {
        const updated = applications.map(a => a.id === appId ? { ...a, status } : a);
        await saveApps(updated);
        const app = applications.find(a => a.id === appId);
        await helperRecordActivity('Update', `Candidate ${app?.candidateName} -> ${status}`);
    };

    return (
        <div className="space-y-8 md:space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={14} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Talent Acquisition</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">Recruitment <span className="text-primary text-3xl sm:text-4xl font-black tracking-tighter italic">Engine</span></h1>
                    <p className="text-white/40 font-medium text-xs sm:text-sm mt-1">Manage global opportunities and candidate flow.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }}
                        className="w-full md:w-auto flex justify-center items-center gap-2 md:gap-3 px-6 md:px-8 py-4 bg-primary text-white rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:shadow-[0_8px_25px_rgba(74,192,228,0.4)] transition-all active:scale-95"
                    >
                        <Plus size={16} className="md:w-4 md:h-4" /> Open New Role
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-full sm:w-fit">
                <button
                    onClick={() => setActiveTab("jobs")}
                    className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "jobs" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                >
                    Job Postings
                </button>
                <button
                    onClick={() => setActiveTab("applications")}
                    className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === "applications" ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                >
                    Applications ({applications.length})
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-[#0D121F]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === "jobs" ? (
                        <motion.div
                            key="jobs-tab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="p-4 md:p-8"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                {jobs.map((job) => (
                                    <div key={job.id} className="group bg-white/5 border border-white/5 rounded-3xl md:rounded-[2rem] p-6 md:p-8 hover:border-primary/20 transition-all">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                                                    <Briefcase size={20} className="md:w-6 md:h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg md:text-xl font-black text-white italic">{job.title}</h3>
                                                    <p className="text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">{job.department} • {job.location}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 md:px-4 py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border ${job.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-white/30 border-white/5'}`}>
                                                {job.status}
                                            </span>
                                        </div>

                                        <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
                                            <div className="flex items-center gap-1.5 md:gap-2 text-white/40 text-[9px] md:text-[10px] font-black uppercase">
                                                <Clock size={12} /> {job.type}
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2 text-white/40 text-[9px] md:text-[10px] font-black uppercase hidden xs:flex">
                                                <MapPin size={12} /> {job.location}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 md:pt-6 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest">
                                                <Users size={14} />
                                                {applications.filter(a => a.jobId === job.id).length} Applicants
                                            </div>
                                            <div className="flex gap-2 md:gap-3">
                                                <button onClick={() => { setEditingJob(job); setIsJobModalOpen(true); }} className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl text-white/40 hover:text-white transition-all"><Edit2 size={16} className="w-4 h-4" /></button>
                                                <button onClick={() => handleDeleteJob(job.id)} className="p-2 md:p-3 bg-white/5 rounded-lg md:rounded-xl text-white/40 hover:text-red-400 transition-all"><Archive size={16} className="w-4 h-4" /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {jobs.length === 0 && (
                                    <div className="col-span-full py-20 text-center">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/10">
                                            <Briefcase size={40} />
                                        </div>
                                        <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">No active opportunity nodes</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="apps-tab"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="p-0 overflow-x-auto"
                        >
                            <table className="w-full text-left min-w-[650px]">
                                <thead>
                                    <tr className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/20 border-b border-white/5">
                                        <th className="p-4 md:p-8">Candidate</th>
                                        <th className="p-4 md:p-8 hidden sm:table-cell">Applied For</th>
                                        <th className="p-4 md:p-8">Status</th>
                                        <th className="p-4 md:p-8 hidden md:table-cell">Applied At</th>
                                        <th className="p-4 md:p-8 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="group hover:bg-white/[0.04] transition-all">
                                            <td className="p-4 md:p-8">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-black italic shrink-0">
                                                        {app.candidateName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-white italic text-sm md:text-base">{app.candidateName}</h4>
                                                        <p className="text-[9px] md:text-[10px] text-white/30 truncate max-w-[150px] md:max-w-none">{app.candidateEmail}</p>
                                                        <p className="sm:hidden text-[9px] font-black text-primary/60 uppercase tracking-widest mt-1 truncate max-w-[150px]">{app.jobTitle}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-8 hidden sm:table-cell">
                                                <span className="text-[9px] md:text-[11px] font-black text-primary/60 uppercase tracking-widest">{app.jobTitle}</span>
                                            </td>
                                            <td className="p-4 md:p-8">
                                                <select
                                                    value={app.status}
                                                    onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                                                    className="bg-white/5 border border-white/10 rounded-lg px-2 md:px-4 py-1.5 md:py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-primary transition-all cursor-pointer"
                                                >
                                                    <option value="New">New</option>
                                                    <option value="In Review">In Review</option>
                                                    <option value="Interviewed">Interviewed</option>
                                                    <option value="Offered">Offered</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </td>
                                            <td className="p-4 md:p-8 hidden md:table-cell">
                                                <div className="flex items-center gap-2 text-white/20 text-[10px] font-bold">
                                                    <Calendar size={12} /> {app.date}
                                                </div>
                                            </td>
                                            <td className="p-4 md:p-8 text-right">
                                                <button
                                                    onClick={() => setViewingApp(app)}
                                                    className="p-2 md:p-3 bg-primary text-white rounded-lg md:rounded-xl hover:shadow-[0_0_20px_rgba(74,192,228,0.4)] transition-all inline-block"
                                                >
                                                    <Eye size={16} className="md:w-[18px] md:h-[18px]" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {applications.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">Candidate queue empty</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Job Modal */}
            <AnimatePresence>
                {isJobModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-2xl bg-[#0D121F] border border-white/10 rounded-3xl md:rounded-[3rem] p-6 sm:p-10 md:p-12 relative overflow-hidden my-auto"
                        >
                            <form onSubmit={handleSaveJob} className="space-y-6 md:space-y-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter italic">{editingJob ? "Update Role" : "Open Opportunity"}</h2>
                                        <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/20 mt-1 md:mt-2">Opportunity Configuration</p>
                                    </div>
                                    <button onClick={() => setIsJobModalOpen(false)} type="button" className="p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl text-white/40 hover:text-white transition-all"><X size={20} className="w-4 h-4 md:w-5 md:h-5" /></button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Position Title</label>
                                        <input name="title" defaultValue={editingJob?.title} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium" placeholder="e.g. Lead Catalyst" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Department</label>
                                        <select name="department" defaultValue={editingJob?.department} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium appearance-none">
                                            <option value="Engineering">Engineering</option>
                                            <option value="Design">Design</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Strategy">Strategy</option>
                                            <option value="Operations">Operations</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Location</label>
                                        <input name="location" defaultValue={editingJob?.location} required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium" placeholder="Remote / City" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Type</label>
                                        <select name="type" defaultValue={editingJob?.type} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium appearance-none">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Freelance">Freelance</option>
                                            <option value="Internship">Internship</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Visibility Status</label>
                                        <select name="status" defaultValue={editingJob?.status || "Published"} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium appearance-none">
                                            <option value="Published">Published</option>
                                            <option value="Closed">Closed</option>
                                            <option value="Draft">Draft</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Impact Description</label>
                                    <textarea name="description" defaultValue={editingJob?.description} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium resize-none" placeholder="What will they build?"></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary italic">Core Requirements</label>
                                    <textarea name="requirements" defaultValue={editingJob?.requirements} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-primary transition-all font-medium resize-none" placeholder="Skills required..."></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    <button onClick={() => setIsJobModalOpen(false)} type="button" className="py-5 rounded-2xl border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                                    <button type="submit" className="py-5 rounded-2xl bg-primary text-white font-black text-[10px] uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/40 transition-all">Authorize Post</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Application View Modal */}
            <AnimatePresence>
                {viewingApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="w-full max-w-4xl bg-[#0D121F] border border-white/10 rounded-3xl md:rounded-[3rem] p-6 sm:p-10 md:p-16 relative overflow-hidden my-auto"
                        >
                            <div className="flex justify-between items-start mb-8 md:mb-12 gap-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-8">
                                    <div className="w-16 h-16 md:w-24 md:h-24 bg-primary/20 rounded-2xl md:rounded-[2rem] flex flex-shrink-0 items-center justify-center text-primary text-3xl md:text-4xl font-black italic">
                                        {viewingApp.candidateName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter italic">{viewingApp.candidateName}</h2>
                                        <div className="flex items-center gap-3 md:gap-4 mt-2">
                                            <span className="text-primary font-black text-[9px] md:text-[11px] uppercase tracking-widest truncate">{viewingApp.jobTitle}</span>
                                            <div className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                                            <span className="text-white/40 text-[9px] md:text-[11px] font-bold uppercase tracking-widest shrink-0">{viewingApp.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setViewingApp(null)} className="p-3 md:p-4 shrink-0 bg-white/5 rounded-xl md:rounded-2xl text-white/40 hover:text-white transition-all"><X size={20} className="md:w-6 md:h-6" /></button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                                <div className="md:col-span-2 space-y-8 md:space-y-10">
                                    <section>
                                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 md:mb-6 flex items-center gap-3">
                                            <FileText size={16} /> Cover Motivation
                                        </h3>
                                        <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5">
                                            <p className="text-white/70 leading-relaxed font-medium text-sm md:text-base">
                                                {viewingApp.coverLetter}
                                            </p>
                                        </div>
                                    </section>

                                    <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                                        <a href={viewingApp.resumeUrl} download className="flex-1 flex items-center justify-center gap-3 md:gap-4 bg-white text-black py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-all">
                                            <Download size={18} className="md:w-5 md:h-5" /> Download Resume
                                        </a>
                                        <a href={`mailto:${viewingApp.candidateEmail}`} className="flex items-center justify-center gap-3 md:gap-4 bg-white/5 border border-white/10 text-white px-6 md:px-10 py-4 md:py-6 rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all">
                                            <Mail size={18} className="md:w-5 md:h-5" /> Contact
                                        </a>
                                    </div>
                                </div>

                                <aside className="space-y-8 md:space-y-10">
                                    <div>
                                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 md:mb-6">Pipeline Status</h3>
                                        <div className="space-y-3">
                                            {["New", "In Review", "Interviewed", "Offered", "Rejected"].map((status) => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleUpdateAppStatus(viewingApp.id, status)}
                                                    className={`w-full p-4 md:p-5 rounded-xl md:rounded-2xl border text-[9px] md:text-[10px] font-black uppercase tracking-widest text-left transition-all flex justify-between items-center ${viewingApp.status === status ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                                                >
                                                    {status}
                                                    {viewingApp.status === status && <CheckCircle2 size={16} className="w-4 h-4 md:w-5 md:h-5" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-primary/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-primary/10">
                                        <h4 className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-3 md:mb-4">Submission Meta</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-white/40">Timestamp</span>
                                                <span className="text-white">{viewingApp.date}</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-white/40">ID Reference</span>
                                                <span className="text-white">#APP-{viewingApp.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
