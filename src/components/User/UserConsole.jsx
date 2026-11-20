"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	User,
	MessageSquare,
	Laptop,
	Sliders,
	LogOut,
	ArrowUpRight,
	CheckCircle,
} from "lucide-react";

// client user personal portal component
export default function UserConsole() {
	// console.log("rendering client user console component")
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("provash_agency_user");
		const storedToken = localStorage.getItem("provash_agency_token");

		if (!storedUser || !storedToken) {
			router.push("/login");
			return;
		}

		try {
			const parsed = JSON.parse(storedUser);
			setCurrentUser(parsed);
		} catch (_err) {
			// console.log("error parsing user session", _err)
			router.push("/login");
		}
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("provash_agency_user");
		localStorage.removeItem("provash_agency_token");
		router.push("/login");
	};

	if (!currentUser) {
		return (
			<div className="w-full min-h-[70vh] flex items-center justify-center text-cyan-400">
				<div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#070f21] text-white py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* top header bar */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#091836] via-[#0d2247] to-[#071329] border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)]">
					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
							<User className="w-7 h-7 text-cyan-400" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<h1 className="text-xl sm:text-2xl font-black text-white">
									Client Portal
								</h1>
								<span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
									CLIENT
								</span>
							</div>
							<p className="text-slate-400 text-xs mt-1">
								Welcome back, <strong className="text-cyan-300">{currentUser.name}</strong> ({currentUser.email})
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<Link
							href="/contact"
							className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
						>
							<MessageSquare className="w-3.5 h-3.5" />
							<span>Submit New Inquiry</span>
						</Link>

						<button
							onClick={handleLogout}
							title="Sign Out"
							className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-400 border border-red-500/40 transition-colors cursor-pointer"
						>
							<LogOut className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* client quick actions */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
						<div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400">
							<Sliders className="w-5 h-5" />
						</div>
						<h3 className="text-base font-bold text-white">Agency Services</h3>
						<p className="text-slate-400 text-xs">
							Explore full stack web development, youtube automation, and growth marketing packages.
						</p>
						<Link
							href="/#services"
							className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-white pt-2"
						>
							Browse Services →
						</Link>
					</div>

					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
						<div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400">
							<Laptop className="w-5 h-5" />
						</div>
						<h3 className="text-base font-bold text-white">Software Catalog</h3>
						<p className="text-slate-400 text-xs">
							View proprietary saas products ready for commercial deployment with live demos.
						</p>
						<Link
							href="/software"
							className="inline-flex items-center gap-1 text-xs font-bold text-purple-300 hover:text-white pt-2"
						>
							Explore Software →
						</Link>
					</div>

					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
						<div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400">
							<CheckCircle className="w-5 h-5" />
						</div>
						<h3 className="text-base font-bold text-white">Direct Consultation</h3>
						<p className="text-slate-400 text-xs">
							Get personalized consultation, quote estimates, and project scope discussions.
						</p>
						<Link
							href="/contact"
							className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white pt-2"
						>
							Talk with Team →
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
