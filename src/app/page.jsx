"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import {
	Code2,
	TrendingUp,
	Sparkles,
	ArrowRight,
	CheckCircle2,
	Layers,
	ShieldCheck,
	Zap,
	Send,
	ChevronDown,
} from "lucide-react";
import PricingAndPayment from "@/components/agency/PricingAndPayment";

// digital agency services catalogue
const servicesData = [
	{
		id: "web-dev",
		icon: <Code2 className="w-6 h-6 text-cyan-400" />,
		title: "Web Development",
		category: "WEB DEVELOPMENT",
		description:
			"Production-grade, fast SSR web applications built with Next.js, React, Node.js, and clean modular architecture.",
		features: [
			"Modern Next.js & React 19 Frontend",
			"Secure REST & GraphQL Backend APIs",
			"PostgreSQL / MongoDB Database Design",
			"Mobile-First Responsive Layouts",
		],
		gradient: "from-cyan-500/20 to-blue-600/20",
		border: "border-cyan-500/30",
	},
	{
		id: "yt-auto",
		icon: <FaYoutube className="w-6 h-6 text-red-400" />,
		title: "YouTube Automation",
		category: "CONTENT & GROWTH",
		description:
			"End-to-end channel creation, high-retention scripting, voiceover sync, professional editing, and thumbnail design.",
		features: [
			"High-CPM Niche & Keyword Research",
			"Engaging Scriptwriting & Storyboarding",
			"Full HD/4K Video Editing & Sound Design",
			"SEO Titles, Tags & Click-Worthy Thumbnails",
		],
		gradient: "from-red-500/20 to-pink-600/20",
		border: "border-red-500/30",
	},
	{
		id: "smm-growth",
		icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
		title: "Social Media Marketing",
		category: "PAID ADS & ORGANIC",
		description:
			"Targeted advertising funnels, conversion optimization, and brand scaling across Meta, Google, and LinkedIn.",
		features: [
			"High-ROI Meta & Google Ad Campaigns",
			"Customer Journey & Sales Funnel Design",
			"Audience Retargeting & Pixel Tracking",
			"In-depth Weekly Performance Reports",
		],
		gradient: "from-emerald-500/20 to-teal-600/20",
		border: "border-emerald-500/30",
	},
	{
		id: "tech-consulting",
		icon: <Sparkles className="w-6 h-6 text-purple-400" />,
		title: "Technical SEO & Strategy",
		category: "CONSULTING & AUDITS",
		description:
			"Comprehensive digital audits, SEO architecture, performance optimizations, and tailored growth roadmaps.",
		features: [
			"Core Web Vitals & Speed Optimization",
			"Technical SEO & Content Strategy",
			"Scalable Cloud & CI/CD Architecture",
			"One-on-One Technical Consultation",
		],
		gradient: "from-purple-500/20 to-indigo-600/20",
		border: "border-purple-500/30",
	},
];

// client testimonial highlights
const testimonialsData = [
	{
		quote:
			"Provash and his agency team delivered our web application weeks ahead of schedule. The code quality, speed, and design were impeccable.",
		author: "Marcus Vance",
		role: "Founder, Apex SaaS",
		rating: 5,
	},
	{
		quote:
			"Our automated YouTube channel gained over 50,000 subscribers in 4 months under their content management and SEO strategy.",
		author: "Sarah Jenkins",
		role: "Digital Media Entrepreneur",
		rating: 5,
	},
	{
		quote:
			"The paid marketing funnels reduced our customer acquisition cost by 38% in the first month. Highly recommended for scaling businesses.",
		author: "David Thorne",
		role: "Marketing Director, Thorne Commerce",
		rating: 5,
	},
];

