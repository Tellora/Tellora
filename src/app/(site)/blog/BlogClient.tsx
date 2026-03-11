"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageHeader";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag, Search } from "lucide-react";

const blogPosts = [
    {
        title: "The Future of SEO: AI-Driven Search Optimization in 2026",
        excerpt: "Discover how large language models are fundamentally changing the search landscape and how to stay ahead of the curve.",
        category: "SEO Strategy",
        date: "March 15, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Scaling Paid Ads: Why Most Agencies Fail at High Spend",
        excerpt: "Learn the scientific approach to scaling Meta and Google campaigns without breaking your target CPA benchmarks.",
        category: "Paid Performance",
        date: "March 10, 2026",
        readTime: "12 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "3D Web Experiences: The New Standard for Landing Pages",
        excerpt: "Why static websites are becoming obsolete and how Three.js is driving conversion increases across high-tech industries.",
        category: "Web Design",
        date: "March 05, 2026",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "Content That Converts: Beyond The SEO Keyword",
        excerpt: "Stop writing for bots and start architecting content that addresses actual buyer friction points in the decision cycle.",
        category: "Content Strategy",
        date: "March 01, 2026",
        readTime: "10 min read",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
    }
];

export default function BlogPage() {
    return (
        <div className="bg-white text-text-main min-h-screen relative overflow-x-hidden font-sans">
            <Header />

            <main>
                <PageHeader
                    breadcrumb="Growth Insights"
                    title="The Growth Lab"
                    subtitle="Deep dives into the strategies, technologies, and data-points driving the world's fastest growing digital brands."
                />

                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        {/* Featured Post */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group relative rounded-[4rem] overflow-hidden bg-slate-50 border border-slate-100 mb-24 grid lg:grid-cols-2 gap-0 shadow-2xl shadow-slate-200/50 hover:shadow-primary/5 transition-all duration-700"
                        >
                            <div className="h-full min-h-[500px] overflow-hidden relative">
                                <img
                                    src={blogPosts[0].image}
                                    alt="Featured"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 to-transparent"></div>
                            </div>
                            <div className="p-12 md:p-20 flex flex-col justify-center bg-white">
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="px-5 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20">Featured</span>
                                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <Calendar size={12} className="text-primary" /> {blogPosts[0].date}
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-6xl font-heading font-black text-text-main mb-8 leading-tight group-hover:text-primary transition-colors duration-500">
                                    {blogPosts[0].title}
                                </h2>
                                <p className="text-text-muted text-lg mb-10 leading-relaxed font-medium line-clamp-3">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-10">
                                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <Clock size={12} className="text-primary" /> {blogPosts[0].readTime}
                                    </div>
                                    <a href="#" className="font-black text-text-main uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 group/link hover:text-primary transition-all duration-300">
                                        Read Analysis <ArrowRight size={16} className="group-hover/link:translate-x-3 transition-transform duration-500" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-20 bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/30">
                            <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-6 md:pb-0 scrollbar-hide">
                                {["All", "SEO Strategy", "Paid Performance", "Creative", "Growth Lab"].map((cat) => (
                                    <button key={cat} className="whitespace-nowrap px-8 py-3 rounded-2xl bg-white border border-slate-100 hover:border-primary text-slate-400 hover:text-primary hover:shadow-md transition-all text-[10px] font-black uppercase tracking-widest">
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="relative w-full md:w-96 group">
                                <input
                                    type="text"
                                    placeholder="Search growth lab..."
                                    className="w-full bg-white border border-slate-100 rounded-2xl px-8 py-4 text-text-main font-medium placeholder:text-slate-300 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/5 transition-all text-sm group-hover:border-slate-200"
                                />
                                <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-hover:text-primary transition-colors duration-300" />
                            </div>
                        </div>

                        {/* Blog Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {blogPosts.slice(1).map((post, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col h-full bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden hover:border-primary transition-all duration-500 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10"
                                >
                                    <div className="aspect-[16/11] overflow-hidden relative">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest shadow-lg">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-center gap-3 mb-6">
                                            <Clock size={12} className="text-primary" />
                                            <span className="text-slate-600 text-[10px] uppercase font-black tracking-widest">{post.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-text-main mb-6 font-heading leading-tight group-hover:text-primary transition-colors flex-grow">
                                            {post.title}
                                        </h3>
                                        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-slate-600 text-[10px] font-black tracking-widest uppercase">{post.date}</span>
                                            <a href="#" className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-text-main hover:bg-primary hover:border-primary hover:text-white transition-all duration-500 hover:shadow-lg hover:shadow-primary/30 group/btn hover:-translate-y-1">
                                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
