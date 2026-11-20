"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	Shield,
	Users,
	MessageSquare,
	Laptop,
	RefreshCw,
	Sliders,
	LogOut,
	CheckCircle,
	ArrowUpRight,
} from "lucide-react";

// admin studio control console component
export default function AdminConsole() {
	// console.log("rendering admin console component")
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState("");
	const [overviewData, setOverviewData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const storedUser = localStorage.getItem("provash_agency_user");
		const storedToken = localStorage.getItem("provash_agency_token");

		if (!storedUser || !storedToken) {
			router.push("/login");
			return;
		}

		try {
			const parsed = JSON.parse(storedUser);
			if (parsed.role !== "ADMIN" && parsed.role !== "SUPER_ADMIN") {
				router.push("/dashboard");
				return;
			}
			setCurrentUser(parsed);
			setToken(storedToken);
			fetchAdminOverview(storedToken);
		} catch (_err) {
			// console.log("error parsing user session", _err)
			router.push("/login");
		}
	}, [router]);

	const fetchAdminOverview = async (authToken) => {
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/v1/admin/overview", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const data = await res.json();
			if (data.success) {
				setOverviewData(data.data);
			}
		} catch (_err) {
			// console.log("error fetching admin overview", _err)
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

	return (
		<div className="min-h-screen bg-[#070f21] text-white py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* top header bar */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#091836] via-[#0d2247] to-[#071329] border border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.2)]">
					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
							<Shield className="w-7 h-7 text-cyan-400" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								<h1 className="text-xl sm:text-2xl font-black text-white">
									Studio Admin Console
								</h1>
								<span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
									ADMIN
								</span>
							</div>
							<p className="text-slate-400 text-xs mt-1">
								Logged in as <strong className="text-cyan-300">{currentUser.name}</strong> ({currentUser.email})
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							onClick={() => fetchAdminOverview(token)}
							className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
						>
							<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
							<span>Refresh</span>
						</button>

						<button
							onClick={handleLogout}
							title="Sign Out"
							className="p-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 text-red-400 border border-red-500/40 transition-colors cursor-pointer"
						>
							<LogOut className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* high level stats grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-cyan-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Client Leads & Inquiries</span>
							<MessageSquare className="w-4 h-4 text-cyan-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{overviewData ? overviewData.totalInquiries : "—"}
						</div>
						<div className="text-[11px] text-cyan-300">
							Project Proposals & Quotes
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-emerald-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Registered Clients</span>
							<Users className="w-4 h-4 text-emerald-400" />
						</div>
						<div className="text-3xl font-black text-emerald-300">
							{overviewData ? overviewData.totalClients : "—"}
						</div>
						<div className="text-[11px] text-slate-400">
							Active Customer Accounts
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-blue-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Offered Services</span>
							<Sliders className="w-4 h-4 text-blue-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{overviewData ? overviewData.totalServices : "—"}
						</div>
						<div className="text-[11px] text-blue-300">
							Web, YouTube, SMM, SEO
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-purple-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Software Solutions</span>
							<Laptop className="w-4 h-4 text-purple-400" />
						</div>
						<div className="text-3xl font-black text-purple-300">
							{overviewData ? overviewData.totalSoftware : "6"}
						</div>
						<div className="text-[11px] text-slate-400">
							Production SaaS Catalog
						</div>
					</div>
				</div>

				{/* recent client inquiries section */}
				<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
					<div className="flex items-center justify-between pb-4 border-b border-slate-800">
						<div>
							<h3 className="text-lg font-bold text-white">Recent Client Inquiries</h3>
							<p className="text-slate-400 text-xs">Manage client leads and project requests.</p>
						</div>
						<Link
							href="/#services"
							className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
						>
							View Services →
						</Link>
					</div>

					{overviewData?.recentInquiries?.length === 0 ? (
						<div className="text-center py-12 text-slate-400 text-xs">
							No recent inquiries found.
						</div>
					) : (
						<div className="space-y-3">
							{overviewData?.recentInquiries?.map((inq) => (
								<div
									key={inq.id}
									className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
								>
									<div>
										<div className="flex items-center gap-2">
											<h4 className="font-bold text-sm text-white">{inq.name}</h4>
											<span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
												{inq.status}
											</span>
										</div>
										<div className="text-slate-400 text-xs mt-0.5">
											{inq.email} • {inq.phone || "No phone"} • Budget:{" "}
											<strong className="text-cyan-300">{inq.budget || "Not specified"}</strong>
										</div>
										<p className="text-slate-300 text-xs mt-2 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
											"{inq.message}"
										</p>
									</div>
									<div className="text-slate-400 text-[11px] self-end sm:self-center">
										{new Date(inq.createdAt).toLocaleDateString()}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
