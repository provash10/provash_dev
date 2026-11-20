"use client";

import React, { useEffect, useState } from "react";
import {
	FolderKanban,
	Plus,
	Trash2,
	Edit2,
	ExternalLink,
	Star,
	RefreshCw,
	CheckCircle,
	AlertCircle,
	X,
	Layers,
	Code,
} from "lucide-react";

// portfolio projects manager component for admin and super admin
export default function PortfolioAdminManager({ token }) {
	// console.log("rendering portfolio admin manager component")

	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingProjectId, setEditingProjectId] = useState(null);

	const [projectForm, setProjectForm] = useState({
		title: "",
		slug: "",
		category: "Full-Stack Web",
		description: "",
		thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
		liveUrl: "",
		githubClient: "",
		githubServer: "",
		technologies: "Next.js, TypeScript, Tailwind CSS, Prisma",
		featured: false,
	});

	const [feedbackMessage, setFeedbackMessage] = useState({ type: "", text: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	// fetch all portfolio projects
	const fetchProjects = async () => {
		setIsLoading(true);
		try {
			const res = await fetch("http://localhost:5000/api/v1/portfolio");
			const data = await res.json();
			if (data.success && Array.isArray(data.data)) {
				setProjects(data.data);
			}
		} catch (_err) {
			// console.log("offline portfolio fetch notice", _err)
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProjects();
	}, []);

	// open create modal
	const handleOpenCreate = () => {
		setEditingProjectId(null);
		setProjectForm({
			title: "",
			slug: "",
			category: "Full-Stack Web",
			description: "",
			thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
			liveUrl: "",
			githubClient: "",
			githubServer: "",
			technologies: "Next.js, TypeScript, Tailwind CSS, Prisma",
			featured: false,
		});
		setFeedbackMessage({ type: "", text: "" });
		setIsModalOpen(true);
	};

	// open edit modal
	const handleOpenEdit = (project) => {
		setEditingProjectId(project.id);
		setProjectForm({
			title: project.title,
			slug: project.slug,
			category: project.category,
			description: project.description,
			thumbnail: project.thumbnail || "",
			liveUrl: project.liveUrl || "",
			githubClient: project.githubClient || "",
			githubServer: project.githubServer || "",
			technologies: Array.isArray(project.technologies)
				? project.technologies.join(", ")
				: "",
			featured: Boolean(project.featured),
		});
		setFeedbackMessage({ type: "", text: "" });
		setIsModalOpen(true);
	};

	// handle project form submission
	const handleSubmitProject = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFeedbackMessage({ type: "", text: "" });

		const techArray = projectForm.technologies
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);

		const payload = {
			title: projectForm.title,
			slug:
				projectForm.slug ||
				projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			category: projectForm.category,
			description: projectForm.description,
			thumbnail: projectForm.thumbnail,
			liveUrl: projectForm.liveUrl || "",
			githubClient: projectForm.githubClient || "",
			githubServer: projectForm.githubServer || "",
			technologies: techArray.length > 0 ? techArray : ["Next.js", "React"],
			featured: projectForm.featured,
		};

		const url = editingProjectId
			? `http://localhost:5000/api/v1/portfolio/${editingProjectId}`
			: "http://localhost:5000/api/v1/portfolio";
		const method = editingProjectId ? "PATCH" : "POST";

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
					text: data.message || "Failed to save portfolio project.",
				});
				setIsSubmitting(false);
				return;
			}

			setFeedbackMessage({
				type: "success",
				text: editingProjectId
					? "Project updated successfully!"
					: "Project published to portfolio successfully!",
			});

			fetchProjects();
			setTimeout(() => {
				setIsModalOpen(false);
			}, 1000);
		} catch (_err) {
			// console.log("project save error", _err)
			setFeedbackMessage({
				type: "error",
				text: "Network error while saving project.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// handle delete project
	const handleDelete = async (projectId) => {
		if (!confirm("Are you sure you want to delete this project?")) return;
		try {
			const res = await fetch(`http://localhost:5000/api/v1/portfolio/${projectId}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			if (data.success) {
				fetchProjects();
			}
		} catch (_err) {
			// console.log("delete project error", _err)
		}
	};

	// handle toggle featured
	const handleToggleFeatured = async (project) => {
		try {
			const res = await fetch(`http://localhost:5000/api/v1/portfolio/${project.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ featured: !project.featured }),
			});
			const data = await res.json();
			if (data.success) {
				fetchProjects();
			}
		} catch (_err) {
			// console.log("toggle featured error", _err)
		}
	};

	return (
		<div className="space-y-6">
			{/* action bar */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#091733]/90 border border-cyan-500/25">
				<div>
					<h3 className="text-base font-bold text-white flex items-center gap-2">
						<FolderKanban className="w-5 h-5 text-cyan-400" />
						<span>Portfolio Projects Management</span>
					</h3>
					<p className="text-slate-400 text-xs mt-1">
						Manage live client deliverables and case studies displayed on the public portfolio.
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={fetchProjects}
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
						<span>Add Project</span>
					</button>
				</div>
			</div>

			{/* projects grid listing */}
			{projects.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{projects.map((proj) => (
						<div
							key={proj.id}
							className="rounded-2xl bg-[#0b1b3d]/80 border border-cyan-500/20 p-5 flex flex-col justify-between hover:border-cyan-400/50 transition-all shadow-md group"
						>
							<div className="space-y-3">
								<div className="relative overflow-hidden rounded-xl border border-slate-800 h-40 bg-slate-950">
									<img
										src={
											proj.thumbnail ||
											"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80"
										}
										alt={proj.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
										<button
											type="button"
											onClick={() => handleToggleFeatured(proj)}
											className={`p-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors backdrop-blur-md ${
												proj.featured
													? "bg-amber-500/20 border-amber-500/40 text-amber-300"
													: "bg-slate-950/80 border-slate-800 text-slate-500 hover:text-white"
											}`}
											title={proj.featured ? "Featured Project" : "Mark as Featured"}
										>
											<Star className="w-3.5 h-3.5 fill-current" />
										</button>
										<span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold backdrop-blur-md">
											{proj.category}
										</span>
									</div>
								</div>

								<div>
									<h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
										{proj.title}
									</h4>
									<p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
										{proj.description}
									</p>
								</div>

								<div className="flex flex-wrap gap-1.5 pt-1">
									{(proj.technologies || []).slice(0, 4).map((tech, i) => (
										<span
											key={i}
											className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 text-[10px]"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							<div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800/80 text-xs">
								<div className="flex items-center gap-2">
									{proj.liveUrl && (
										<a
											href={proj.liveUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-cyan-400 hover:text-cyan-300 p-1 rounded-md hover:bg-slate-900"
											title="Live Preview"
										>
											<ExternalLink className="w-4 h-4" />
										</a>
									)}
									{proj.githubClient && (
										<a
											href={proj.githubClient}
											target="_blank"
											rel="noopener noreferrer"
											className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-900"
											title="Source Code"
										>
											<Code className="w-4 h-4" />
										</a>
									)}
								</div>

								<div className="flex items-center gap-1.5">
									<button
										onClick={() => handleOpenEdit(proj)}
										className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors cursor-pointer"
										title="Edit Project"
									>
										<Edit2 className="w-3.5 h-3.5" />
									</button>
									<button
										onClick={() => handleDelete(proj.id)}
										className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
										title="Delete Project"
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
					<FolderKanban className="w-10 h-10 text-slate-500 mx-auto" />
					<p className="text-slate-300 text-sm font-semibold">
						No portfolio projects found.
					</p>
					<p className="text-slate-500 text-xs max-w-sm mx-auto">
						Click the &quot;Add Project&quot; button above to publish your first case study.
					</p>
				</div>
			)}

			{/* create or edit project modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
					<div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/40 p-6 md:p-8 shadow-[0_0_50px_rgba(6,182,212,0.25)] space-y-5 text-white max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-950 border border-slate-800 cursor-pointer"
						>
							<X className="w-4 h-4" />
						</button>

						<div>
							<span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
								{editingProjectId ? "Update Showcase" : "Create Showcase"}
							</span>
							<h3 className="text-xl font-black mt-1">
								{editingProjectId ? "Edit Portfolio Project" : "New Portfolio Project"}
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

						<form onSubmit={handleSubmitProject} className="space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Project Title *
									</label>
									<input
										type="text"
										required
										value={projectForm.title}
										onChange={(e) =>
											setProjectForm({
												...projectForm,
												title: e.target.value,
												slug:
													projectForm.slug ||
													e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
											})
										}
										placeholder="e.g. NextGen SaaS Platform"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										URL Slug *
									</label>
									<input
										type="text"
										required
										value={projectForm.slug}
										onChange={(e) =>
											setProjectForm({ ...projectForm, slug: e.target.value })
										}
										placeholder="e.g. nextgen-saas-platform"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Category *
									</label>
									<select
										value={projectForm.category}
										onChange={(e) =>
											setProjectForm({ ...projectForm, category: e.target.value })
										}
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									>
										<option value="Full-Stack Web">Full-Stack Web</option>
										<option value="Frontend">Frontend UI</option>
										<option value="SaaS Architecture">SaaS Architecture</option>
										<option value="Mobile App">Mobile App</option>
										<option value="AI & Automation">AI & Automation</option>
									</select>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Thumbnail Image URL *
									</label>
									<input
										type="text"
										required
										value={projectForm.thumbnail}
										onChange={(e) =>
											setProjectForm({
												...projectForm,
												thumbnail: e.target.value,
											})
										}
										placeholder="https://..."
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1">
									Description *
								</label>
								<textarea
									rows={3}
									required
									value={projectForm.description}
									onChange={(e) =>
										setProjectForm({
											...projectForm,
											description: e.target.value,
										})
									}
									placeholder="Comprehensive overview of architecture, features and impact..."
									className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
								/>
							</div>

							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1">
									Technologies (comma-separated) *
								</label>
								<input
									type="text"
									required
									value={projectForm.technologies}
									onChange={(e) =>
										setProjectForm({
											...projectForm,
											technologies: e.target.value,
										})
									}
									placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
									className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Live Deployment URL
									</label>
									<input
										type="text"
										value={projectForm.liveUrl}
										onChange={(e) =>
											setProjectForm({
												...projectForm,
												liveUrl: e.target.value,
											})
										}
										placeholder="https://example.com"
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										GitHub Source Repository
									</label>
									<input
										type="text"
										value={projectForm.githubClient}
										onChange={(e) =>
											setProjectForm({
												...projectForm,
												githubClient: e.target.value,
											})
										}
										placeholder="https://github.com/..."
										className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
									/>
								</div>
							</div>

							<div className="flex items-center gap-2 pt-1">
								<input
									type="checkbox"
									id="featuredProj"
									checked={projectForm.featured}
									onChange={(e) =>
										setProjectForm({
											...projectForm,
											featured: e.target.checked,
										})
									}
									className="w-4 h-4 rounded text-cyan-400 focus:ring-0 bg-slate-950 border-slate-800 cursor-pointer"
								/>
								<label
									htmlFor="featuredProj"
									className="text-xs text-slate-300 cursor-pointer font-medium"
								>
									Feature on public homepage & showcase teaser
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
									{isSubmitting ? "Saving..." : editingProjectId ? "Update Project" : "Publish Project"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
