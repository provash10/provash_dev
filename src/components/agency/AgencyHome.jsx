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
	Star,
	Award,
	Clock,
	Target,
	Cpu,
	CheckCheck,
	Phone,
	Mail,
	MapPin,
	MessageSquare,
	Briefcase,
	ExternalLink,
	HelpCircle,
	Check,
} from "lucide-react";
import PricingAndPayment from "@/components/agency/PricingAndPayment";
import Footer from "@/components/HeaderFooter/Footer/Footer";

// trusted tech stack marquee data
const techStackList = [
	{ name: "Next.js 15", category: "Full-Stack" },
	{ name: "React 19", category: "Frontend" },
	{ name: "TypeScript", category: "Type Safety" },
	{ name: "Node.js", category: "Backend" },
	{ name: "PostgreSQL", category: "Database" },
	{ name: "Tailwind CSS", category: "Styling" },
	{ name: "YouTube Studio", category: "Content" },
	{ name: "Meta Ads", category: "Marketing" },
	{ name: "Google Cloud", category: "Cloud" },
	{ name: "bKash & Stripe", category: "Payments" },
];

// markivo three core agency pillars
const agencyPillars = [
	{
		id: "influencer",
		title: "Influencer & Content Solutions",
		badge: "Content Ops",
		description:
			"High-CTR channel automation, viral hooks, retention editing, and organic subscriber growth engines tailored for creators and brands.",
		metric: "+300%",
		metricLabel: "Average View Growth",
		icon: <FaYoutube className="w-6 h-6 text-red-400" />,
		accentColor: "border-red-500/30 group-hover:border-red-400/70",
		glowColor: "from-red-500/20 via-pink-500/10 to-transparent",
		linkText: "Explore Media Ops",
		linkHref: "/#services",
	},
	{
		id: "growth",
		title: "Your Growth, Our Top Priority",
		badge: "High ROI",
		description:
			"Data-driven sales funnels, conversion rate optimization, and transparent weekly founder sprints that deliver measurable revenue.",
		metric: "3.4X",
		metricLabel: "Average Ad ROAS",
		icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
		accentColor: "border-emerald-500/30 group-hover:border-emerald-400/70",
		glowColor: "from-emerald-500/20 via-teal-500/10 to-transparent",
		linkText: "View Growth Solutions",
		linkHref: "/#services",
	},
	{
		id: "innovation",
		title: "Innovating For Your Success",
		badge: "Full-Stack",
		description:
			"Scalable server-side rendered web applications, robust APIs, and cloud infrastructure engineered to handle high user concurrency.",
		metric: "<0.8s",
		metricLabel: "Sub-Second Latency",
		icon: <Code2 className="w-6 h-6 text-cyan-400" />,
		accentColor: "border-cyan-500/30 group-hover:border-cyan-400/70",
		glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
		linkText: "Discover Web Engineering",
		linkHref: "/#services",
	},
];

