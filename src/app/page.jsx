import React from "react";
import Link from "next/link";
import {
	Code2,
	Youtube,
	TrendingUp,
	Sparkles,
	ArrowRight,
	CheckCircle2,
	Layers,
	ShieldCheck,
	Zap,
	Send,
} from "lucide-react";

// digital agency services catalogue
const servicesData = [
	{
		id: "web-dev",
		icon: <Code2 className="w-8 h-8 text-cyan-400" />,
		title: "Full-Stack Web Development",
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
		icon: <Youtube className="w-8 h-8 text-red-400" />,
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
		icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
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
		icon: <Sparkles className="w-8 h-8 text-purple-400" />,
		title: "Technical Strategy & SEO",
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

	return (
		<div className="w-full max-w-7xl mx-auto space-y-16 md:space-y-24 py-4 md:py-8">
			{/* hero section */}
			<section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071329] via-[#0c1f42] to-[#050d1a] border border-slate-800/80 p-8 md:p-14 text-center shadow-2xl">
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-4xl mx-auto space-y-6">
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-semibold shadow-inner">
						<Sparkles className="w-4 h-4 text-cyan-400" />
						Full-Service Digital Agency & Engineering Studio
					</div>

					<h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-tight">
						We Build High-Impact{" "}
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
							Web Applications,
						</span>{" "}
						YouTube Automation & Digital Growth.
					</h1>

					<p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
						From scalable full-stack software to revenue-generating YouTube
						channels and data-driven marketing funnels, we provide end-to-end
						solutions designed to accelerate your business.
					</p>

					{/* call to action buttons */}
					<div className="flex flex-wrap items-center justify-center gap-4 pt-4">
						<Link
							href="/#services"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm md:text-base hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95"
						>
							Explore Services
							<ArrowRight className="w-4 h-4" />
						</Link>

						<Link
							href="/portfolio"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 text-cyan-300 font-bold text-sm md:text-base border border-cyan-500/40 hover:bg-slate-800 hover:border-cyan-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
						>
							<Layers className="w-4 h-4" />
							View Developer Portfolio
						</Link>

						<Link
							href="/#consultation"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 text-slate-200 font-semibold text-sm md:text-base border border-slate-700 hover:bg-slate-700 transition-all duration-300"
						>
							Get a Free Quote
						</Link>
					</div>

					{/* quick feature highlights */}
					<div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs md:text-sm text-slate-400">
						<div className="flex items-center gap-2">
							<ShieldCheck className="w-4 h-4 text-emerald-400" />
							<span>Enterprise-Grade Code</span>
						</div>
						<div className="flex items-center gap-2">
							<Zap className="w-4 h-4 text-cyan-400" />
							<span>Ultra-Fast Delivery</span>
						</div>
						<div className="flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 text-teal-400" />
							<span>Guaranteed ROI & Support</span>
						</div>
					</div>
				</div>
			</section>

			{/* services section */}
			<section id="services" className="space-y-10 scroll-mt-20">
				<div className="text-center max-w-3xl mx-auto space-y-3">
					<h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
						Our Core Agency Services
					</h2>
					<p className="text-slate-400 text-sm md:text-base">
						Specialized solutions crafted to bring technical excellence, audience
						attention, and commercial success to your brand.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{servicesData.map((service) => (
						<div
							key={service.id}
							className={`relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-md border ${service.border} p-6 md:p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-xl group`}
						>
							<div
								className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
							/>

							<div className="relative z-10 space-y-4">
								<div className="flex items-center justify-between">
									<div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-md">
										{service.icon}
									</div>
									<span className="text-[11px] font-bold tracking-wider text-slate-400 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700">
										{service.category}
									</span>
								</div>

								<h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
									{service.title}
								</h3>

								<p className="text-slate-300 text-sm leading-relaxed">
									{service.description}
								</p>

								<div className="space-y-2 pt-2">
									{service.features.map((feature, idx) => (
										<div
											key={idx}
											className="flex items-center gap-2.5 text-xs md:text-sm text-slate-300"
										>
											<CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
											<span>{feature}</span>
										</div>
									))}
								</div>
							</div>

							<div className="relative z-10 pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
								<Link
									href="/contact"
									className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
								>
									Request Service
									<ArrowRight className="w-4 h-4" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* portfolio showcase teaser banner */}
			<section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 border border-cyan-500/40 p-8 md:p-12 shadow-2xl">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-8">
					<div className="space-y-3 text-center lg:text-left max-w-2xl">
						<span className="text-xs font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
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
						className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-base transition-all duration-300 shadow-lg shadow-cyan-400/25 hover:scale-105 active:scale-95 flex-shrink-0"
					>
						Explore Full Portfolio
						<ArrowRight className="w-5 h-5" />
					</Link>
				</div>
			</section>

			{/* client testimonials */}
			<section className="space-y-8">
				<div className="text-center max-w-2xl mx-auto space-y-2">
					<h2 className="text-2xl md:text-3xl font-extrabold text-white">
						What Our Clients Say
					</h2>
					<p className="text-slate-400 text-sm">
						Trusted by creators, startups, and established enterprises globally.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{testimonialsData.map((item, idx) => (
						<div
							key={idx}
							className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition-colors"
						>
							<p className="text-slate-300 text-sm leading-relaxed italic">
								"{item.quote}"
							</p>
							<div className="pt-4 border-t border-slate-800/80">
								<h4 className="text-white font-bold text-sm">{item.author}</h4>
								<p className="text-cyan-400 text-xs">{item.role}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* quote and consultation form */}
			<section
				id="consultation"
				className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 md:p-12 space-y-8 scroll-mt-20 max-w-4xl mx-auto"
			>
				<div className="text-center space-y-2">
					<h2 className="text-2xl md:text-3xl font-extrabold text-white">
						Start Your Project Consultation
					</h2>
					<p className="text-slate-400 text-sm">
						Tell us about your requirements. We typically respond within 12
						hours with a detailed proposal.
					</p>
				</div>

				<form
					action="https://formspree.io/f/mqaeeyzq"
					method="POST"
					className="space-y-4"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-xs font-semibold text-slate-300 mb-1">
								Your Name
							</label>
							<input
								type="text"
								name="name"
								required
								placeholder="e.g. Alex Morgan"
								className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
						<div>
							<label className="block text-xs font-semibold text-slate-300 mb-1">
								Your Email
							</label>
							<input
								type="email"
								name="email"
								required
								placeholder="e.g. alex@example.com"
								className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-xs font-semibold text-slate-300 mb-1">
								Service Needed
							</label>
							<select
								name="service"
								className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							>
								<option value="Web Development">Full-Stack Web Development</option>
								<option value="YouTube Automation">YouTube Automation</option>
								<option value="Social Media Marketing">Social Media Marketing</option>
								<option value="Technical Consulting">Technical Consulting & SEO</option>
							</select>
						</div>
						<div>
							<label className="block text-xs font-semibold text-slate-300 mb-1">
								Approximate Budget
							</label>
							<input
								type="text"
								name="budget"
								placeholder="e.g. $500 - $2,000"
								className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-semibold text-slate-300 mb-1">
							Project Description & Timeline
						</label>
						<textarea
							name="message"
							rows={4}
							required
							placeholder="Provide details about your project goals and preferred deadline..."
							className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
						/>
					</div>

					<button
						type="submit"
						className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/25 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
					>
						<Send className="w-4 h-4" />
						Submit Consultation Request
					</button>
				</form>
			</section>
		</div>
	);
}
