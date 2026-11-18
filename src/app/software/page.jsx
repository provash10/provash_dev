"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
	Layers,
	ExternalLink,
	ArrowRight,
	Sparkles,
	CheckCircle2,
	Code2,
	Cpu,
	Zap,
	Search,
	ShieldCheck,
} from "lucide-react";
import { softwareProducts } from "@/data/softwareData";
import Footer from "@/components/HeaderFooter/Footer/Footer";

// software catalog page component
export default function SoftwareDirectoryPage() {
	// console.log("rendering software directory page")

	const [searchQuery, setSearchQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");

	const categories = [
		{ id: "all", label: "All Software" },
		{ id: "saas", label: "Enterprise SaaS" },
		{ id: "creator", label: "Creator & SMM" },
		{ id: "commerce", label: "E-Commerce & POS" },
		{ id: "health", label: "HealthTech" },
	];

	const filteredSoftware = softwareProducts.filter((item) => {
		const matchesSearch =
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.tagline.toLowerCase().includes(searchQuery.toLowerCase());

		if (activeCategory === "all") return matchesSearch;
		if (activeCategory === "saas") return matchesSearch && item.id.includes("erp");
		if (activeCategory === "creator")
			return matchesSearch && (item.id.includes("pulse") || item.id.includes("boost"));
		if (activeCategory === "commerce")
			return matchesSearch && (item.id.includes("commerce") || item.id.includes("resto"));
		if (activeCategory === "health") return matchesSearch && item.id.includes("medcare");

		return matchesSearch;
	});

	return (
		<div className="w-full min-h-screen bg-[#050b17] text-white">
			{/* page hero header */}
			<section className="w-full relative overflow-hidden bg-gradient-to-b from-[#071329] via-[#091b3a] to-slate-950 border-b border-slate-800/80 pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-semibold shadow-inner">
						<Sparkles className="w-4 h-4 text-cyan-400" />
						ENTERPRISE SOFTWARE SUITE • PRODUCTION DEMOS
					</div>

					<h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
						Proprietary Software &{" "}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300">
							SaaS Platforms
						</span>
					</h1>

					<p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
						Explore our full-featured production web software and SaaS systems deployed live on Vercel. Engineered with Next.js 16, React 19, Node.js, and PostgreSQL.
					</p>

					{/* search and filter controls */}
					<div className="pt-4 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
						<div className="relative w-full">
							<Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search software by name, category, or features..."
								className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-950/90 border border-cyan-500/40 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
							/>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-cyan-500/30">
							{categories.map((cat) => (
								<button
									key={cat.id}
									type="button"
									onClick={() => setActiveCategory(cat.id)}
									className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeCategory === cat.id
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									{cat.label}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* main software grid */}
			<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
					{filteredSoftware.map((software) => (
						<div
							key={software.id}
							className={`group relative rounded-3xl p-6 sm:p-7 bg-[#09152a]/90 backdrop-blur-xl border ${software.border} ${software.glow} transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
						>
							<div
								className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${software.gradient} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
							/>

							<div className="relative z-10 space-y-4">
								<div className="flex items-center justify-between">
									<span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
										{software.badge}
									</span>
									<span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
										<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
										{software.status}
									</span>
								</div>

								<div>
									<span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest block">
										{software.category}
									</span>
									<h2 className="text-xl sm:text-2xl font-black text-white mt-0.5 group-hover:text-cyan-200 transition-colors">
										{software.title}
									</h2>
									<p className="text-xs text-slate-400 font-medium mt-1">
										{software.tagline}
									</p>
									<p className="text-slate-300 text-xs leading-relaxed mt-2.5">
										{software.shortDesc}
									</p>
								</div>

								{/* features list */}
								<div className="space-y-1.5 pt-2">
									<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
										Key Platform Capabilities
									</span>
									<div className="space-y-1">
										{software.features.slice(0, 4).map((f, i) => (
											<div key={i} className="flex items-start gap-2 text-xs text-slate-300">
												<CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
												<span>{f}</span>
											</div>
										))}
									</div>
								</div>

								{/* tech stack pills */}
								<div className="space-y-1.5 pt-2">
									<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
										Tech Architecture
									</span>
									<div className="flex flex-wrap gap-1.5">
										{software.techStack.map((tech, i) => (
											<span
												key={i}
												className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/20 text-slate-300 font-medium"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</div>

							{/* card footer with buttons */}
							<div className="relative z-10 pt-6 mt-6 border-t border-cyan-500/20 space-y-3">
								<div className="flex items-baseline justify-between">
									<div>
										<span className="text-[10px] text-slate-400 uppercase tracking-wider block">
											Base License
										</span>
										<span className="text-lg font-black text-white">
											{software.startingPrice}
										</span>
									</div>
									<span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold">
										Full Source Code Available
									</span>
								</div>

								<div className="grid grid-cols-2 gap-2">
									<a
										href={software.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="py-2.5 px-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
									>
										<span>Vercel Demo</span>
										<ExternalLink className="w-3 h-3" />
									</a>

									<Link
										href={`/software/${software.slug}`}
										className="py-2.5 px-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-1 transition-all"
									>
										<span>Full Details</span>
										<ArrowRight className="w-3 h-3" />
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* custom software request banner */}
				<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071329] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-8 md:p-12 shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col lg:flex-row items-center justify-between gap-6">
					<div className="space-y-2 text-center lg:text-left">
						<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
							Custom Engineering
						</span>
						<h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
							Need a Custom SaaS or Enterprise Solution Engineered?
						</h3>
						<p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
							We architect and build tailored SaaS products, proprietary workflows, and API engines from scratch with complete source code ownership.
						</p>
					</div>

					<Link
						href="/#consultation"
						className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
					>
						<span>Request Software Architecture Quote</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</section>

			{/* footer */}
			<Footer />
		</div>
	);
}