// digital agency exclusive services catalog
const exclusiveServices = [
	{
		id: "web-dev",
		title: "Full-Stack Web Development",
		category: "ENTERPRISE ENGINEERING",
		badge: "Enterprise Grade",
		icon: <Code2 className="w-6 h-6 text-cyan-400" />,
		description:
			"Production-grade, fast SSR web applications built with Next.js 15, React 19, TypeScript, and clean modular backend architecture.",
		deliverables: [
			"Modern Next.js 15 & React 19 SSR Architecture",
			"Secure REST & GraphQL APIs with Node.js",
			"PostgreSQL / MongoDB Database Design & Optimization",
			"Mobile-First Responsive Layouts & Tailwind CSS",
			"End-to-End Authentication & Role-Based Access",
			"Automated CI/CD Deployment on Vercel / Cloud",
		],
		gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
		border: "border-cyan-500/30 hover:border-cyan-400",
	},
	{
		id: "yt-auto",
		title: "YouTube Channel Automation & Ops",
		category: "CONTENT & AUDIENCE",
		badge: "High Retention",
		icon: <FaYoutube className="w-6 h-6 text-red-400" />,
		description:
			"End-to-end channel creation, high-retention scripting, voiceover sync, cinematic 4K editing, and click-worthy thumbnail packaging.",
		deliverables: [
			"High-CPM Niche & Competitor Keyword Research",
			"Engaging Viral Storyboarding & Hook Scriptwriting",
			"Cinematic 4K Video Editing & Dynamic Sound Design",
			"High-CTR Thumbnails & Metadata SEO Optimization",
			"Weekly Channel Analytics & Retention Tracking",
			"Monetization & Brand Sponsorship Strategy",
		],
		gradient: "from-red-500/20 via-pink-600/10 to-transparent",
		border: "border-red-500/30 hover:border-red-400",
	},
	{
		id: "smm-growth",
		title: "Social Media Marketing & Paid Ads",
		category: "GROWTH MARKETING",
		badge: "High ROI",
		icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
		description:
			"Targeted advertising funnels, conversion optimization, and brand scaling across Meta Ads, Google Ads, and LinkedIn.",
		deliverables: [
			"High-ROI Meta & Google Ad Campaign Strategy",
			"Customer Journey & Multi-Step Sales Funnel Design",
			"Audience Retargeting & Advanced Pixel Tracking",
			"A/B Creative Testing & Ad Copy Optimization",
			"In-Depth Weekly Performance Reports & ROAS Audits",
			"Omni-Channel Lead Generation & Email Nurturing",
		],
		gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
		border: "border-emerald-500/30 hover:border-emerald-400",
	},
	{
		id: "tech-seo",
		title: "Technical SEO & CRO Optimization",
		category: "SEARCH & AUDITS",
		badge: "Core Vitals",
		icon: <Target className="w-6 h-6 text-purple-400" />,
		description:
			"Comprehensive digital audits, Google Core Web Vitals optimization, schema architecture, and conversion rate engineering.",
		deliverables: [
			"Google Core Web Vitals & Sub-Second Speed Optimization",
			"Technical On-Page, Schema & Semantic Structure",
			"Keyword Research & Search Intent Mapping",
			"Conversion Rate Optimization (CRO) Heatmap Audits",
			"Search Console & Google Analytics 4 Setup",
			"One-on-One Technical Consultation & Scaling Roadmap",
		],
		gradient: "from-purple-500/20 via-indigo-600/10 to-transparent",
		border: "border-purple-500/30 hover:border-purple-400",
	},
];

// markivo showcase portfolio case studies
const projectCaseStudies = [
	{
		title: "SaaS Workflow & Analytics Platform",
		category: "Full-Stack Web App",
		description:
			"Engineered a scalable multi-tenant SaaS application with real-time dashboard analytics, role-based auth, and automated Stripe/bKash billing.",
		impact: "Processed $120k+ GMV with <350ms response latency",
		tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Tailwind CSS"],
		badgeColor: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
	},
	{
		title: "Automated YouTube Media Network",
		category: "Content Ops & Automation",
		description:
			"Built and managed a cashcow media channel with automated scripting pipelines, sound design, high-CTR thumbnails, and viral retention editing.",
		impact: "Scaled from zero to 120K+ subscribers with 18M+ views",
		tech: ["YouTube Studio", "Premiere Pro", "AI Scripting", "Viral SEO"],
		badgeColor: "bg-red-950/80 text-red-300 border-red-500/40",
	},
	{
		title: "E-Commerce 3X ROAS Ads Funnel",
		category: "Performance Marketing",
		description:
			"Designed and executed full-funnel advertising across Meta and Google Ads with custom landing pages and conversion tracking.",
		impact: "Delivered 3.4X return on ad spend and cut CAC by 38%",
		tech: ["Meta Ads", "Google Ads", "Funnel CRO", "Pixel Tracking"],
		badgeColor: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
	},
];

// markivo client testimonials
const clientTestimonials = [
	{
		quote:
			"Provash and his agency team delivered our web application weeks ahead of schedule. The code quality, speed, and design were impeccable.",
		author: "Marcus Vance",
		role: "Founder, Apex SaaS",
		rating: 5,
		avatarBg: "from-cyan-500 to-blue-600",
	},
	{
		quote:
			"Our automated YouTube channel gained over 50,000 subscribers in 4 months under their content management and SEO strategy.",
		author: "Sarah Jenkins",
		role: "Digital Media Entrepreneur",
		rating: 5,
		avatarBg: "from-red-500 to-pink-600",
	},
	{
		quote:
			"The paid marketing funnels reduced our customer acquisition cost by 38% in the first month. Highly recommended for scaling businesses.",
		author: "David Thorne",
		role: "Marketing Director, Thorne Commerce",
		rating: 5,
		avatarBg: "from-emerald-500 to-teal-600",
	},
];

