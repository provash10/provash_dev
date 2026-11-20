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
	Clock,
	RefreshCw,
	FileText,
	Sparkles,
	ShieldCheck,
} from "lucide-react";

// client user personal portal component
export default function UserConsole() {
	// console.log("rendering client user console component")
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState("");
	const [myInquiries, setMyInquiries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("projects");

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
			setToken(storedToken);
			fetchMyInquiries(storedToken);
		} catch (_err) {
			// console.log("error parsing user session", _err)
			router.push("/login");
		}
	}, [router]);

	const fetchMyInquiries = async (authToken) => {
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/v1/inquiries/my-inquiries", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const data = await res.json();
			if (data.success) {
				setMyInquiries(data.data);
			}
		} catch (_err) {
			// console.log("error fetching my inquiries", _err)
		} finally {
			setIsLoading(false);
		}
	};

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

	const activeProjects = myInquiries.filter(
		(i) => i.status === "IN_PROGRESS" || i.status === "CONTACTED",
	);
	const completedProjects = myInquiries.filter((i) => i.status === "RESOLVED");

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
						<button
							onClick={() => fetchMyInquiries(token)}
							className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
						>
							<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
							<span>Refresh</span>
						</button>

						<Link
							href="/contact"
							className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
						>
							<MessageSquare className="w-3.5 h-3.5" />
							<span>+ New Inquiry</span>
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

				{/* client high level metrics grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-cyan-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Submitted Inquiries</span>
							<FileText className="w-4 h-4 text-cyan-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{myInquiries.length}
						</div>
						<div className="text-[11px] text-cyan-300 font-medium">
							Total Project Proposals
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-blue-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>In-Progress Projects</span>
							<Clock className="w-4 h-4 text-blue-400" />
						</div>
						<div className="text-3xl font-black text-blue-300">
							{activeProjects.length}
						</div>
						<div className="text-[11px] text-slate-400">
							Active Sprint Deliverables
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-emerald-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Completed Milestones</span>
							<CheckCircle className="w-4 h-4 text-emerald-400" />
						</div>
						<div className="text-3xl font-black text-emerald-300">
							{completedProjects.length}
						</div>
						<div className="text-[11px] text-slate-400">
							Delivered Solutions
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-purple-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Dedicated Support</span>
							<ShieldCheck className="w-4 h-4 text-purple-400" />
						</div>
						<div className="text-3xl font-black text-purple-300">
							Priority
						</div>
						<div className="text-[11px] text-slate-400">
							Fast Response Support
						</div>
					</div>
				</div>

				{/* interactive navigation tabs */}
				<div className="flex flex-wrap items-center gap-2 border-b border-cyan-500/20 pb-2">
					<button
						onClick={() => setActiveTab("projects")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "projects"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						My Projects & Inquiries ({myInquiries.length})
					</button>

					<button
						onClick={() => setActiveTab("timeline")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "timeline"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Sprint Delivery Lifecycle
					</button>

					<button
						onClick={() => setActiveTab("services")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "services"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Agency Services & Software
					</button>
				</div>

				{/* tab content my projects and inquiries */}
				{activeTab === "projects" && (
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
							<div>
								<h3 className="text-lg font-bold text-white">Your Project Requests & Proposals</h3>
								<p className="text-slate-400 text-xs">Track real-time sprint status and feedback from our engineering team.</p>
							</div>
							<Link
								href="/contact"
								className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all self-start sm:self-auto"
							>
								Submit Another Request →
							</Link>
						</div>

						{myInquiries.length === 0 ? (
							<div className="text-center py-12 space-y-3">
								<div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
									<MessageSquare className="w-6 h-6" />
								</div>
								<h4 className="text-base font-bold text-white">No Inquiries Found</h4>
								<p className="text-slate-400 text-xs max-w-sm mx-auto">
									You have not submitted any project inquiries yet. Start your journey by requesting a free quote today!
								</p>
								<Link
									href="/contact"
									className="inline-block mt-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg"
								>
									Start Project Consultation
								</Link>
							</div>
						) : (
							<div className="space-y-4">
								{myInquiries.map((inq) => (
									<div
										key={inq.id}
										className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3"
									>
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
											<div className="flex items-center gap-2.5">
												<h4 className="font-bold text-base text-white">{inq.name}</h4>
												<span
													className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
														inq.status === "RESOLVED"
															? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
															: inq.status === "IN_PROGRESS"
																? "bg-blue-950 text-blue-300 border border-blue-500/40"
																: inq.status === "CONTACTED"
																	? "bg-purple-950 text-purple-300 border border-purple-500/40"
																	: inq.status === "CANCELLED"
																		? "bg-red-950 text-red-300 border border-red-500/40"
																		: "bg-amber-950 text-amber-300 border border-amber-500/40"
													}`}
												>
													{inq.status}
												</span>
											</div>
											<div className="text-slate-400 text-xs">
												Submitted: {new Date(inq.createdAt).toLocaleDateString()}
											</div>
										</div>

										<div className="text-xs text-slate-300 flex flex-wrap items-center gap-3">
											<span>Budget: <strong className="text-cyan-300">{inq.budget || "Custom"}</strong></span>
											<span>•</span>
											<span>Email: <strong className="text-slate-200">{inq.email}</strong></span>
											{inq.phone && (
												<>
													<span>•</span>
													<span>Phone: <strong className="text-slate-200">{inq.phone}</strong></span>
												</>
											)}
										</div>

										<div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 italic">
											"{inq.message}"
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				)}

				{/* tab content sprint delivery lifecycle */}
				{activeTab === "timeline" && (
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
						<div className="pb-4 border-b border-slate-800">
							<h3 className="text-lg font-bold text-white">Our 4-Phase Delivery Process</h3>
							<p className="text-slate-400 text-xs">How we take your product from concept to production-ready deployment.</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-2">
								<span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950">
									Phase Discovery
								</span>
								<h4 className="font-bold text-white text-sm">Scope & Architecture</h4>
								<p className="text-xs text-slate-300">
									Requirement analysis, tech stack specification, and formal sprint estimate roadmap.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-slate-950/70 border border-blue-500/30 space-y-2">
								<span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-950">
									Phase Engineering
								</span>
								<h4 className="font-bold text-white text-sm">Sprint Development</h4>
								<p className="text-xs text-slate-300">
									Modern full stack engineering with Next.js 16, PostgreSQL, and clean modular APIs.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-2">
								<span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950">
									Phase Quality
								</span>
								<h4 className="font-bold text-white text-sm">Staging & Feedback</h4>
								<p className="text-xs text-slate-300">
									Private preview deployment on Vercel for client inspection and milestone revisions.
								</p>
							</div>

							<div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
								<span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950">
									Phase Launch
								</span>
								<h4 className="font-bold text-white text-sm">Production Handover</h4>
								<p className="text-xs text-slate-300">
									DNS routing, SSL security, and ongoing technical maintenance support.
								</p>
							</div>
						</div>
					</div>
				)}

				{/* tab content agency services and software */}
				{activeTab === "services" && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
							<div className="w-10 h-10 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400">
								<Sliders className="w-5 h-5" />
							</div>
							<h3 className="text-base font-bold text-white">Full-Stack Services</h3>
							<p className="text-slate-400 text-xs">
								Custom web apps, modern Next.js 16 portals, and scalable cloud backends.
							</p>
							<Link
								href="/#services"
								className="inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-white pt-2"
							>
								Browse All Services →
							</Link>
						</div>

						<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
							<div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center text-purple-400">
								<Laptop className="w-5 h-5" />
							</div>
							<h3 className="text-base font-bold text-white">SaaS Software Suite</h3>
							<p className="text-slate-400 text-xs">
								6 commercial software solutions ready for instant production deployment with live demos.
							</p>
							<Link
								href="/software"
								className="inline-flex items-center gap-1 text-xs font-bold text-purple-300 hover:text-white pt-2"
							>
								Explore 6 Products →
							</Link>
						</div>

						<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 space-y-3">
							<div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400">
								<CheckCircle className="w-5 h-5" />
							</div>
							<h3 className="text-base font-bold text-white">Custom Consultation</h3>
							<p className="text-slate-400 text-xs">
								Need something specific? Talk directly with our technical team for custom architecture.
							</p>
							<Link
								href="/contact"
								className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 hover:text-white pt-2"
							>
								Get Quote Estimate →
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
