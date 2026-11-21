"use client";

import React from "react";
import {
	Code2,
	Cpu,
	Database,
	Layers,
	Server,
	ShieldCheck,
	Sparkles,
	Zap,
	Terminal,
	Activity,
} from "lucide-react";

// tech architecture hub visual component replacing hero image
export default function TechArchitectureHub() {
	// console.log("rendering tech architecture hub visual")

	return (
		<div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] aspect-square flex items-center justify-center select-none">
			{/* background ambient neon glow */}
			<div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-purple-500/15 rounded-full blur-[90px] scale-95 pointer-events-none" />

			{/* outer rotating orbital ring */}
			<div className="absolute inset-4 sm:inset-6 rounded-full border border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite] pointer-events-none" />

			{/* middle secondary glowing orbit */}
			<div className="absolute inset-12 sm:inset-16 rounded-full border border-blue-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] pointer-events-none" />

			{/* central platform pedestal */}
			<div className="relative z-10 w-52 sm:w-60 h-52 sm:h-60 rounded-3xl bg-gradient-to-br from-[#0c214d]/90 via-[#071530]/95 to-[#040a17] border border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.35)] p-5 flex flex-col items-center justify-center text-center space-y-3 backdrop-blur-2xl">
				{/* glowing core icon */}
				<div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.8)]">
					<Cpu className="w-7 h-7 text-white animate-pulse" />
					<div className="absolute -inset-1 rounded-2xl bg-cyan-400/30 blur-sm pointer-events-none" />
				</div>

				<div>
					<span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest block">
						Core Architecture
					</span>
					<h3 className="text-sm sm:text-base font-black text-white tracking-wide">
						Full-Stack Web Engine
					</h3>
					<p className="text-[10px] text-slate-400 mt-0.5">
						Next.js • React • Node • SQL
					</p>
				</div>

				{/* live status pill */}
				<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-bold text-cyan-300 shadow-inner">
					<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
					<span>Production Verified</span>
				</div>
			</div>

			{/* top left orbital badge: nextjs */}
			<div className="absolute top-2 left-4 sm:left-6 z-20 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform">
				<Sparkles className="w-3.5 h-3.5 text-cyan-400" />
				<span>Next.js 16 (App Router)</span>
			</div>

			{/* top right orbital badge: react */}
			<div className="absolute top-6 right-2 sm:right-4 z-20 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-blue-500/40 text-blue-300 text-xs font-bold shadow-[0_0_20px_rgba(59,130,246,0.25)] backdrop-blur-md flex items-center gap-2 hover:scale-105 transition-transform">
				<Code2 className="w-3.5 h-3.5 text-blue-400" />
				<span>React 19 Server Components</span>
			</div>

			{/* left middle orbital badge: typescript */}
			<div className="absolute bottom-28 -left-3 sm:left-0 z-20 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-blue-400/40 text-blue-200 text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md flex items-center gap-1.5 hover:scale-105 transition-transform">
				<Terminal className="w-3.5 h-3.5 text-blue-400" />
				<span>TypeScript 5 Strict</span>
			</div>

			{/* right middle orbital badge: postgresql & prisma */}
			<div className="absolute bottom-28 -right-3 sm:right-0 z-20 px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-indigo-400/40 text-indigo-200 text-xs font-bold shadow-[0_0_15px_rgba(129,140,248,0.25)] backdrop-blur-md flex items-center gap-1.5 hover:scale-105 transition-transform">
				<Database className="w-3.5 h-3.5 text-indigo-400" />
				<span>PostgreSQL & Prisma ORM</span>
			</div>

			{/* bottom center live metrics glass card touching circle line */}
			<div className="absolute bottom-7 sm:bottom-8 md:bottom-9 z-20 px-4 py-2 rounded-2xl bg-[#071329]/95 border border-cyan-500/30 text-white text-[11px] font-semibold shadow-[0_4px_25px_rgba(6,182,212,0.25)] backdrop-blur-xl flex items-center gap-4">
				<div className="flex items-center gap-1.5 text-emerald-400">
					<Activity className="w-3.5 h-3.5" />
					<span>99.9% Sla</span>
				</div>
				<span className="text-slate-600">•</span>
				<div className="flex items-center gap-1.5 text-cyan-300">
					<Server className="w-3.5 h-3.5" />
					<span>Sub-100ms Api</span>
				</div>
				<span className="text-slate-600">•</span>
				<div className="flex items-center gap-1.5 text-blue-300">
					<ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
					<span>Jwt Auth</span>
				</div>
			</div>
		</div>
	);
}
