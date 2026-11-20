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
	AlertCircle,
	ArrowUpRight,
	Plus,
	Edit2,
	Trash2,
} from "lucide-react";

// admin studio control console component
export default function AdminConsole() {
	// console.log("rendering admin console component")
	const router = useRouter();

	const [currentUser, setCurrentUser] = useState(null);
	const [token, setToken] = useState("");
	const [overviewData, setOverviewData] = useState(null);
	const [servicesList, setServicesList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// modal state for service crud
	const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
	const [editingServiceId, setEditingServiceId] = useState(null);
	const [serviceForm, setServiceForm] = useState({
		title: "",
		slug: "",
		category: "WEB_DEVELOPMENT",
		startingPrice: "",
		shortDesc: "",
		fullDesc: "",
		features: "",
		isFeatured: false,
		isActive: true,
	});
	const [serviceMessage, setServiceMessage] = useState({ type: "", text: "" });
	const [isSubmittingService, setIsSubmittingService] = useState(false);

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

			// fetch all services
			const servicesRes = await fetch("http://localhost:5000/api/v1/services/admin/all", {
				headers: { Authorization: `Bearer ${authToken}` },
			});
			const servicesData = await servicesRes.json();
			if (servicesData.success) {
				setServicesList(servicesData.data);
			}
		} catch (_err) {
			// console.log("error fetching admin overview", _err)
		} finally {
			setIsLoading(false);
		}
	};

	// handle inquiry status update
	const handleUpdateInquiryStatus = async (inquiryId, newStatus) => {
		try {
			const res = await fetch(`http://localhost:5000/api/v1/inquiries/${inquiryId}/status`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ status: newStatus }),
			});
			const data = await res.json();
			if (data.success) {
				fetchAdminOverview(token);
			}
		} catch (_err) {
			// console.log("admin inquiry status update error", _err)
		}
	};

	// open service modal
	const handleOpenServiceModal = (service = null) => {
		if (service) {
			setEditingServiceId(service.id);
			setServiceForm({
				title: service.title,
				slug: service.slug,
				category: service.category,
				startingPrice: service.startingPrice ? String(service.startingPrice) : "",
				shortDesc: service.shortDesc || "",
				fullDesc: service.fullDesc || "",
				features: Array.isArray(service.features) ? service.features.join(", ") : "",
				isFeatured: !!service.isFeatured,
				isActive: service.isActive !== false,
			});
		} else {
			setEditingServiceId(null);
			setServiceForm({
				title: "",
				slug: "",
				category: "WEB_DEVELOPMENT",
				startingPrice: "",
				shortDesc: "",
				fullDesc: "",
				features: "",
				isFeatured: false,
				isActive: true,
			});
		}
		setServiceMessage({ type: "", text: "" });
		setIsServiceModalOpen(true);
	};

	// handle save service
	const handleSaveService = async (e) => {
		e.preventDefault();
		setIsSubmittingService(true);
		setServiceMessage({ type: "", text: "" });

		const formattedSlug = serviceForm.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
		const featuresArray = serviceForm.features
			? serviceForm.features.split(",").map((f) => f.trim()).filter(Boolean)
			: [];

		const payload = {
			title: serviceForm.title,
			slug: formattedSlug || serviceForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			category: serviceForm.category,
			shortDesc: serviceForm.shortDesc,
			fullDesc: serviceForm.fullDesc || serviceForm.shortDesc,
			features: featuresArray,
			startingPrice: serviceForm.startingPrice ? Number(serviceForm.startingPrice) : undefined,
			isFeatured: serviceForm.isFeatured,
			isActive: serviceForm.isActive,
		};

		try {
			const url = editingServiceId
				? `http://localhost:5000/api/v1/services/${editingServiceId}`
				: "http://localhost:5000/api/v1/services";
			const method = editingServiceId ? "PATCH" : "POST";

			const res = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (!res.ok || !data.success) {
				setServiceMessage({
					type: "error",
					text: data.message || "Failed to save service.",
				});
				setIsSubmittingService(false);
				return;
			}

			setServiceMessage({
				type: "success",
				text: `Service ${editingServiceId ? "updated" : "created"} successfully!`,
			});
			fetchAdminOverview(token);
			setTimeout(() => {
				setIsServiceModalOpen(false);
				setServiceMessage({ type: "", text: "" });
			}, 1200);
		} catch (_err) {
			// console.log("admin service save error", _err)
			setServiceMessage({
				type: "error",
				text: "Network error while saving service.",
			});
		} finally {
			setIsSubmittingService(false);
		}
	};

	// handle delete service
	const handleDeleteService = async (serviceId) => {
		if (!confirm("Are you sure you want to delete this service?")) return;
		try {
			const res = await fetch(`http://localhost:5000/api/v1/services/${serviceId}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) {
				fetchAdminOverview(token);
			}
		} catch (_err) {
			// console.log("admin delete service notice", _err)
		}
	};

	// handle toggle service active
	const handleToggleServiceActive = async (serviceId, currentActive) => {
		try {
			const res = await fetch(`http://localhost:5000/api/v1/services/${serviceId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ isActive: !currentActive }),
			});
			const data = await res.json();
			if (data.success) {
				fetchAdminOverview(token);
			}
		} catch (_err) {
			// console.log("admin toggle service notice", _err)
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
							onClick={() => handleOpenServiceModal()}
							className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
						>
							<Plus className="w-3.5 h-3.5" />
							<span>+ Add Service</span>
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
							<span>Published Services</span>
							<Sliders className="w-4 h-4 text-blue-400" />
						</div>
						<div className="text-3xl font-black text-white">
							{servicesList.length}
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

				{/* services management section */}
				<div className="p-6 rounded-3xl bg-[#091733]/90 border border-cyan-500/25 shadow-xl space-y-6">
					<div className="flex items-center justify-between pb-4 border-b border-slate-800">
						<div>
							<h3 className="text-lg font-bold text-white">Studio Services Management</h3>
							<p className="text-slate-400 text-xs">Publish, edit, and organize client services.</p>
						</div>
						<button
							onClick={() => handleOpenServiceModal()}
							className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/30 transition-all cursor-pointer flex items-center gap-1.5"
						>
							<Plus className="w-3.5 h-3.5" />
							<span>Add Service</span>
						</button>
					</div>

					{servicesList.length === 0 ? (
						<div className="text-center py-12 text-slate-400 text-xs">
							No services published yet. Click "Add Service" to get started.
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{servicesList.map((service) => (
								<div
									key={service.id}
									className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 flex flex-col justify-between"
								>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30">
												{service.category}
											</span>
											<div className="flex items-center gap-1.5">
												<span
													className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
														service.isActive
															? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
															: "bg-red-950 text-red-400 border border-red-500/30"
													}`}
												>
													{service.isActive ? "ACTIVE" : "INACTIVE"}
												</span>
												{service.isFeatured && (
													<span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-500/30">
														FEATURED
													</span>
												)}
											</div>
										</div>

										<h4 className="font-bold text-white text-base">{service.title}</h4>
										<p className="text-xs text-slate-300 line-clamp-2">{service.shortDesc}</p>
										<div className="text-xs font-bold text-cyan-300">
											Starting: ৳{service.startingPrice ? Number(service.startingPrice).toLocaleString() : "Custom Quote"}
										</div>
									</div>

									<div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
										<button
											onClick={() => handleToggleServiceActive(service.id, service.isActive)}
											className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 cursor-pointer"
										>
											{service.isActive ? "Deactivate" : "Activate"}
										</button>

										<div className="flex items-center gap-1.5">
											<button
												onClick={() => handleOpenServiceModal(service)}
												title="Edit Service"
												className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 cursor-pointer"
											>
												<Edit2 className="w-3.5 h-3.5" />
											</button>
											<button
												onClick={() => handleDeleteService(service.id)}
												title="Delete Service"
												className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 cursor-pointer"
											>
												<Trash2 className="w-3.5 h-3.5" />
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
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
										<div className="flex flex-wrap items-center gap-2">
											<h4 className="font-bold text-sm text-white">{inq.name}</h4>
											<select
												value={inq.status}
												onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
												className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold cursor-pointer focus:outline-none"
											>
												<option value="PENDING" className="bg-slate-900">PENDING</option>
												<option value="IN_PROGRESS" className="bg-slate-900">IN_PROGRESS</option>
												<option value="CONTACTED" className="bg-slate-900">CONTACTED</option>
												<option value="RESOLVED" className="bg-slate-900">RESOLVED</option>
												<option value="CANCELLED" className="bg-slate-900">CANCELLED</option>
											</select>
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

			{/* service create and edit modal */}
			{isServiceModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
					<div className="relative w-full max-w-lg rounded-3xl bg-[#091733] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-cyan-300">
								<Sliders className="w-5 h-5 text-cyan-400" />
								<h3 className="text-lg font-bold">
									{editingServiceId ? "Edit Service" : "Add New Service"}
								</h3>
							</div>
							<button
								onClick={() => setIsServiceModalOpen(false)}
								className="text-slate-400 hover:text-white p-1 rounded-full cursor-pointer"
							>
								✕
							</button>
						</div>

						{serviceMessage.text && (
							<div
								className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
									serviceMessage.type === "success"
										? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
										: "bg-red-950/60 text-red-300 border border-red-500/40"
								}`}
							>
								{serviceMessage.type === "success" ? (
									<CheckCircle className="w-4 h-4 shrink-0" />
								) : (
									<AlertCircle className="w-4 h-4 shrink-0" />
								)}
								<span>{serviceMessage.text}</span>
							</div>
						)}

						<form onSubmit={handleSaveService} className="space-y-4 text-xs">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label className="block text-slate-300 font-semibold mb-1">Service Title *</label>
									<input
										type="text"
										required
										placeholder="e.g. Turnkey Web App"
										value={serviceForm.title}
										onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
										className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
									/>
								</div>

								<div>
									<label className="block text-slate-300 font-semibold mb-1">Slug (URL Path)</label>
									<input
										type="text"
										placeholder="e.g. turnkey-web-app"
										value={serviceForm.slug}
										onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
										className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
								<div>
									<label className="block text-slate-300 font-semibold mb-1">Category *</label>
									<select
										value={serviceForm.category}
										onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
										className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs cursor-pointer"
									>
										<option value="WEB_DEVELOPMENT">Web Development</option>
										<option value="YOUTUBE_AUTOMATION">YouTube Automation</option>
										<option value="SOCIAL_MEDIA_MARKETING">Social Media Marketing</option>
										<option value="SEO_OPTIMIZATION">SEO Optimization</option>
										<option value="STRATEGY_CONSULTING">Strategy Consulting</option>
									</select>
								</div>

								<div>
									<label className="block text-slate-300 font-semibold mb-1">Starting Price (৳)</label>
									<input
										type="number"
										placeholder="e.g. 25000"
										value={serviceForm.startingPrice}
										onChange={(e) => setServiceForm({ ...serviceForm, startingPrice: e.target.value })}
										className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
									/>
								</div>
							</div>

							<div>
								<label className="block text-slate-300 font-semibold mb-1">Short Description *</label>
								<input
									type="text"
									required
									placeholder="Brief summary for cards"
									value={serviceForm.shortDesc}
									onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
								/>
							</div>

							<div>
								<label className="block text-slate-300 font-semibold mb-1">Full Description</label>
								<textarea
									rows={3}
									placeholder="Detailed scope of service..."
									value={serviceForm.fullDesc}
									onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs resize-none"
								/>
							</div>

							<div>
								<label className="block text-slate-300 font-semibold mb-1">Features (Comma separated)</label>
								<input
									type="text"
									placeholder="Next.js 16, Custom Design, SEO Optimized, 24/7 Support"
									value={serviceForm.features}
									onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
									className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-400 text-xs"
								/>
							</div>

							<div className="flex items-center gap-6 pt-1">
								<label className="flex items-center gap-2 text-slate-300 cursor-pointer">
									<input
										type="checkbox"
										checked={serviceForm.isFeatured}
										onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })}
										className="rounded bg-slate-950 border-slate-800 text-cyan-400 focus:ring-0"
									/>
									<span>Featured Service</span>
								</label>

								<label className="flex items-center gap-2 text-slate-300 cursor-pointer">
									<input
										type="checkbox"
										checked={serviceForm.isActive}
										onChange={(e) => setServiceForm({ ...serviceForm, isActive: e.target.checked })}
										className="rounded bg-slate-950 border-slate-800 text-cyan-400 focus:ring-0"
									/>
									<span>Active / Published</span>
								</label>
							</div>

							<div className="pt-2">
								<button
									type="submit"
									disabled={isSubmittingService}
									className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer disabled:opacity-50"
								>
									{isSubmittingService ? "Saving Service..." : editingServiceId ? "Update Service" : "Publish Service"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
