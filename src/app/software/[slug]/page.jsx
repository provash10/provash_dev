"use client";

import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import React from "react";
import {
	ArrowLeft,
	ExternalLink,
	CheckCircle2,
	Code2,
	Cpu,
	Sparkles,
	ShieldCheck,
	Send,
	Check,
	Zap,
	Server,
	Layers,
} from "lucide-react";
import { softwareProducts } from "@/data/softwareData";
import Footer from "@/components/HeaderFooter/Footer/Footer";

// single software detail page component
export default function SingleSoftwarePage() {
	// console.log("rendering single software detail page")

	const params = useParams();
	const slug = params?.slug;

	const software = softwareProducts.find((item) => item.slug === slug);

	if (!software) {
		return (
			<div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#050b17] text-white space-y-4">
				<h1 className="text-2xl font-bold">Software Not Found</h1>
				<p className="text-slate-400 text-sm">
					The software you are looking for does not exist or has been moved.
				</p>
				<Link
					href="/software"
					className="px-5 py-2.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs"
				>
					Return to Software Directory
				</Link>
			</div>
		);
	}

	return (
		<div className="w-full min-h-screen bg-[#050b17] text-white">
			{/* top navigation bar breadcrumb */}
			<div className="w-full bg-[#071329] border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<Link
						href="/software"
						className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
					>
						<ArrowLeft className="w-4 h-4" />
						<span>Back to Software Directory</span>
					</Link>

					<div className="flex items-center gap-2 text-xs text-slate-400">
						<Link href="/" className="hover:text-white">Home</Link>
						<span>/</span>
						<Link href="/software" className="hover:text-white">Software</Link>
						<span>/</span>
						<span className="text-cyan-300 font-semibold">{software.title}</span>
					</div>
				</div>
			</div>

			{/* hero header */}
			<section className="w-full relative overflow-hidden bg-gradient-to-b from-[#071329] via-[#091b3a] to-slate-950 border-b border-slate-800/80 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-7xl mx-auto space-y-6">
					<div className="flex flex-wrap items-center gap-3">
						<span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
							{software.badge}
						</span>
						<span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
							{software.category}
						</span>
						<span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 ml-auto">
							<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
							{software.status}
						</span>
					</div>

					<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
						<div className="space-y-3 max-w-3xl">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
								{software.title}
							</h1>
							<p className="text-cyan-300 text-sm sm:text-base font-semibold">
								{software.tagline}
							</p>
							<p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
								{software.shortDesc}
							</p>
						</div>

						<div className="flex flex-wrap items-center gap-3 flex-shrink-0">
							<a
								href={software.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
							>
								<span>Launch Vercel Live Demo</span>
								<ExternalLink className="w-4 h-4" />
							</a>

							<Link
								href="/#consultation"
								className="px-6 py-3 rounded-full bg-slate-900/90 text-cyan-300 hover:text-white border border-cyan-500/50 hover:border-cyan-300 font-bold text-xs sm:text-sm transition-all"
							>
								Inquire Software License
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* main content grid */}
			<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
					{/* left column: details and features */}
					<div className="lg:col-span-8 space-y-10">
						{/* live preview banner showcase */}
						<div className="rounded-3xl bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-6 md:p-8 shadow-[0_0_35px_rgba(6,182,212,0.2)] space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-red-500" />
									<div className="w-3 h-3 rounded-full bg-amber-500" />
									<div className="w-3 h-3 rounded-full bg-emerald-500" />
									<span className="text-xs text-slate-400 font-mono ml-2">
										{software.liveUrl}
									</span>
								</div>
								<span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
									Interactive Production Preview
								</span>
							</div>

							<div className="rounded-2xl bg-slate-950/80 border border-cyan-500/30 p-8 text-center space-y-4">
								<div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)]">
									<Sparkles className="w-8 h-8 text-cyan-400" />
								</div>
								<h3 className="text-xl font-bold text-white">
									Experience {software.title} Live on Vercel
								</h3>
								<p className="text-slate-300 text-xs max-w-lg mx-auto leading-relaxed">
									Click below to launch the live deployed preview in a new tab. You can interact with mock dashboards, auth flows, and UI widgets.
								</p>
								<div className="pt-2">
									<a
										href={software.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
									>
										<span>Open Vercel Application Demo</span>
										<ExternalLink className="w-4 h-4" />
									</a>
								</div>
							</div>
						</div>

						{/* architecture & description narrative */}
						<div className="rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 p-6 md:p-8 space-y-4 shadow-[0_4px_25px_rgba(6,182,212,0.1)]">
							<h3 className="text-xl font-bold text-white flex items-center gap-2">
								<Cpu className="w-5 h-5 text-cyan-400" />
								<span>Software Architecture & Engineering Overview</span>
							</h3>
							<p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
								{software.fullDesc}
							</p>
						</div>

						{/* comprehensive features list */}
						<div className="rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 p-6 md:p-8 space-y-6 shadow-[0_4px_25px_rgba(6,182,212,0.1)]">
							<h3 className="text-xl font-bold text-white flex items-center gap-2">
								<Layers className="w-5 h-5 text-cyan-400" />
								<span>Comprehensive Capabilities & Modules</span>
							</h3>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{software.features.map((feature, idx) => (
									<div
										key={idx}
										className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-300"
									>
										<CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
										<span className="font-medium">{feature}</span>
									</div>
								))}
							</div>
						</div>

						{/* tech stack details */}
						<div className="rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 p-6 md:p-8 space-y-4 shadow-[0_4px_25px_rgba(6,182,212,0.1)]">
							<h3 className="text-xl font-bold text-white flex items-center gap-2">
								<Code2 className="w-5 h-5 text-cyan-400" />
								<span>Tech Stack & Tools Used</span>
							</h3>
							<div className="flex flex-wrap gap-2 pt-2">
								{software.techStack.map((tech, idx) => (
									<span
										key={idx}
										className="px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 font-semibold text-xs shadow-[0_0_10px_rgba(6,182,212,0.1)]"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* right column: pricing and inquiry card */}
					<div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
						<div className="rounded-3xl bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-6 sm:p-7 shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6">
							<div>
								<span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block">
									Source Code License
								</span>
								<div className="flex items-baseline gap-2 mt-1">
									<span className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
										{software.startingPrice}
									</span>
								</div>
								<p className="text-slate-400 text-xs mt-1">
									One-time purchase with full repository ownership.
								</p>
							</div>

							<div className="space-y-2.5 pt-4 border-t border-cyan-500/20 text-xs text-slate-300">
								<div className="flex items-center gap-2">
									<Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
									<span>100% Full Source Code Access</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
									<span>Free One-Click Vercel / VPS Setup</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
									<span>Database Schema & Migration Scripts</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
									<span>bKash & Stripe Payment Integration</span>
								</div>
								<div className="flex items-center gap-2">
									<Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
									<span>1 Month Technical Bug-Fix Support</span>
								</div>
							</div>

							<div className="space-y-2 pt-2">
								<a
									href={software.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
								>
									<span>Launch Vercel Demo</span>
									<ExternalLink className="w-3.5 h-3.5" />
								</a>

								<Link
									href="/#consultation"
									className="w-full py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
								>
									<span>Custom Setup & Deployment</span>
								</Link>
							</div>
						</div>

						{/* security guarantee badge */}
						<div className="rounded-2xl bg-[#09152a]/80 border border-cyan-500/20 p-4 flex items-center gap-3 text-xs text-slate-300">
							<ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
							<span>Verified by Provash Sharma. Clean TypeScript & Prisma architecture.</span>
						</div>
					</div>
				</div>
			</section>

			{/* footer */}
			<Footer />
		</div>
	);
}
