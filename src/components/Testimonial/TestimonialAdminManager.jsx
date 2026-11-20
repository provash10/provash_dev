"use client";

import React, { useEffect, useState } from "react";
import {
	MessageSquareQuote,
	Plus,
	Trash2,
	Edit2,
	Star,
	RefreshCw,
	CheckCircle,
	AlertCircle,
	X,
	Eye,
	EyeOff,
	UserCheck,
} from "lucide-react";

// client testimonial admin manager component
export default function TestimonialAdminManager({ token }) {
	// console.log("rendering client testimonial manager component")

	const [testimonials, setTestimonials] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);

	const [formData, setFormData] = useState({
		clientName: "",
		clientRole: "",
		companyName: "",
		rating: 5,
		feedback: "",
		serviceType: "Full-Stack Web Development",
		isPublished: true,
	});

	const [feedbackMessage, setFeedbackMessage] = useState({ type: "", text: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// fetch all testimonials from backend
	const fetchTestimonials = async () => {
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/v1/testimonials/admin/all", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success && Array.isArray(data.data)) {
				setTestimonials(data.data);
			} else {
				// public fallback fetch
				const pubRes = await fetch("http://localhost:5000/api/v1/testimonials");
				const pubData = await pubRes.json();
				if (pubData.success && Array.isArray(pubData.data)) {
					setTestimonials(pubData.data);
				}
			}
		} catch (_err) {
			// console.log("offline testimonial fetch notice", _err)
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTestimonials();
	}, [token]);

	// open create modal
	const handleOpenCreate = () => {
		setEditingId(null);
		setFormData({
			clientName: "",
			clientRole: "",
			companyName: "",
			rating: 5,
			feedback: "",
			serviceType: "Full-Stack Web Development",
			isPublished: true,
		});
		setFeedbackMessage({ type: "", text: "" });
		setIsModalOpen(true);
	};

	// open edit modal
	const handleOpenEdit = (item) => {
		setEditingId(item.id);
		setFormData({
			clientName: item.clientName,
			clientRole: item.clientRole,
			companyName: item.companyName || "",
			rating: Number(item.rating) || 5,
			feedback: item.feedback,
			serviceType: item.serviceType || "Full-Stack Web Development",
			isPublished: Boolean(item.isPublished),
		});
		setFeedbackMessage({ type: "", text: "" });
		setIsModalOpen(true);
	};

	// handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFeedbackMessage({ type: "", text: "" });

		const payload = {
			clientName: formData.clientName,
			clientRole: formData.clientRole,
			companyName: formData.companyName || undefined,
			rating: Number(formData.rating),
			feedback: formData.feedback,
			serviceType: formData.serviceType || undefined,
			isPublished: formData.isPublished,
		};

		const url = editingId
			? `http://localhost:5000/api/v1/testimonials/${editingId}`
			: "http://localhost:5000/api/v1/testimonials";
		const method = editingId ? "PATCH" : "POST";

		try {
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
				setFeedbackMessage({
					type: "error",
					text: data.message || "Failed to save testimonial.",
				});
				setIsSubmitting(false);
				return;
			}

			setFeedbackMessage({
				type: "success",
				text: editingId
					? "Review updated successfully!"
					: "Review published successfully!",
			});

			fetchTestimonials();
			setTimeout(() => {
				setIsModalOpen(false);
			}, 1000);
		} catch (_err) {
			// console.log("testimonial save error", _err)
			setFeedbackMessage({
				type: "error",
				text: "Network error while saving testimonial.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// handle delete testimonial
	const handleDelete = async (id) => {
		if (!confirm("Are you sure you want to delete this review?")) return;
		try {
			const res = await fetch(`http://localhost:5000/api/v1/testimonials/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) {
				fetchTestimonials();
			}
		} catch (_err) {
			// console.log("testimonial delete notice", _err)
		}
	};

	// handle toggle publish status
	const handleTogglePublish = async (item) => {
		try {
			const res = await fetch(`http://localhost:5000/api/v1/testimonials/${item.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ isPublished: !item.isPublished }),
			});
			const data = await res.json();
			if (data.success) {
				fetchTestimonials();
			}
		} catch (_err) {
			// console.log("toggle publish error", _err)
		}
	};

	return (
		<div className="space-y-6">
			{/* action bar */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#091733]/90 border border-cyan-500/25">
				<div>
					<h3 className="text-base font-bold text-white flex items-center gap-2">
						<MessageSquareQuote className="w-5 h-5 text-cyan-400" />
						<span>Client Testimonials & Reviews Management</span>
					</h3>
					<p className="text-slate-400 text-xs mt-1">
						Manage verified client ratings, feedback quotes, and social proof published on the agency website.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={fetchTestimonials}
						className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
					>
						<RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
						<span>Sync</span>
					</button>
					<button
						onClick={handleOpenCreate}
						className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
					>
						<Plus className="w-4 h-4" />
						<span>Add Review</span>
					</button>
				</div>
			</div>

			{/* reviews grid */}
			{testimonials.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{testimonials.map((item) => (
						<div
							key={item.id}
							className="rounded-2xl bg-[#0b1b3d]/80 border border-cyan-500/20 p-5 flex flex-col justify-between hover:border-cyan-400/50 transition-all shadow-md group"
						>
							<div className="space-y-3">
								<div className="flex items-center justify-between">
									{/* rating stars */}
									<div className="flex items-center gap-1 text-amber-400">
										{[...Array(item.rating || 5)].map((_, i) => (
											<Star key={i} className="w-4 h-4 fill-amber-400" />
										))}
									</div>

									<button
										type="button"
										onClick={() => handleTogglePublish(item)}
										className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 cursor-pointer transition-colors ${
											item.isPublished
												? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
												: "bg-slate-950/80 border-slate-800 text-slate-500 hover:text-white"
										}`}
									>
										{item.isPublished ? (
											<>
												<Eye className="w-3 h-3" />
												<span>PUBLISHED</span>
											</>
										) : (
											<>
												<EyeOff className="w-3 h-3" />
												<span>HIDDEN</span>
											</>
										)}
									</button>
								</div>

								<p className="text-slate-300 text-xs italic leading-relaxed line-clamp-3">
									&quot;{item.feedback}&quot;
								</p>

								{item.serviceType && (
									<div className="text-[10px] text-cyan-400 font-medium">
										Service: {item.serviceType}
									</div>
								)}
							</div>

							<div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs">
								<div className="flex items-center gap-2.5">
									<div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
										{item.clientName?.charAt(0) || "C"}
									</div>
									<div>
										<h4 className="font-bold text-white text-xs">
											{item.clientName}
										</h4>
										<p className="text-slate-400 text-[10px]">
											{item.clientRole}
											{item.companyName ? ` • ${item.companyName}` : ""}
										</p>
									</div>
								</div>

								<div className="flex items-center gap-1.5">
									<button
										onClick={() => handleOpenEdit(item)}
										className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors cursor-pointer"
										title="Edit Review"
									>
										<Edit2 className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
										title="Delete Review"
									>
										<Trash2 className="w-3.5 h-3.5" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-16 rounded-2xl bg-[#091733]/50 border border-slate-800 space-y-3">
					<MessageSquareQuote className="w-10 h-10 text-slate-500 mx-auto" />
					<p className="text-slate-300 text-sm font-semibold">
						No testimonials found in database.
					</p>
					<p className="text-slate-500 text-xs max-w-sm mx-auto">
						Click the &quot;Add Review&quot; button above to publish client feedback.
					</p>
				</div>
			)}

			{/* create or edit testimonial modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
					<div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] space-y-5 text-white max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>

						<div>
							<span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
								{editingId ? "Update Review" : "Publish Review"}
							</span>
							<h3 className="text-xl font-black mt-1">
								{editingId ? "Edit Testimonial" : "New Client Review"}
							</h3>
						</div>

						{feedbackMessage.text && (
							<div
								className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
									feedbackMessage.type === "success"
										? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
										: "bg-rose-950/50 border-rose-500/50 text-rose-300"
								}`}
							>
								{feedbackMessage.type === "success" ? (
									<CheckCircle className="w-4 h-4 shrink-0" />
								) : (
									<AlertCircle className="w-4 h-4 shrink-0" />
								)}
								<span>{feedbackMessage.text}</span>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Client Name *
									</label>
									<input
										type="text"
										required
										value={formData.clientName}
										onChange={(e) =>
											setFormData({ ...formData, clientName: e.target.value })
										}
										placeholder="e.g. Marcus Vance"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Client Role / Title *
									</label>
									<input
										type="text"
										required
										value={formData.clientRole}
										onChange={(e) =>
											setFormData({ ...formData, clientRole: e.target.value })
										}
										placeholder="e.g. Founder, Apex SaaS"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Company Name (Optional)
									</label>
									<input
										type="text"
										value={formData.companyName}
										onChange={(e) =>
											setFormData({ ...formData, companyName: e.target.value })
										}
										placeholder="e.g. Apex Technologies"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Rating (Stars) *
									</label>
									<select
										value={formData.rating}
										onChange={(e) =>
											setFormData({ ...formData, rating: Number(e.target.value) })
										}
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
									>
										<option value={5}>5 Stars - Excellent</option>
										<option value={4}>4 Stars - Very Good</option>
										<option value={3}>3 Stars - Good</option>
										<option value={2}>2 Stars - Fair</option>
										<option value={1}>1 Star - Poor</option>
									</select>
								</div>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1">
									Service Type
								</label>
								<input
									type="text"
									value={formData.serviceType}
									onChange={(e) =>
										setFormData({ ...formData, serviceType: e.target.value })
									}
									placeholder="e.g. Full-Stack Web Development, YouTube Automation"
									className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1">
									Client Review Feedback *
								</label>
								<textarea
									rows={3}
									required
									value={formData.feedback}
									onChange={(e) =>
										setFormData({ ...formData, feedback: e.target.value })
									}
									placeholder="Detailed review quote praising turnaround speed, communication, code quality..."
									className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
								/>
							</div>

							<div className="flex items-center gap-2 pt-1">
								<input
									type="checkbox"
									id="isPublishedCheck"
									checked={formData.isPublished}
									onChange={(e) =>
										setFormData({
											...formData,
											isPublished: e.target.checked,
										})
									}
									className="w-4 h-4 rounded text-cyan-400 focus:ring-0 bg-slate-950 border-slate-800 cursor-pointer"
								/>
								<label
									htmlFor="isPublishedCheck"
									className="text-xs text-slate-300 cursor-pointer font-medium"
								>
									Publish immediately to public website
								</label>
							</div>

							<div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 text-xs font-semibold cursor-pointer"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer disabled:opacity-50"
								>
									{isSubmitting ? "Saving..." : editingId ? "Update Review" : "Publish Review"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