// markivo faq items
const faqItems = [
	{
		q: "What services does your digital agency provide?",
		a: "We offer end-to-end digital engineering and growth services: modern Full-Stack Web Development (Next.js, React, Node.js, PostgreSQL), YouTube Channel Automation & Video Ops, Social Media Marketing & High-ROI Paid Ads, and Technical SEO & Conversion Rate Optimization.",
	},
	{
		q: "How long does it take to complete a website project?",
		a: "Standard MVP websites and landing pages typically take 5 to 7 days. Full-featured SaaS or multi-page custom applications with database and payment integrations generally take 2 to 4 weeks depending on feature requirements.",
	},
	{
		q: "Do you provide ongoing support after project launch?",
		a: "Yes! Every project includes complimentary post-launch support and maintenance (from 1 month up to ongoing retainer support). We handle updates, security patches, performance monitoring, and continuous scaling.",
	},
	{
		q: "What payment methods do you accept?",
		a: "We support both local and international payment methods: bKash, Nagad, Visa, Mastercard, and international bank transfers. Payments are structured via safe milestone-based delivery.",
	},
];

// agency home page component
export default function AgencyHome() {
	// console.log("rendering markivo styled agency home page")

	// faq accordion state
	const [activeFaq, setActiveFaq] = useState(0);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	return (
		<div className="w-full space-y-16 md:space-y-24 bg-[#050b17] text-white" suppressHydrationWarning>
			{/* 1. full width hero banner flush with navbar (kept untouched as requested) */}
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
									href="/#services"
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

			{/* 2. markivo trusted companies & technology marquee strip */}
			<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="rounded-2xl bg-[#09152a]/80 backdrop-blur-md border border-cyan-500/25 p-5 md:p-6 shadow-[0_4px_30px_rgba(6,182,212,0.12)]">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-2.5 text-cyan-300 font-bold text-xs uppercase tracking-wider flex-shrink-0">
							<Sparkles className="w-4 h-4 text-cyan-400" />
							<span>Trusted by 100+ Companies & Creators:</span>
						</div>
						<div className="flex flex-wrap items-center justify-center md:justify-end gap-2 text-xs">
							{techStackList.map((tech, idx) => (
								<div
									key={idx}
									className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-cyan-500/20 hover:border-cyan-400 text-slate-300 hover:text-white transition-all duration-200 cursor-default hover:scale-105 shadow-[0_0_10px_rgba(6,182,212,0.08)]"
								>
									<span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
									<span className="font-semibold">{tech.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* main content container with max-w-7xl */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24" suppressHydrationWarning>
				{/* 3. markivo 3 core pillars of agency excellence */}
				<section className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{agencyPillars.map((pillar) => (
							<div
								key={pillar.id}
								className={`group relative rounded-3xl p-6 md:p-8 bg-[#09152a]/85 backdrop-blur-xl border ${pillar.accentColor} shadow-[0_4px_25px_rgba(6,182,212,0.1)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
							>
								<div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${pillar.glowColor} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

								<div className="relative z-10 space-y-4">
									<div className="flex items-center justify-between">
										<div className="p-3 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-300">
											{pillar.icon}
										</div>
										<span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
											{pillar.badge}
										</span>
									</div>

									<h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
										{pillar.title}
									</h3>

									<p className="text-slate-300 text-xs md:text-sm leading-relaxed">
										{pillar.description}
									</p>
								</div>

								<div className="relative z-10 pt-6 mt-6 border-t border-cyan-500/20 flex items-center justify-between">
									<div>
										<span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
											{pillar.metric}
										</span>
										<p className="text-[10px] text-slate-400 font-medium">
											{pillar.metricLabel}
										</p>
									</div>

									<Link
										href={pillar.linkHref}
										className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white group-hover:translate-x-1 transition-all"
									>
										<span>{pillar.linkText}</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 4. markivo our exclusive services showcase */}
				<section id="services" className="space-y-10 scroll-mt-24">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<Sparkles className="w-4 h-4 text-cyan-400" />
							WHAT WE DO
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Our Exclusive Services
						</h2>
						<p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
							We combine high-performance software engineering with viral content operations and high-ROI advertising to build market leaders.
						</p>
					</div>

					{/* markivo 4 service cards grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
						{exclusiveServices.map((service) => (
							<div
								key={service.id}
								className={`group relative rounded-3xl p-6 md:p-8 bg-[#09152a]/90 backdrop-blur-xl border ${service.border} shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_40px_rgba(6,182,212,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
							>
								<div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${service.gradient} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

								<div className="relative z-10 space-y-5">
									<div className="flex items-center justify-between">
										<div className="p-3.5 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-300">
											{service.icon}
										</div>
										<span className="text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
											{service.badge}
										</span>
									</div>

									<div>
										<span className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-bold">
											{service.category}
										</span>
										<h3 className="text-xl md:text-2xl font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors">
											{service.title}
										</h3>
										<p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2.5">
											{service.description}
										</p>
									</div>

									{/* deliverables list */}
									<div className="space-y-2 pt-2">
										<span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
											<CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
											Key Deliverables & Specifications
										</span>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
											{service.deliverables.map((item, idx) => (
												<div
													key={idx}
													className="flex items-start gap-2 text-xs text-slate-300"
												>
													<CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
													<span>{item}</span>
												</div>
											))}
										</div>
									</div>
								</div>

								{/* card footer cta */}
								<div className="relative z-10 pt-6 mt-6 border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3">
									<Link
										href="/#pricing"
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-xs border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
									>
										<span>Select Service Plan</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>

									<Link
										href="/#consultation"
										className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 transition-colors"
									>
										<span>Custom Proposal</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 5. markivo key stats and impact numbers counter band */}
				<section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071329] via-[#091f42] to-[#071329] border border-cyan-500/40 p-8 md:p-12 shadow-[0_0_40px_rgba(6,182,212,0.25)]">
					<div className="absolute -left-10 -top-10 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

					<div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-cyan-500/25">
						<div className="space-y-1.5 px-3">
							<span className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
								620+
							</span>
							<p className="text-xs sm:text-sm font-bold text-white">
								Projects Completed
							</p>
							<p className="text-[11px] text-slate-400">Software & Media Systems</p>
						</div>

						<div className="space-y-1.5 px-3 pt-4 md:pt-0">
							<span className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
								725+
							</span>
							<p className="text-xs sm:text-sm font-bold text-white">
								Satisfied Clients
							</p>
							<p className="text-[11px] text-slate-400">Global Startups & Brands</p>
						</div>

						<div className="space-y-1.5 px-3 pt-4 md:pt-0">
							<span className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
								15M+
							</span>
							<p className="text-xs sm:text-sm font-bold text-white">
								YouTube Views & Reach
							</p>
							<p className="text-[11px] text-slate-400">Organic Video Audience</p>
						</div>

						<div className="space-y-1.5 px-3 pt-4 md:pt-0">
							<span className="text-3xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
								99.8%
							</span>
							<p className="text-xs sm:text-sm font-bold text-white">
								Client Satisfaction
							</p>
							<p className="text-[11px] text-slate-400">On-Time Sprint Delivery</p>
						</div>
					</div>
				</section>

				{/* 6. markivo we are a digital agency with added value for your business */}
				<section className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* left: compelling agency story & value pillars */}
						<div className="lg:col-span-7 space-y-6">
							<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_12px_rgba(6,182,212,0.25)]">
								<Award className="w-4 h-4 text-cyan-400" />
								ABOUT OUR AGENCY
							</div>

							<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
								We Are a Digital Agency with Added Value For Your Business
							</h2>

							<p className="text-slate-300 text-xs md:text-sm leading-relaxed">
								Unlike traditional agencies that outsource your work to unknown third parties or burden you with slow communication, we unite high-speed full-stack engineering with data-backed media strategies under direct founder supervision.
							</p>

							{/* markivo 3 value feature boxes */}
							<div className="space-y-4 pt-2">
								<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-4 sm:p-5 flex items-start gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
									<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
										<Cpu className="w-5 h-5 text-cyan-400" />
									</div>
									<div className="space-y-1">
										<h4 className="text-sm font-bold text-white">Proven Results & Zero Technical Debt</h4>
										<p className="text-slate-300 text-xs leading-relaxed">
											We build modern server-rendered Next.js codebases designed for blazing speed, high security, and seamless horizontal scaling.
										</p>
									</div>
								</div>

								<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-4 sm:p-5 flex items-start gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
									<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
										<Target className="w-5 h-5 text-cyan-400" />
									</div>
									<div className="space-y-1">
										<h4 className="text-sm font-bold text-white">Trusted Partner & Direct Founder Collaboration</h4>
										<p className="text-slate-300 text-xs leading-relaxed">
											Work directly with lead engineer Provash and our core studio. Regular sprint demos, transparent feedback loops, and rapid iterations.
										</p>
									</div>
								</div>

								<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-4 sm:p-5 flex items-start gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
									<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
										<Clock className="w-5 h-5 text-cyan-400" />
									</div>
									<div className="space-y-1">
										<h4 className="text-sm font-bold text-white">Global Delivery & Dedicated 24/7 Support</h4>
										<p className="text-slate-300 text-xs leading-relaxed">
											Serving startups and creators across USA, Europe, and Bangladesh with easy online payments and dedicated ongoing support.
										</p>
									</div>
								</div>
							</div>

							<div className="pt-2">
								<Link
									href="/portfolio"
									className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/90 text-cyan-300 hover:text-white font-bold text-xs md:text-sm border border-cyan-500/50 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
								>
									<Layers className="w-4 h-4" />
									<span>Explore Provash's Credentials & Full Portfolio</span>
									<ArrowRight className="w-4 h-4" />
								</Link>
							</div>
						</div>

						{/* right: interactive high-impact agency credentials card */}
						<div className="lg:col-span-5 relative">
							<div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-teal-500/15 rounded-3xl blur-3xl scale-95 pointer-events-none" />

							<div className="relative rounded-3xl bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-6 md:p-8 shadow-[0_0_40px_rgba(6,182,212,0.3)] space-y-6">
								<div className="flex items-center justify-between">
									<span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
										Verified Agency Hub
									</span>
									<div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
										<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
										<span>Available for Sprints</span>
									</div>
								</div>

								{/* founder profile preview */}
								<div className="flex items-center gap-4 pt-2">
									<div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex-shrink-0 bg-slate-900">
										<img
											src="/img/hero-provash.png"
											alt="Provash Sharma - Founder & Lead Engineer"
											className="w-full h-full object-cover object-top"
										/>
									</div>
									<div>
										<h3 className="text-lg font-bold text-white">Provash Sharma</h3>
										<p className="text-xs text-cyan-300 font-medium">Founder & Principal Full-Stack Engineer</p>
										<div className="flex items-center gap-1 text-amber-400 text-xs pt-1">
											{[...Array(5)].map((_, i) => (
												<Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
											))}
											<span className="text-white font-bold ml-1 text-xs">4.9 / 5.0</span>
										</div>
									</div>
								</div>

								{/* verified impact grid */}
								<div className="grid grid-cols-2 gap-3 pt-2">
									<div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-3.5 space-y-1 text-center">
										<span className="text-2xl font-black text-cyan-300">+250%</span>
										<p className="text-[11px] text-slate-300 font-medium">Client Traffic Growth</p>
									</div>
									<div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-3.5 space-y-1 text-center">
										<span className="text-2xl font-black text-emerald-400">100%</span>
										<p className="text-[11px] text-slate-300 font-medium">On-Time Milestones</p>
									</div>
									<div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-3.5 space-y-1 text-center">
										<span className="text-2xl font-black text-teal-300">50+</span>
										<p className="text-[11px] text-slate-300 font-medium">Live Repositories</p>
									</div>
									<div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-3.5 space-y-1 text-center">
										<span className="text-2xl font-black text-blue-300">24/7</span>
										<p className="text-[11px] text-slate-300 font-medium">Sprint Accessibility</p>
									</div>
								</div>

								<div className="pt-2">
									<Link
										href="/#consultation"
										className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300"
									>
										<span>Book Strategy Consultation</span>
										<ArrowRight className="w-4 h-4" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* 7. markivo explore our projects showcase portfolio grid */}
				<section className="space-y-10">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<Briefcase className="w-4 h-4 text-cyan-400" />
							FEATURED CASE STUDIES
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Explore Our Projects
						</h2>
						<p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
							Take a closer look at the custom software and high-growth media engines we have built and scaled for clients.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{projectCaseStudies.map((project, idx) => (
							<div
								key={idx}
								className="group rounded-3xl p-6 md:p-8 bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400 shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
							>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${project.badgeColor}`}>
											{project.category}
										</span>
										<ExternalLink className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
									</div>

									<h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
										{project.title}
									</h3>

									<p className="text-slate-300 text-xs md:text-sm leading-relaxed">
										{project.description}
									</p>

									<div className="p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
										✨ <span className="text-white">{project.impact}</span>
									</div>
								</div>

								<div className="pt-6 mt-6 border-t border-cyan-500/20 space-y-4">
									<div className="flex flex-wrap gap-1.5">
										{project.tech.map((t, i) => (
											<span
												key={i}
												className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/20 text-slate-300 font-medium"
											>
												{t}
											</span>
										))}
									</div>

									<Link
										href="/portfolio"
										className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white group-hover:translate-x-1 transition-all"
									>
										<span>View Case Study Details</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						))}
					</div>

					{/* full developer portfolio banner teaser */}
					<div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#071329] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-8 md:p-10 shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col lg:flex-row items-center justify-between gap-6">
						<div className="space-y-2 text-center lg:text-left">
							<span className="text-xs font-bold uppercase tracking-wider text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40">
								Developer Showcase
							</span>
							<h3 className="text-xl md:text-2xl font-extrabold text-white">
								Want to see Provash’s Personal Projects, Tech Stack & Repositories?
							</h3>
							<p className="text-slate-300 text-xs md:text-sm max-w-2xl">
								Our founder’s full interactive portfolio, skills breakdown, experience timeline, and open-source contributions are fully available.
							</p>
						</div>

						<Link
							href="/portfolio"
							className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0"
						>
							<Layers className="w-4 h-4" />
							<span>Open Full Developer Portfolio</span>
							<ArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</section>

				{/* 8. markivo take a look of our pricing and select your choice */}
				<PricingAndPayment />

				{/* 9. markivo what our client say testimonials */}
				<section className="space-y-10">
					<div className="text-center max-w-2xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<Star className="w-4 h-4 text-cyan-400 fill-cyan-400" />
							TESTIMONIALS
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							What Our Client Say!
						</h2>
						<p className="text-slate-300 text-xs md:text-sm">
							Trusted by forward-thinking creators, founders, and business leaders worldwide.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{clientTestimonials.map((item, idx) => (
							<div
								key={idx}
								className="group rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400 p-6 md:p-8 flex flex-col justify-between space-y-5 shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.25)] transition-all duration-300 hover:-translate-y-1"
							>
								{/* 5 star rating */}
								<div className="flex items-center gap-1 text-amber-400">
									{[...Array(item.rating)].map((_, i) => (
										<Star key={i} className="w-4 h-4 fill-amber-400" />
									))}
								</div>

								<p className="text-slate-300 text-xs md:text-sm leading-relaxed italic">
									"{item.quote}"
								</p>

								<div className="pt-4 border-t border-cyan-500/20 flex items-center gap-3">
									<div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]`}>
										{item.author.charAt(0)}
									</div>
									<div>
										<h4 className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors">
											{item.author}
										</h4>
										<p className="text-slate-400 text-xs">{item.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 10. markivo frequently asked questions accordion */}
				<section className="space-y-10 max-w-4xl mx-auto">
					<div className="text-center space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<HelpCircle className="w-4 h-4 text-cyan-400" />
							FREQUENTLY ASKED QUESTIONS
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Got Questions? We’ve Got Answers.
						</h2>
						<p className="text-slate-300 text-xs md:text-sm">
							Everything you need to know about partnering with our digital agency.
						</p>
					</div>

					<div className="space-y-3">
						{faqItems.map((faq, idx) => {
							const isOpen = activeFaq === idx;
							return (
								<div
									key={idx}
									className={`rounded-2xl transition-all duration-300 overflow-hidden ${
										isOpen
											? "border-2 border-cyan-400 bg-gradient-to-b from-[#0d2247] to-[#09152a] shadow-[0_0_25px_rgba(6,182,212,0.25)]"
											: "border border-cyan-500/25 bg-[#09152a]/80 hover:border-cyan-400/60"
									}`}
								>
									<button
										type="button"
										onClick={() => toggleFaq(idx)}
										className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer"
										aria-expanded={isOpen}
									>
										<span className="font-bold text-sm md:text-base text-white hover:text-cyan-200 transition-colors">
											{faq.q}
										</span>
										<div
											className={`p-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0 transition-transform duration-300 ${
												isOpen ? "rotate-180 bg-cyan-500/30 text-white border-cyan-300" : ""
											}`}
										>
											<ChevronDown className="w-4 h-4" />
										</div>
									</button>

									{isOpen && (
										<div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-cyan-500/20 pt-4 animate-in fade-in duration-200">
											{faq.a}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</section>

				{/* 11. markivo get in touch project consultation */}
				<section id="consultation" className="space-y-8 scroll-mt-24">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<MessageSquare className="w-4 h-4 text-cyan-400" />
							GET IN TOUCH
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Let's Build Something Exceptional Together
						</h2>
						<p className="text-slate-300 text-xs md:text-sm">
							Tell us about your requirements. We typically respond within 12 hours with a detailed roadmap and estimate.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
						{/* left: direct contact cards */}
						<div className="lg:col-span-5 space-y-4">
							<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-5 flex items-center gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
								<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
									<Phone className="w-5 h-5 text-cyan-400" />
								</div>
								<div>
									<span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
										Phone & WhatsApp
									</span>
									<h4 className="text-sm font-bold text-white">+880 1832-720448</h4>
									<p className="text-xs text-slate-400">Direct Consultation & Inquiries</p>
								</div>
							</div>

							<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-5 flex items-center gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
								<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
									<Mail className="w-5 h-5 text-cyan-400" />
								</div>
								<div>
									<span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
										Official Email
									</span>
									<h4 className="text-sm font-bold text-white">provashsharma10@gmail.com</h4>
									<p className="text-xs text-slate-400">Proposals & Collaborations</p>
								</div>
							</div>

							<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-5 flex items-center gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
								<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
									<MapPin className="w-5 h-5 text-cyan-400" />
								</div>
								<div>
									<span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
										Agency Location
									</span>
									<h4 className="text-sm font-bold text-white">Dhaka, Bangladesh</h4>
									<p className="text-xs text-slate-400">Serving Clients Worldwide</p>
								</div>
							</div>

							<div className="rounded-2xl bg-[#09152a]/90 border border-cyan-500/25 p-5 flex items-center gap-4 hover:border-cyan-400/60 transition-all shadow-[0_0_15px_rgba(6,182,212,0.08)]">
								<div className="p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex-shrink-0">
									<Clock className="w-5 h-5 text-cyan-400" />
								</div>
								<div>
									<span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
										Working Hours
									</span>
									<h4 className="text-sm font-bold text-white">24/7 Dedicated Client Support</h4>
									<p className="text-xs text-slate-400">Fast Response Within 12 Hours</p>
								</div>
							</div>
						</div>

						{/* right: consultation form */}
						<div className="lg:col-span-7">
							<div className="rounded-3xl bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-6 md:p-8 shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6">
								<div className="space-y-1">
									<h3 className="text-xl font-bold text-white">Start Your Project Consultation</h3>
									<p className="text-slate-300 text-xs">
										Fill out the form below to receive a custom proposal and sprint timeline.
									</p>
								</div>

								<form
									action="https://formspree.io/f/mqaeeyzq"
									method="POST"
									className="space-y-4"
								>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">
												Your Name
											</label>
											<input
												type="text"
												name="name"
												required
												placeholder="e.g. Alex Morgan"
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
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
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
											/>
										</div>
									</div>

									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">
												Service Needed
											</label>
											<select
												name="service"
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
											>
												<option value="Web Development" className="bg-slate-900">Full-Stack Web Development</option>
												<option value="YouTube Automation" className="bg-slate-900">YouTube Channel Automation</option>
												<option value="Social Media Marketing" className="bg-slate-900">Social Media Marketing & Ads</option>
												<option value="Technical SEO & Consulting" className="bg-slate-900">Technical SEO & CRO</option>
											</select>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">
												Approximate Budget
											</label>
											<input
												type="text"
												name="budget"
												placeholder="e.g. $500 - $2,000 / ৳15k - ৳95k"
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
											/>
										</div>
									</div>

									<div>
										<label className="block text-xs font-semibold text-slate-300 mb-1.5">
											Project Scope & Goals
										</label>
										<textarea
											name="message"
											rows={4}
											required
											placeholder="Share details about your product, desired launch date, and objectives..."
											className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
										/>
									</div>

									<button
										type="submit"
										className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
									>
										<Send className="w-4 h-4" />
										<span>Submit Consultation Request</span>
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* 12. modern agency footer */}
			<Footer />
		</div>
	);
}