// agency home page component
export default function HomePage() {
	// console.log("rendering agency business home page")

	// state for open service details
	const [expandedId, setExpandedId] = useState(null);

	const toggleExpand = (id) => {
		setExpandedId(expandedId === id ? null : id);
	};

	return (
		<div className="w-full space-y-16 md:space-y-24 pb-16">
			{/* full width hero banner flush with navbar */}
			<section className="w-full relative overflow-hidden bg-gradient-to-b from-[#071329] via-[#091b3a] to-slate-950 border-b border-slate-800/80 pt-8 pb-14 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 shadow-2xl">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* left column: headline, description & cta */}
						<div className="lg:col-span-7 space-y-6 text-center lg:text-left">
							<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-semibold shadow-inner">
								<Sparkles className="w-4 h-4 text-cyan-400" />
								Full-Service Digital Agency & Engineering Studio
							</div>

							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-snug">
								We Build High-Impact{" "}
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300">
									Web Applications,
								</span>{" "}
								YouTube Automation & Digital Growth.
							</h1>

							<p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
								From scalable full-stack software to revenue-generating YouTube
								channels and data-driven marketing funnels, we provide end-to-end
								solutions designed to accelerate your business.
							</p>

							{/* call to action buttons with portfolio pill aesthetic */}
							<div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
								<Link
									href="/#categories"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-xs md:text-sm border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
								>
									Explore Services
									<ArrowRight className="w-4 h-4" />
								</Link>

								<Link
									href="/portfolio"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 text-cyan-300 hover:text-white font-bold text-xs md:text-sm border border-cyan-500/50 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-md"
								>
									<Layers className="w-4 h-4" />
									View Developer Portfolio
								</Link>

								<Link
									href="/#consultation"
									className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 hover:from-cyan-700 hover:to-blue-700 text-slate-200 hover:text-white font-semibold text-xs md:text-sm border border-slate-700/80 hover:border-cyan-400 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
								>
									Get a Free Quote
								</Link>
							</div>

							{/* quick feature highlights */}
							<div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-xs text-slate-300">
								<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
									<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
									<span>Enterprise-Grade Code</span>
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
									<Zap className="w-3.5 h-3.5 text-cyan-400" />
									<span>Ultra-Fast Delivery</span>
								</div>
								<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
									<CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
									<span>Guaranteed Support</span>
								</div>
							</div>
						</div>

						{/* right column: hero illustration image */}
						<div className="lg:col-span-5 flex justify-center relative">
							<div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-500/10 rounded-full blur-3xl scale-95 pointer-events-none" />
							<div className="relative z-10 w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px] aspect-square flex items-center justify-center">
								<img
									src="/img/hero-provash.png"
									alt="Provash - Founder & Lead Full-Stack Engineer"
									className="w-full h-full object-contain filter drop-shadow-[0_10px_35px_rgba(6,182,212,0.35)] hover:scale-105 transition-transform duration-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* main content container with max-w */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
				{/* compact category row with logo, title and down arrow */}
				<section id="categories" className="space-y-8 scroll-mt-24">
					<div className="text-center max-w-3xl mx-auto space-y-2">
						<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
							Explore What We Do
						</span>
						<h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
							Our Core Service Categories
						</h2>
						<p className="text-slate-400 text-xs md:text-sm">
							Click on any category to view full technical features, scope, and deliverables.
						</p>
					</div>

					{/* 4 items in one row with portfolio glassmorphic aesthetic */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
						{servicesData.map((service) => {
							const isOpen = expandedId === service.id;
							return (
								<div
									key={service.id}
									className={`rounded-2xl transition-all duration-300 overflow-hidden flex flex-col ${
										isOpen
											? "border-2 border-cyan-400 bg-gradient-to-b from-[#0f2a5c] to-[#08132b] shadow-[0_0_30px_rgba(6,182,212,0.35)]"
											: "border border-cyan-500/25 bg-[#0d1527]/90 hover:border-cyan-400/70 hover:bg-[#0e1d38] shadow-[0_0_15px_rgba(6,182,212,0.12)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] backdrop-blur-md"
									}`}
								>
									{/* compact header: strictly logo + title + down arrow */}
									<button
										type="button"
										onClick={() => toggleExpand(service.id)}
										className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer group transition-colors"
										aria-expanded={isOpen}
									>
										<div className="flex items-center gap-3 min-w-0">
											<div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.25)] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-300 flex-shrink-0">
												{service.icon}
											</div>
											<h3 className="text-sm font-bold text-cyan-200 group-hover:text-white transition-colors truncate">
												{service.title}
											</h3>
										</div>

										<div
											className={`p-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
												isOpen ? "rotate-180 text-white bg-cyan-500/30 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "group-hover:border-cyan-400"
											}`}
										>
											<ChevronDown className="w-4 h-4" />
										</div>
									</button>

									{/* expandable detailed view */}
									{isOpen && (
										<div className="p-4 pt-0 border-t border-cyan-500/30 space-y-4 animate-in fade-in duration-200">
											<p className="text-slate-300 text-xs leading-relaxed pt-3">
												{service.description}
											</p>

											<div className="space-y-2">
												<span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
													Key Deliverables
												</span>
												<div className="space-y-1.5">
													{service.features.map((feature, idx) => (
														<div
															key={idx}
															className="flex items-center gap-2 text-xs text-slate-300"
														>
															<CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
															<span>{feature}</span>
														</div>
													))}
												</div>
											</div>

											<div className="pt-2">
												<Link
													href="/#pricing"
													className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 hover:text-white border border-cyan-500/40 font-bold text-xs shadow-[0_0_10px_rgba(6,182,212,0.25)] transition-all duration-200"
												>
													<span>Select Service Plan</span>
													<ArrowRight className="w-3.5 h-3.5" />
												</Link>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</section>

				{/* pricing plans and online payment section */}
				<PricingAndPayment />

				{/* portfolio showcase teaser banner with MainBanner styling */}
				<section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1b3d] via-[#0f2a5c] to-[#08132b] border border-slate-800 border-t-2 border-r-2 border-t-cyan-400/40 border-r-cyan-400/40 p-8 md:p-12 shadow-[0_0_35px_rgba(6,182,212,0.25)]">
					<div className="absolute -left-10 -top-10 w-72 h-72 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

					<div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
						<div className="space-y-3 text-center lg:text-left max-w-2xl">
							<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
								Personal Works & Credentials
							</span>
							<h2 className="text-2xl md:text-3xl font-extrabold text-white">
								Looking for Provash’s Personal Projects & Tech Stack?
							</h2>
							<p className="text-slate-300 text-sm leading-relaxed">
								Our founder’s full developer portfolio, interactive tech stack
								experience, statistics, and GitHub repositories are preserved and
								accessible with a single click.
							</p>
						</div>

						<Link
							href="/portfolio"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
						>
							Explore Full Portfolio
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</section>

				{/* client testimonials with ServiceCard aesthetic */}
				<section className="space-y-8">
					<div className="text-center max-w-2xl mx-auto space-y-2">
						<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
							Client Reviews
						</span>
						<h2 className="text-2xl md:text-3xl font-extrabold text-white">
							What Our Clients Say
						</h2>
						<p className="text-slate-400 text-xs md:text-sm">
							Trusted by creators, startups, and established enterprises globally.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{testimonialsData.map((item, idx) => (
							<div
								key={idx}
								className="rounded-2xl bg-[#0d1527]/90 backdrop-blur-xl border border-cyan-500/25 p-6 flex flex-col justify-between space-y-4 shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-300"
							>
								<p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">
									"{item.quote}"
								</p>
								<div className="pt-4 border-t border-cyan-500/20">
									<h4 className="text-cyan-200 font-bold text-sm">{item.author}</h4>
									<p className="text-slate-400 text-xs">{item.role}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* quote and consultation form with portfolio MainBanner glass aesthetic */}
				<section
					id="consultation"
					className="rounded-3xl bg-gradient-to-br from-[#0b1b3d] via-[#0f2a5c] to-[#08132b] border border-slate-800 border-t-2 border-r-2 border-t-cyan-400/30 border-r-cyan-400/30 p-6 md:p-10 space-y-8 scroll-mt-24 max-w-4xl mx-auto shadow-[0_0_35px_rgba(6,182,212,0.2)] relative overflow-hidden"
				>
					<div className="absolute -left-10 -top-10 w-72 h-72 bg-teal-600/5 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

					<div className="relative z-10 text-center space-y-2">
						<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
							Get In Touch
						</span>
						<h2 className="text-2xl md:text-3xl font-extrabold text-white">
							Start Your Project Consultation
						</h2>
						<p className="text-slate-300 text-xs md:text-sm">
							Tell us about your requirements. We typically respond within 12
							hours with a detailed proposal.
						</p>
					</div>

					<form
						action="https://formspree.io/f/mqaeeyzq"
						method="POST"
						className="relative z-10 space-y-4"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Your Name
								</label>
								<input
									type="text"
									name="name"
									required
									placeholder="e.g. Alex Morgan"
									className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Your Email
								</label>
								<input
									type="email"
									name="email"
									required
									placeholder="e.g. alex@example.com"
									className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Service Needed
								</label>
								<select
									name="service"
									className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-slate-200 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
								>
									<option value="Web Development" className="bg-slate-900">Full-Stack Web Development</option>
									<option value="YouTube Automation" className="bg-slate-900">YouTube Automation</option>
									<option value="Social Media Marketing" className="bg-slate-900">Social Media Marketing</option>
									<option value="Technical Consulting" className="bg-slate-900">Technical Consulting & SEO</option>
								</select>
							</div>
							<div>
								<label className="block text-xs font-semibold text-slate-300 mb-1.5">
									Approximate Budget
								</label>
								<input
									type="text"
									name="budget"
									placeholder="e.g. $500 - $2,000"
									className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-semibold text-slate-300 mb-1.5">
								Project Description & Timeline
							</label>
							<textarea
								name="message"
								rows={4}
								required
								placeholder="Provide details about your project goals and preferred deadline..."
								className="w-full px-4 py-2.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
							/>
						</div>

						<button
							type="submit"
							className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
						>
							<Send className="w-4 h-4" />
							Submit Consultation Request
						</button>
					</form>
				</section>
			</div>
		</div>
	);
}
