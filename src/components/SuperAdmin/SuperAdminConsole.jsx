"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
	Shield,
	Users,
	DollarSign,
	MessageSquare,
	Laptop,
	UserPlus,
	CheckCircle,
	AlertCircle,
	RefreshCw,
	ArrowUpRight,
	Sliders,
	Code,
	LogOut,
} from "lucide-react";

// super admin executive control console component
export default function SuperAdminConsole() {
	// console.log("rendering super admin console component")
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState("");
	const [activeTab, setActiveTab] = useState("overview");

	// dashboard metrics and data
	const [stats, setStats] = useState(null);
	const [usersList, setUsersList] = useState([]);
	const [inquiriesList, setInquiriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// modal state for staff onboarding
	const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
	const [staffForm, setStaffForm] = useState({
		name: "",
		email: "",
		password: "",
		role: "PROJECT_MANAGER",
		phone: "",
	});
	const [staffMessage, setStaffMessage] = useState({ type: "", text: "" });
	const [isSubmittingStaff, setIsSubmittingStaff] = useState(false);

	// initialize user and load dashboard metrics
	useEffect(() => {
		const storedUser = localStorage.getItem("provash_agency_user");
		const storedToken = localStorage.getItem("provash_agency_token");

		if (!storedUser || !storedToken) {
			router.push("/login");
			return;
		}

		try {
			const parsed = JSON.parse(storedUser);
			if (parsed.role !== "SUPER_ADMIN") {
				router.push("/dashboard");
				return;
			}
			setCurrentUser(parsed);
			setToken(storedToken);
			fetchDashboardData(storedToken);
		} catch (_err) {
			// console.log("error parsing user session", _err)
			router.push("/login");
		}
	}, [router]);

	// fetch dashboard stats and listings from backend
	const fetchDashboardData = async (authToken) => {
		setIsLoading(true);
		try {
			// fetch super admin stats from dedicated super admin module
			const statsRes = await fetch("http://localhost:5000/api/v1/super-admin/stats", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const statsData = await statsRes.json();
			if (statsData.success) {
				setStats(statsData.data);
			}

			// fetch all users from dedicated super admin module
			const usersRes = await fetch("http://localhost:5000/api/v1/super-admin/users", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const usersData = await usersRes.json();
			if (usersData.success) {
				setUsersList(usersData.data);
			}

			// fetch inquiries
			const inquiriesRes = await fetch("http://localhost:5000/api/v1/inquiries", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const inquiriesData = await inquiriesRes.json();
			if (inquiriesData.success) {
				setInquiriesList(inquiriesData.data);
			}
		} catch (_error) {
			// console.log("error fetching super admin dashboard data", _error)
		} finally {
			setIsLoading(false);
		}
	};

	// handle staff onboarding submission
	const handleCreateStaff = async (e) => {
		e.preventDefault();
		setIsSubmittingStaff(true);
		setStaffMessage({ type: "", text: "" });

		try {
			const res = await fetch("http://localhost:5000/api/v1/super-admin/create-staff", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(staffForm),
			});

			const data = await res.json();

			if (!res.ok || !data.success) {
				setStaffMessage({
					type: "error",
					text: data.message || "Failed to create staff account.",
				});
				setIsSubmittingStaff(false);
				return;
			}

			setStaffMessage({
				type: "success",
				text: `Successfully created ${staffForm.role} account for ${staffForm.name}!`,
			});

			setStaffForm({
				name: "",
				email: "",
				password: "",
				role: "PROJECT_MANAGER",
				phone: "",
			});

			// refresh user listings
			fetchDashboardData(token);
			setTimeout(() => {
				setIsStaffModalOpen(false);
				setStaffMessage({ type: "", text: "" });
			}, 1500);
		} catch (_err) {
			// console.log("staff onboarding connection notice", _err)
			setStaffMessage({
				type: "error",
				text: "Network error while connecting to server.",
			});
		} finally {
			setIsSubmittingStaff(false);
		}
	};

	// handle status toggle
	const handleToggleStatus = async (userId, currentStatus) => {
		const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
		try {
			const res = await fetch(
				`http://localhost:5000/api/v1/super-admin/users/${userId}/status`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ status: newStatus }),
				},
			);
			const data = await res.json();
			if (data.success) {
				fetchDashboardData(token);
			}
		} catch (_err) {
			// console.log("status toggle notice", _err)
		}
	};

	// handle logout
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
									Super Admin Executive Console
								</h1>
								<span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.5)]">
									SUPER_ADMIN
								</span>
							</div>
							<p className="text-slate-400 text-xs mt-1">
								Logged in as <strong className="text-cyan-300">{currentUser.name}</strong> ({currentUser.email})
							</p>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<button
							onClick={() => fetchDashboardData(token)}
							className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
						>
							<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
							<span>Refresh</span>
						</button>

						<button
							onClick={() => setIsStaffModalOpen(true)}
							className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
						>
							<UserPlus className="w-3.5 h-3.5" />
							<span>+ Onboard Staff</span>
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
							<span>Total Platform Users</span>
							<Users className="w-4 h-4 text-cyan-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{stats ? stats.totalUsers : usersList.length}
						</div>
						<div className="text-[11px] text-cyan-300 font-medium">
							Super Admins, Admins, PMs and Clients
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-emerald-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Gross Processed Revenue</span>
							<DollarSign className="w-4 h-4 text-emerald-400" />
						</div>
						<div className="text-3xl font-black text-emerald-300">
							৳{stats ? stats.totalRevenue.toLocaleString() : "0"}
						</div>
						<div className="text-[11px] text-slate-400">
							bKash, Nagad and Stripe Gateway
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-blue-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Consultation Inquiries</span>
							<MessageSquare className="w-4 h-4 text-blue-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{stats ? stats.totalInquiries : inquiriesList.length}
						</div>
						<div className="text-[11px] text-blue-300">
							Active Client Project Leads
						</div>
					</div>

					<div className="p-5 rounded-2xl bg-[#091733]/90 border border-purple-500/25 shadow-lg space-y-2">
						<div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
							<span>Proprietary SaaS Suite</span>
							<Laptop className="w-4 h-4 text-purple-400" />
						</div>
						<div className="text-3xl font-black text-purple-300">
							6 Products
						</div>
						<div className="text-[11px] text-slate-400">
							Vercel Production Staging
						</div>
					</div>
				</div>

				{/* interactive navigation tabs */}
				<div className="flex flex-wrap items-center gap-2 border-b border-cyan-500/20 pb-2">
					<button
						onClick={() => setActiveTab("overview")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "overview"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Overview & Roles
					</button>

					<button
						onClick={() => setActiveTab("users")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "users"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Team & Users ({usersList.length})
					</button>

					<button
						onClick={() => setActiveTab("inquiries")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "inquiries"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Client Inquiries ({inquiriesList.length})
					</button>

					<button
						onClick={() => setActiveTab("software")}
						className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
							activeTab === "software"
								? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
								: "text-slate-400 hover:text-white hover:bg-slate-900"
						}`}
					>
						Software Suite (6)
					</button>
				</div>

				{/* tab content overview and role breakdown */}
				{activeTab === "overview" && (
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
						<div className="lg:col-span-7 space-y-6">
							<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-4">
								<h3 className="text-lg font-bold text-white flex items-center gap-2">
									<Sliders className="w-4 h-4 text-cyan-400" />
									<span>Platform Role Hierarchy Overview</span>
								</h3>
								<div className="space-y-3">
									<div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/30 flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="text-xs font-bold text-amber-400">SUPER_ADMIN</span>
												<span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
													Supreme Authority
												</span>
											</div>
											<p className="text-slate-300 text-xs mt-1">
												Total platform control, staff onboarding, financial ledger, and gateway settings.
											</p>
										</div>
										<span className="text-xl font-black text-amber-400">
											{usersList.filter((u) => u.role === "SUPER_ADMIN").length}
										</span>
									</div>

									<div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/30 flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="text-xs font-bold text-cyan-400">ADMIN</span>
												<span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300">
													Studio Operations
												</span>
											</div>
											<p className="text-slate-300 text-xs mt-1">
												Manages client leads, publishes services, case studies, and monitors team tasks.
											</p>
										</div>
										<span className="text-xl font-black text-cyan-400">
											{usersList.filter((u) => u.role === "ADMIN").length}
										</span>
									</div>

									<div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-500/30 flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="text-xs font-bold text-blue-400">PROJECT_MANAGER</span>
												<span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
													Sprint Executor
												</span>
											</div>
											<p className="text-slate-300 text-xs mt-1">
												Coordinates client deliverables, updates sprint milestones, and deploys software.
											</p>
										</div>
										<span className="text-xl font-black text-blue-400">
											{usersList.filter((u) => u.role === "PROJECT_MANAGER").length}
										</span>
									</div>

									<div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 flex items-center justify-between">
										<div>
											<div className="flex items-center gap-2">
												<span className="text-xs font-bold text-emerald-400">CLIENT</span>
												<span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
													End Consumer
												</span>
											</div>
											<p className="text-slate-300 text-xs mt-1">
												Purchases services, views live milestone progress, and downloads invoices.
											</p>
										</div>
										<span className="text-xl font-black text-emerald-400">
											{usersList.filter((u) => u.role === "CLIENT").length}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-5 space-y-6">
							<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-4">
								<h3 className="text-lg font-bold text-white flex items-center gap-2">
									<Code className="w-4 h-4 text-cyan-400" />
									<span>Quick Administrative Links</span>
								</h3>
								<div className="space-y-2.5">
									<Link
										href="/software"
										className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs transition-all group"
									>
										<div className="flex items-center gap-2.5">
											<Laptop className="w-4 h-4 text-cyan-400" />
											<span className="font-semibold text-slate-200">Software Suite Catalog</span>
										</div>
										<ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300" />
									</Link>

									<Link
										href="/#services"
										className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs transition-all group"
									>
										<div className="flex items-center gap-2.5">
											<Sliders className="w-4 h-4 text-cyan-400" />
											<span className="font-semibold text-slate-200">Agency Services Section</span>
										</div>
										<ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300" />
									</Link>

									<Link
										href="/portfolio"
										className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-between text-xs transition-all group"
									>
										<div className="flex items-center gap-2.5">
											<Shield className="w-4 h-4 text-cyan-400" />
											<span className="font-semibold text-slate-200">Developer Portfolio Showcase</span>
										</div>
										<ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* tab content users and team management */}
				{activeTab === "users" && (
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
							<div>
								<h3 className="text-lg font-bold text-white">Registered Users & Staff</h3>
								<p className="text-slate-400 text-xs">Manage accounts, assign roles, and toggle access.</p>
							</div>
							<button
								onClick={() => setIsStaffModalOpen(true)}
								className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
							>
								<UserPlus className="w-3.5 h-3.5" />
								<span>+ Create Staff</span>
							</button>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full text-left text-xs border-collapse">
								<thead>
									<tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
										<th className="py-3 px-4">Name & Email</th>
										<th className="py-3 px-4">Role</th>
										<th className="py-3 px-4">Status</th>
										<th className="py-3 px-4">Phone</th>
										<th className="py-3 px-4">Joined Date</th>
										<th className="py-3 px-4 text-right">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-800/60">
									{usersList.map((user) => (
										<tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
											<td className="py-3.5 px-4">
												<div className="font-bold text-white">{user.name}</div>
												<div className="text-slate-400 text-[11px]">{user.email}</div>
											</td>
											<td className="py-3.5 px-4">
												<span
													className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
														user.role === "SUPER_ADMIN"
															? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
															: user.role === "ADMIN"
																? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
																: user.role === "PROJECT_MANAGER"
																	? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
																	: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
													}`}
												>
													{user.role}
												</span>
											</td>
											<td className="py-3.5 px-4">
												<span
													className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
														user.status === "ACTIVE"
															? "text-emerald-400 bg-emerald-950/40"
															: "text-red-400 bg-red-950/40"
													}`}
												>
													{user.status}
												</span>
											</td>
											<td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
												{user.phone || "—"}
											</td>
											<td className="py-3.5 px-4 text-slate-400 text-[11px]">
												{new Date(user.createdAt).toLocaleDateString()}
											</td>
											<td className="py-3.5 px-4 text-right">
												{user.role !== "SUPER_ADMIN" && (
													<button
														onClick={() => handleToggleStatus(user.id, user.status)}
														className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
															user.status === "ACTIVE"
																? "bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30"
																: "bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/30"
														}`}
													>
														{user.status === "ACTIVE" ? "Block" : "Activate"}
													</button>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)}

				{/* tab content inquiries and client leads */}
				{activeTab === "inquiries" && (
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
						<div className="pb-4 border-b border-slate-800">
							<h3 className="text-lg font-bold text-white">Client Consultation Inquiries</h3>
							<p className="text-slate-400 text-xs">Review quotes and proposals submitted from homepage.</p>
						</div>

						{inquiriesList.length === 0 ? (
							<div className="text-center py-12 text-slate-400 text-xs">
								No consultation inquiries submitted yet.
							</div>
						) : (
							<div className="space-y-3">
								{inquiriesList.map((inq) => (
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
				)}

				{/* tab content software catalog */}
				{activeTab === "software" && (
					<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
						<div className="flex items-center justify-between pb-4 border-b border-slate-800">
							<div>
								<h3 className="text-lg font-bold text-white">Proprietary Software Suite</h3>
								<p className="text-slate-400 text-xs">6 production-ready software solutions.</p>
							</div>
							<Link
								href="/software"
								className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all"
							>
								View Public Catalog →
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{[
								{ title: "DevFlow ERP", cat: "Agency CRM", slug: "devflow-erp", price: "৳25,000 / $250" },
								{ title: "TubePulse AI", cat: "YouTube Creator SaaS", slug: "tubepulse-ai", price: "৳20,000 / $200" },
								{ title: "SocialBoost Hub", cat: "SMM Growth & Reseller", slug: "socialboost-hub", price: "৳35,000 / $350" },
								{ title: "RestoPos Cloud", cat: "Restaurant POS", slug: "restopos-cloud", price: "৳30,000 / $300" },
								{ title: "ShopNest Commerce", cat: "Headless E-Commerce", slug: "shopnest-commerce", price: "৳40,000 / $400" },
								{ title: "MedCare Plus", cat: "Hospital ERP", slug: "medcare-plus", price: "৳45,000 / $450" },
							].map((item, idx) => (
								<div key={idx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
									<div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">{item.cat}</div>
									<h4 className="font-bold text-white">{item.title}</h4>
									<div className="text-xs text-slate-300">{item.price}</div>
									<div className="pt-2 flex items-center gap-2">
										<a
											href={`https://${item.slug}-demo.vercel.app`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex-1 py-1 px-2.5 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold text-center hover:bg-cyan-900/80"
										>
											Vercel Demo ↗
										</a>
										<Link
											href={`/software/${item.slug}`}
											className="py-1 px-2.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 text-[11px] hover:text-white"
										>
											Details
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* staff onboarding modal */}
			{isStaffModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
					<div className="relative w-full max-w-md rounded-3xl bg-[#091733] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5 text-white">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-cyan-300">
								<UserPlus className="w-5 h-5 text-cyan-400" />
								<h3 className="text-lg font-bold">Onboard New Staff</h3>
							</div>
							<button
								onClick={() => setIsStaffModalOpen(false)}
								className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
							>
								✕
							</button>
						</div>

						{staffMessage.text && (
							<div
								className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
									staffMessage.type === "success"
										? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
										: "bg-red-950/60 text-red-300 border border-red-500/40"
								}`}
							>
								{staffMessage.type === "success" ? (
									<CheckCircle className="w-4 h-4 shrink-0" />
								) : (
									<AlertCircle className="w-4 h-4 shrink-0" />
								)}
								<span>{staffMessage.text}</span>
							</div>
						)}

						<form onSubmit={handleCreateStaff} className="space-y-4 text-xs">
							<div>
								<label className="block text-slate-300 font-semibold mb-1">Full Name</label>
								<input
									type="text"
									required
									placeholder="e.g. Alex Morgan"
									value={staffForm.name}
									onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
								/>
							</div>

							<div>
								<label className="block text-slate-300 font-semibold mb-1">Email Address</label>
								<input
									type="email"
									required
									placeholder="e.g. pm@provash.dev"
									value={staffForm.email}
									onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
								/>
							</div>

							<div>
								<label className="block text-slate-300 font-semibold mb-1">Password</label>
								<input
									type="password"
									required
									placeholder="At least six characters"
									value={staffForm.password}
									onChange={(e) => setStaffForm({ ...staffForm, password: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
								/>
							</div>

							<div className="grid grid-cols-2 gap-3">
								<div>
									<label className="block text-slate-300 font-semibold mb-1">Role</label>
									<select
										value={staffForm.role}
										onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
										className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs cursor-pointer"
									>
										<option value="PROJECT_MANAGER">Project Manager</option>
										<option value="ADMIN">Admin</option>
										<option value="CLIENT">Client</option>
									</select>
								</div>

								<div>
									<label className="block text-slate-300 font-semibold mb-1">Phone (Optional)</label>
									<input
										type="text"
										placeholder="+8801..."
										value={staffForm.phone}
										onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
										className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
									/>
								</div>
							</div>

							<div className="pt-2">
								<button
									type="submit"
									disabled={isSubmittingStaff}
									className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer"
								>
									{isSubmittingStaff ? "Creating Account..." : "Confirm & Create Staff"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
