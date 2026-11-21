"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
	Code2,
	Sparkles,
	ArrowRight,
	CheckCircle2,
	Layers,
	ShieldCheck,
	Zap,
	Send,
	ChevronDown,
	Star,
	Clock,
	Cpu,
	CheckCheck,
	Phone,
	Mail,
	MapPin,
	MessageSquare,
	ExternalLink,
	HelpCircle,
	Server,
	Database,
	Laptop,
} from "lucide-react";
import TechArchitectureHub from "@/components/agency/TechArchitectureHub";
import TechIcon from "@/components/TechIcon/TechIcon";
import Footer from "@/components/HeaderFooter/Footer/Footer";
import { softwareProducts } from "@/data/softwareData";

// web development three primary options with comprehensive tech stack
const webDevOptions = [
	{
		id: "frontend",
		optionNumber: "Option 1",
		title: "Frontend Development",
		subtitle: "Client UI/UX & High-Speed Rendering",
		badge: "Modern UI/UX",
		icon: <Laptop className="w-6 h-6 text-cyan-400" />,
		description:
			"Modern, blazing-fast, and responsive user interfaces built with React 19, Next.js 16, and Tailwind CSS v4. We transform complex Figma designs into pixel-perfect, accessible client applications.",
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"Bun Runtime",
			"Tailwind CSS v4",
			"TanStack Query v5",
			"Shadcn UI",
			"Zod Validation",
			"Framer Motion",
			"Biome Toolchain",
		],
		deliverables: [
			"Pixel-Perfect UI/UX from Figma or custom designs",
			"Sub-second initial page load & SSR optimization",
			"Interactive components, animations & micro-interactions",
			"State management with TanStack Query & Zustand",
			"Mobile-first responsive layouts across all screen sizes",
			"Cross-browser testing & accessibility standards",
		],
		priceBDT: "৳15,000",
		priceUSD: "$150",
		gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
		border: "border-cyan-500/30 hover:border-cyan-400",
		glow: "shadow-[0_0_25px_rgba(6,182,212,0.2)]",
		popular: false,
	},
	{
		id: "backend",
		optionNumber: "Option 2",
		title: "Backend Development",
		subtitle: "Secure APIs, Databases & Cloud Systems",
		badge: "APIs & Databases",
		icon: <Server className="w-6 h-6 text-blue-400" />,
		description:
			"Scalable, secure, and robust backend engineering with Node.js, Express, PostgreSQL, and Prisma ORM. Designed for high concurrency, strict type validation, and zero data loss.",
		techStack: [
			"Node.js",
			"Express.js",
			"TypeScript 5",
			"Bun",
			"PostgreSQL",
			"Prisma ORM",
			"JWT Auth & RBAC",
			"Redis Caching",
			"Zod Middleware",
			"Cloudinary",
			"Nodemailer",
			"Helmet & CORS",
		],
		deliverables: [
			"Scalable RESTful & GraphQL modular API architecture",
			"Secure JWT authentication, refresh tokens & RBAC",
			"PostgreSQL schema modeling, migrations & indexing",
			"Payment gateway integrations (bKash, Nagad, Stripe)",
			"Centralized error handling, Zod validation & rate limiting",
			"Caching with Redis & cloud database hosting setup",
		],
		priceBDT: "৳20,000",
		priceUSD: "$200",
		gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
		border: "border-blue-500/30 hover:border-blue-400",
		glow: "shadow-[0_0_25px_rgba(59,130,246,0.2)]",
		popular: false,
	},
	{
		id: "fullstack",
		optionNumber: "Option 3",
		title: "Full-Stack Development",
		subtitle: "Turnkey Web Application & SaaS Engineering",
		badge: "Most Popular / Turnkey",
		icon: <Sparkles className="w-6 h-6 text-teal-300" />,
		description:
			"Complete end-to-end turnkey web applications combining our high-speed frontend with enterprise backend APIs. From ideation and database design to full production launch.",
		techStack: [
			"Next.js 16 App Router",
			"React 19",
			"TypeScript 5",
			"Bun Runtime",
			"Express.js API",
			"PostgreSQL",
			"Prisma ORM",
			"Tailwind CSS v4",
			"TanStack Query v5",
			"JWT & RBAC",
			"bKash & Stripe",
		],
		deliverables: [
			"Turnkey Next.js 16 + PostgreSQL full-stack solution",
			"Complete customer-facing UI + Admin management portal",
			"End-to-end authentication, session management & RBAC",
			"Automated payment checkout (bKash / Stripe) & invoicing",
			"Automated CI/CD deployment on Vercel / Cloud VPS",
			"One-month complimentary post-launch technical support",
		],
		priceBDT: "৳35,000",
		priceUSD: "$350",
		gradient: "from-teal-500/20 via-cyan-500/15 to-transparent",
		border: "border-teal-400/50 hover:border-cyan-300",
		glow: "shadow-[0_0_35px_rgba(20,184,166,0.3)]",
		popular: true,
	},
];

// complete enterprise tech stack breakdown matching frontend and backend specification
const enterpriseTechStack = [
	{
		category: "Frontend Architecture",
		tag: "CLIENT & UI/UX ECOSYSTEM",
		icon: <Laptop className="w-5 h-5 text-cyan-400" />,
		color: "border-cyan-500/30 hover:border-cyan-400",
		glow: "from-cyan-500/15 via-blue-500/5 to-transparent",
		description:
			"Blazing-fast client applications with modern SSR, state synchronization, and component ownership.",
		technologies: [
			{ name: "Next.js 16", role: "App Router, SSR, SSG & Server Components" },
			{ name: "React 19", role: "Modern UI Primitives, Actions & Hooks" },
			{ name: "TypeScript 5", role: "Strict Static Type Checking & Interfaces" },
			{ name: "Bun Runtime", role: "Ultra-Fast Bundler & Package Execution" },
			{ name: "Tailwind CSS v4", role: "Utility-First Responsive Styling & PostCSS" },
			{ name: "TanStack Query v5", role: "Async Server State & Cache Invalidation" },
			{ name: "Shadcn UI & Radix", role: "Accessible Component Primitives" },
			{ name: "Zod", role: "Client Form & Data Schema Validation" },
			{ name: "Biome", role: "Rust-Powered Linter & Code Formatter" },
			{ name: "Framer Motion", role: "Interactive Animations & Micro-Gestures" },
		],
	},
	{
		category: "Backend & Cloud Architecture",
		tag: "RESTFUL MODULAR API & SECURITY",
		icon: <Server className="w-5 h-5 text-blue-400" />,
		color: "border-blue-500/30 hover:border-blue-400",
		glow: "from-blue-500/15 via-indigo-500/5 to-transparent",
		description:
			"Modular, scalable backend services adhering to Level-2 Enterprise Architectural Standards.",
		technologies: [
			{ name: "Node.js & Bun", role: "Non-Blocking Asynchronous Server Runtime" },
			{ name: "Express.js", role: "Modular Enterprise REST Architecture" },
			{ name: "TypeScript 5", role: "End-to-End Type Safety across DTOs" },
			{ name: "PostgreSQL", role: "ACID Relational Enterprise Database" },
			{ name: "Prisma ORM", role: "Type-Safe DB Client & Auto Migrations" },
			{ name: "JWT & RBAC", role: "Stateless Tokens & Role Authorization" },
			{ name: "Redis", role: "Sub-Millisecond In-Memory Caching" },
			{ name: "Zod Middleware", role: "Request Body, Query & Params Validation" },
			{ name: "Cloudinary & Multer", role: "Cloud Media Storage & Streaming CDN" },
			{ name: "Nodemailer & EJS", role: "Automated Transactional Email Templates" },
			{ name: "Helmet & CORS", role: "API Hardening & Cross-Origin Security" },
		],
	},
	{
		category: "DevOps, Database & Gateways",
		tag: "INFRASTRUCTURE & PAYMENTS",
		icon: <Database className="w-5 h-5 text-teal-400" />,
		color: "border-teal-500/30 hover:border-teal-400",
		glow: "from-teal-500/15 via-cyan-500/5 to-transparent",
		description:
			"Zero-downtime deployment pipelines, resilient database layers, and instant payment checkout.",
		technologies: [
			{ name: "Docker", role: "Containerized Microservices & Environments" },
			{ name: "PostgreSQL RDBMS", role: "Relational Data Modeling & Indexing" },
			{ name: "Redis Cache", role: "Session Storage & API Rate Limiting" },
			{ name: "Vercel / Cloud VPS", role: "Global Edge CDN & Cloud Deployments" },
			{ name: "GitHub Actions", role: "Automated CI/CD Test & Deploy Pipelines" },
			{ name: "bKash Checkout", role: "Direct Mobile Banking PGW Integration" },
			{ name: "Nagad Gateway", role: "Instant MFS Online Merchant API" },
			{ name: "Stripe & Cards", role: "Global Credit/Debit Card Processing" },
			{ name: "Beekeeper Studio", role: "Database GUI Inspection & SQL Audits" },
		],
	},
];

// markivo agency core pillars
const agencyPillars = [
	{
		id: "frontend",
		title: "High-Performance Frontend Systems",
		badge: "Modern UI/UX",
		description:
			"Lightning-fast Next.js 16 and React 19 interfaces with responsive styling, fluid micro-animations, and 99+ Google Lighthouse scores.",
		metric: "<0.4s",
		metricLabel: "First Contentful Paint",
		icon: <Laptop className="w-6 h-6 text-cyan-400" />,
		accentColor: "border-cyan-500/30 group-hover:border-cyan-400/70",
		glowColor: "from-cyan-500/20 via-blue-500/10 to-transparent",
		linkText: "Explore Frontend",
		linkHref: "/#services",
	},
	{
		id: "backend",
		title: "Scalable APIs & Cloud Microservices",
		badge: "Level-2 Architecture",
		description:
			"Modular Express.js and Bun REST APIs backed by PostgreSQL and Prisma ORM, engineered for enterprise security, caching, and 99.9% uptime.",
		metric: "99.99%",
		metricLabel: "Production Uptime",
		icon: <Server className="w-6 h-6 text-blue-400" />,
		accentColor: "border-blue-500/30 group-hover:border-blue-400/70",
		glowColor: "from-blue-500/20 via-indigo-500/10 to-transparent",
		linkText: "Explore APIs",
		linkHref: "/#services",
	},
	{
		id: "fullstack",
		title: "Full-Stack Turnkey SaaS Platforms",
		badge: "End-to-End",
		description:
			"Complete production-ready web applications with multi-tenant architecture, JWT authentication, RBAC dashboards, and online payment gateways.",
		metric: "100%",
		metricLabel: "Code Ownership",
		icon: <Layers className="w-6 h-6 text-teal-400" />,
		accentColor: "border-teal-500/30 group-hover:border-teal-400/70",
		glowColor: "from-teal-500/20 via-emerald-500/10 to-transparent",
		linkText: "Explore SaaS Suite",
		linkHref: "/#services",
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
			"The full-stack booking portal built by Provash and team scaled seamlessly during our peak launch. Sub-100ms response times and zero bugs.",
		author: "Sarah Jenkins",
		role: "CTO, HealthPulse Telemed",
		rating: 5,
		avatarBg: "from-teal-500 to-cyan-600",
	},
	{
		quote:
			"Their frontend architecture migration to Next.js 16 and TypeScript boosted our Google Lighthouse score to 99 and cut bounce rate by half.",
		author: "David Thorne",
		role: "VP of Engineering, CloudScale Logistics",
		rating: 5,
		avatarBg: "from-blue-600 to-indigo-600",
	},
];

// markivo faq items
const faqItems = [
	{
		q: "What options do you offer for Web Development?",
		a: "We offer three specialized options: Option 1: Frontend Development (React 19, Next.js 16, Tailwind v4 UI/UX), Option 2: Backend Development (Node.js, Express, PostgreSQL, Prisma APIs), and Option 3: Full-Stack Development (Complete turnkey application with client UI, admin dashboard, auth, and online payments).",
	},
	{
		q: "How do you ensure application performance and security?",
		a: "We build with Next.js App Router, SSR/SSG caching, strict TypeScript type-safety, JWT authentication, and PostgreSQL indexing with Prisma ORM for sub-100ms API response times.",
	},
	{
		q: "What is your typical development turnaround time?",
		a: "Individual frontend or backend milestones are completed within 5 to 7 days, while full-stack enterprise applications and SaaS platforms are delivered within 2 to 4 weeks with weekly live review demos.",
	},
	{
		q: "What payment methods do you accept?",
		a: "We support both local and international payment methods: bKash, Nagad, Visa, Mastercard, and international bank transfers. Payments are structured via safe milestone-based delivery.",
	},
];

// agency home page component
export default function AgencyHome() {
	// console.log("rendering markivo styled agency home page")

	// web development tab filter state
	const [activeWebTab, setActiveWebTab] = useState("all");

	// web development card details accordion state
	const [expandedWebCards, setExpandedWebCards] = useState({});

	const toggleWebCard = (cardId) => {
		setExpandedWebCards((prev) => ({
			...prev,
			[cardId]: !prev[cardId],
		}));
	};

	// software solutions card details accordion state
	const [expandedSoftwareCards, setExpandedSoftwareCards] = useState({});

	const toggleSoftwareCard = (cardId) => {
		setExpandedSoftwareCards((prev) => ({
			...prev,
			[cardId]: !prev[cardId],
		}));
	};

	// complete tech stack card details accordion state
	const [expandedTechCards, setExpandedTechCards] = useState({});

	const toggleTechCard = (cardIdx) => {
		setExpandedTechCards((prev) => ({
			...prev,
			[cardIdx]: !prev[cardIdx],
		}));
	};

	// faq accordion state
	const [activeFaq, setActiveFaq] = useState(0);

	// consultation inquiry form state
	const [inquiryForm, setInquiryForm] = useState({
		name: "",
		email: "",
		service: "Frontend Web Development (React / Next.js)",
		budget: "",
		message: "",
	});
	const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
	const [inquiryStatus, setInquiryStatus] = useState({ type: "", text: "" });

	// live testimonials state
	const [testimonialsList, setTestimonialsList] = useState(clientTestimonials);

	// fetch published testimonials from backend
	useEffect(() => {
		const loadTestimonials = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/v1/testimonials");
				const data = await res.json();
				if (data.success && Array.isArray(data.data) && data.data.length > 0) {
					// format database testimonials for cards
					const formatted = data.data.map((item) => ({
						quote: item.feedback,
						author: item.clientName,
						role:
							item.clientRole +
							(item.companyName ? ` • ${item.companyName}` : ""),
						rating: item.rating || 5,
						avatarBg: "from-cyan-500 to-blue-600",
					}));
					setTestimonialsList(formatted);
				}
			} catch (_err) {
				// console.log("offline testimonials notice", _err)
			}
		};
		loadTestimonials();
	}, []);

	// handle consultation inquiry submit
	const handleInquirySubmit = async (e) => {
		e.preventDefault();
		setIsSubmittingInquiry(true);
		setInquiryStatus({ type: "", text: "" });

		try {
			const res = await fetch("http://localhost:5000/api/v1/inquiries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: inquiryForm.name,
					email: inquiryForm.email,
					budget: inquiryForm.budget || "Not specified",
					message: `[Service: ${inquiryForm.service}] ${inquiryForm.message}`,
				}),
			});

			const data = await res.json();
			if (data.success) {
				setInquiryStatus({
					type: "success",
					text: "Your consultation request has been submitted successfully! We will get back to you shortly.",
				});
				setInquiryForm({
					name: "",
					email: "",
					service: "Frontend Web Development (React / Next.js)",
					budget: "",
					message: "",
				});
			} else {
				setInquiryStatus({
					type: "error",
					text: data.message || "Failed to submit consultation request.",
				});
			}
		} catch (_err) {
			// console.log("inquiry submission error", _err)
			setInquiryStatus({
				type: "error",
				text: "Unable to connect to the server. Please try again shortly.",
			});
		} finally {
			setIsSubmittingInquiry(false);
		}
	};

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	// filter web dev options if tab is active
	const filteredWebDev =
		activeWebTab === "all"
			? webDevOptions
			: webDevOptions.filter((opt) => opt.id === activeWebTab);

	return (
		<div className="w-full space-y-16 md:space-y-24 bg-[#050b17] text-white" suppressHydrationWarning>
			{/* hero banner flush with navbar untouched as requested */}
			<section className="w-full relative overflow-hidden bg-gradient-to-b from-[#071329] via-[#091b3a] to-slate-950 border-b border-slate-800/80 pt-8 pb-14 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 shadow-2xl">
				<div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

				<div className="relative z-10 max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* left column headline description and cta */}
						<div className="lg:col-span-7 space-y-6 text-center lg:text-left">
							<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs md:text-sm font-semibold shadow-inner">
								<Sparkles className="w-4 h-4 text-cyan-400" />
								Full-Service Digital Agency & Engineering Studio
							</div>

							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-snug">
								We Build High-Impact{" "}
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-blue-300">
									Web Applications
								</span>{" "}
								& Scalable Software Architecture.
							</h1>

							<p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
								From high-performance frontend interfaces to complex full-stack enterprise platforms and secure cloud backends, we engineer custom web solutions tailored to scale your business.
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

						{/* right column hero tech architecture hub */}
						<div className="lg:col-span-5 flex justify-center relative">
							<TechArchitectureHub />
						</div>
					</div>
				</div>
			</section>

			{/* enterprise tech stack showcase overlapping banner bottom */}
			<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-34 md:-mt-50 z-20">
				<div className="rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 p-5 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(6,182,212,0.15)] space-y-4">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
						<div className="flex items-center gap-2.5 text-cyan-300 font-bold text-xs md:text-sm uppercase tracking-wider">
							<Sparkles className="w-4 h-4 text-cyan-400" />
							<span>Enterprise Technologies & Stack</span>
						</div>
						<span className="text-[11px] text-slate-400 font-medium">
							Interactive viva notes, official docs & architecture overview
						</span>
					</div>
					<TechIcon />
				</div>
			</section>

			{/* main content container with max-w */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 relative -mt-6 md:-mt-10" suppressHydrationWarning>
				{/* services section positioned right below banner as requested */}
				<section id="services" className="space-y-16 scroll-mt-24">
					{/* section header */}
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<Code2 className="w-4 h-4 text-cyan-400" />
							WHAT WE DO • DIGITAL SERVICES
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Our Exclusive Services
						</h2>
						<p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto">
							From modular frontend and backend engineering to complete turnkey full-stack SaaS applications, custom cloud architectures, and scalable APIs.
						</p>
					</div>

					{/* 1. web development solutions section with three options */}
					<div className="space-y-6">
						<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-cyan-500/20">
							<div>
								<div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
									<Code2 className="w-4 h-4" />
									<span>CORE ARCHITECTURE</span>
								</div>
								<h3 className="text-xl sm:text-2xl font-black text-white mt-1">
									Web Development Solutions
								</h3>
								<p className="text-slate-400 text-xs mt-1">
									Choose from three specialized web development models based on your project scope.
								</p>
							</div>

							{/* interactive three options pill switcher */}
							<div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
								<button
									type="button"
									onClick={() => setActiveWebTab("all")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeWebTab === "all"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									All 3 Options
								</button>
								<button
									type="button"
									onClick={() => setActiveWebTab("frontend")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeWebTab === "frontend"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									1. Frontend
								</button>
								<button
									type="button"
									onClick={() => setActiveWebTab("backend")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeWebTab === "backend"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									2. Backend
								</button>
								<button
									type="button"
									onClick={() => setActiveWebTab("fullstack")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeWebTab === "fullstack"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									3. Fullstack
								</button>
							</div>
						</div>

						{/* web development three cards grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
							{filteredWebDev.map((opt) => {
								const isExpanded = !!expandedWebCards[opt.id];
								return (
									<div
										key={opt.id}
										className={`group relative rounded-3xl p-6 sm:p-7 bg-[#09152a]/90 backdrop-blur-xl border ${opt.border} ${opt.glow} transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
									>
										<div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${opt.gradient} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

										<div className="relative z-10 space-y-4">
											<div className="flex items-center justify-between">
												<div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-300">
													{opt.icon}
												</div>
												<span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
													{opt.badge}
												</span>
											</div>

											<div>
												<span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
													{opt.optionNumber}
												</span>
												<div className="flex items-center justify-between gap-2 mt-0.5">
													<h4 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
														{opt.title}
													</h4>
													<button
														type="button"
														onClick={() => toggleWebCard(opt.id)}
														className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-110 active:scale-95"
														title={isExpanded ? "Hide Details" : "View Details"}
													>
														<ChevronDown
															className={`w-4 h-4 transition-transform duration-300 ${
																isExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
															}`}
														/>
													</button>
												</div>
												<p className="text-[11px] text-slate-400 font-medium mt-1">
													{opt.subtitle}
												</p>
											</div>

											{/* collapsible details section */}
											{isExpanded && (
												<div className="space-y-4 pt-1 animate-in fade-in duration-300">
													<p className="text-slate-300 text-xs leading-relaxed">
														{opt.description}
													</p>

													{/* tech stack pills */}
													<div className="space-y-1.5 pt-1">
														<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
															Tech Stack
														</span>
														<div className="flex flex-wrap gap-1.5">
															{opt.techStack.map((tech, i) => (
																<span
																	key={i}
																	className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/20 text-slate-300 font-medium"
																>
																	{tech}
																</span>
															))}
														</div>
													</div>

													{/* deliverables list */}
													<div className="space-y-1.5 pt-1">
														<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
															<CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
															Key Deliverables
														</span>
														<div className="space-y-1.5">
															{opt.deliverables.map((item, idx) => (
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

													{/* card footer with view project action button */}
													<div className="relative z-10 pt-4 border-t border-cyan-500/20">
														<Link
															href={
																opt.id === "frontend"
																	? "/showcase/allprojects?category=frontend"
																	: opt.id === "backend"
																		? "/showcase/allprojects?category=backend"
																		: "/showcase/allprojects?category=fullstack"
															}
															className={`w-full py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
																opt.popular
																	? "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
																	: "bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95"
															}`}
														>
															<span>View {opt.title.replace(" Development", "")} Projects</span>
															<ArrowRight className="w-4 h-4" />
														</Link>
													</div>
												</div>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>


				</section>

				{/* proprietary software and saas suite showcase section */}
				<section id="software" className="space-y-12 scroll-mt-24">
					{/* section header with direct catalog link */}
					<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-cyan-500/20">
						<div className="space-y-2">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
								<Laptop className="w-3.5 h-3.5 text-cyan-400" />
								<span>PROPRIETARY SAAS & SOFTWARE SUITE</span>
							</div>
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
								Ready-to-Deploy Software Solutions
							</h2>
							<p className="text-slate-300 text-xs md:text-sm max-w-2xl">
								Explore our high-performance software platforms built with modern full-stack architecture. Test live interactive demos hosted on Vercel or customize for your business.
							</p>
						</div>

						<Link
							href="/software"
							className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-400 text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] group shrink-0"
						>
							<span>Browse Software Catalog (6)</span>
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Link>
					</div>

					{/* grid of software products */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
						{softwareProducts.map((software) => {
							const isExpanded = !!expandedSoftwareCards[software.id];
							return (
								<div
									key={software.id}
									className={`group relative flex flex-col justify-between rounded-2xl p-6 bg-gradient-to-b from-[#0a1b38]/90 via-[#071329]/90 to-slate-950/95 border ${software.border} backdrop-blur-xl shadow-xl transition-all duration-500 hover:-translate-y-1`}
								>
									{/* ambient top glow */}
									<div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									<div className="relative z-10 space-y-4">
										{/* top badge and category */}
										<div className="flex items-center justify-between gap-2">
											<span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
												{software.category}
											</span>
											<span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
												{software.badge}
											</span>
										</div>

										{/* title and tagline */}
										<div>
											<div className="flex items-center justify-between gap-2">
												<h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
													{software.title}
												</h3>
												<button
													type="button"
													onClick={() => toggleSoftwareCard(software.id)}
													className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-110 active:scale-95"
													title={isExpanded ? "Hide Details" : "View Details"}
												>
													<ChevronDown
														className={`w-4 h-4 transition-transform duration-300 ${
															isExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
														}`}
													/>
												</button>
											</div>
											<p className="text-cyan-400/90 text-xs font-medium mt-1">
												{software.tagline}
											</p>
										</div>

										{/* collapsible details section */}
										{isExpanded && (
											<div className="space-y-4 pt-1 animate-in fade-in duration-300">
												{/* short description */}
												<p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
													{software.shortDesc}
												</p>

												{/* key highlights */}
												<div className="space-y-1.5 pt-2 border-t border-slate-800/80">
													<span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
														Key Highlights
													</span>
													<ul className="space-y-1">
														{software.features.slice(0, 3).map((feat, idx) => (
															<li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
																<CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
																<span className="line-clamp-1">{feat}</span>
															</li>
														))}
													</ul>
												</div>

												{/* tech stack pills */}
												<div className="flex flex-wrap gap-1.5 pt-2">
													{software.techStack.slice(0, 4).map((tech, idx) => (
														<span
															key={idx}
															className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:border-cyan-500/30 transition-colors font-mono"
														>
															{tech}
														</span>
													))}
													{software.techStack.length > 4 && (
														<span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-400 border border-slate-800">
															+{software.techStack.length - 4} more
														</span>
													)}
												</div>

												{/* pricing and direct actions */}
												<div className="relative z-10 pt-4 border-t border-cyan-500/20 space-y-3">
													<div className="flex items-baseline justify-between">
														<span className="text-[10px] text-slate-400 uppercase tracking-wider">
															Starting Price
														</span>
														<span className="text-sm font-black text-cyan-300">
															{software.startingPrice}
														</span>
													</div>

													<div className="grid grid-cols-2 gap-2">
														<a
															href={software.liveUrl}
															target="_blank"
															rel="noopener noreferrer"
															className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all cursor-pointer"
														>
															<span>Vercel Demo</span>
															<ExternalLink className="w-3 h-3" />
														</a>

														<Link
															href={`/software/${software.slug}`}
															className="py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
														>
															<span>Details</span>
															<ArrowRight className="w-3 h-3" />
														</Link>
													</div>
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</section>

				{/* complete enterprise tech stack breakdown matching frontend and backend specification */}
				<section className="space-y-10">
					<div className="text-center max-w-3xl mx-auto space-y-3">
						<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
							<Cpu className="w-4 h-4 text-cyan-400" />
							FULL-STACK ARCHITECTURE SPECIFICATION
						</div>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
							Modern Frontend & Backend Tech Stack
						</h2>
						<p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
							Engineered with strict enterprise standards: Next.js 16, React 19, Bun, Express.js, TypeScript 5, and PostgreSQL Prisma ORM.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
						{enterpriseTechStack.map((stack, idx) => {
							const isExpanded = !!expandedTechCards[idx];
							return (
								<div
									key={idx}
									className={`group relative rounded-3xl p-6 sm:p-8 bg-[#09152a]/90 backdrop-blur-xl border ${stack.color} shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
								>
									<div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${stack.glow} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

									<div className="relative z-10 space-y-5">
										<div className="flex items-center justify-between">
											<div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
												{stack.icon}
											</div>
											<span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
												{stack.tag}
											</span>
										</div>

										<div>
											<div className="flex items-center justify-between gap-2">
												<h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
													{stack.category}
												</h3>
												<button
													type="button"
													onClick={() => toggleTechCard(idx)}
													className="p-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all duration-200 shadow-md cursor-pointer hover:scale-110 active:scale-95"
													title={isExpanded ? "Hide Details" : "View Details"}
												>
													<ChevronDown
														className={`w-4 h-4 transition-transform duration-300 ${
															isExpanded ? "rotate-180 text-cyan-400" : "text-slate-400"
														}`}
													/>
												</button>
											</div>
											<p className="text-slate-300 text-xs leading-relaxed mt-1.5">
												{stack.description}
											</p>
										</div>

										{/* collapsible details section */}
										{isExpanded && (
											<div className="space-y-4 pt-1 animate-in fade-in duration-300">
												{/* technologies table list */}
												<div className="space-y-2 pt-2">
													<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block">
														Core Frameworks & Tools
													</span>
													<div className="space-y-1.5">
														{stack.technologies.map((item, i) => (
															<div
																key={i}
																className="p-2 rounded-xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors flex items-center justify-between gap-3 text-xs"
															>
																<span className="font-bold text-cyan-200 flex-shrink-0">
																	{item.name}
																</span>
																<span className="text-slate-400 text-[11px] text-right truncate">
																	{item.role}
																</span>
															</div>
														))}
													</div>
												</div>

												{/* card footer with developer portfolio link */}
												<div className="relative z-10 pt-4 border-t border-cyan-500/20">
													<Link
														href="/portfolio"
														className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white group-hover:translate-x-1 transition-all"
													>
														<span>View in Developer Portfolio</span>
														<ArrowRight className="w-3.5 h-3.5" />
													</Link>
												</div>
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</section>

				{/* markivo three core agency pillars */}
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

				{/* markivo key stats and impact numbers counter band */}
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
							<p className="text-[11px] text-slate-400">Software & Web Platforms</p>
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
								10M+
							</span>
							<p className="text-xs sm:text-sm font-bold text-white">
								API Requests Daily
							</p>
							<p className="text-[11px] text-slate-400">High-Availability Production</p>
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

				{/* markivo what our client say testimonials */}
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
						{testimonialsList.map((item, idx) => (
							<div
								key={idx}
								className="group rounded-3xl bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400 p-6 md:p-8 flex flex-col justify-between space-y-5 shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_35px_rgba(6,182,212,0.25)] transition-all duration-300 hover:-translate-y-1"
							>
								{/* rating stars */}
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

				{/* markivo frequently asked questions accordion */}
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

				{/* markivo get in touch project consultation */}
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
						{/* left direct contact cards */}
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

						{/* right consultation form */}
						<div className="lg:col-span-7">
							<div className="rounded-3xl bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-500/40 p-6 md:p-8 shadow-[0_0_35px_rgba(6,182,212,0.25)] space-y-6">
								<div className="space-y-1">
									<h3 className="text-xl font-bold text-white">Start Your Project Consultation</h3>
									<p className="text-slate-300 text-xs">
										Fill out the form below to receive a custom proposal and sprint timeline.
									</p>
								</div>

								{inquiryStatus.text && (
									<div
										className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
											inquiryStatus.type === "success"
												? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
												: "bg-red-950/80 border border-red-500/40 text-red-300"
										}`}
									>
										<span>{inquiryStatus.text}</span>
									</div>
								)}

								<form
									onSubmit={handleInquirySubmit}
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
												value={inquiryForm.name}
												onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
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
												value={inquiryForm.email}
												onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
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
												value={inquiryForm.service}
												onChange={(e) => setInquiryForm({ ...inquiryForm, service: e.target.value })}
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
											>
												<option value="Frontend Web Development" className="bg-slate-900">Frontend Web Development (React / Next.js)</option>
												<option value="Backend Development" className="bg-slate-900">Backend Development (Node.js / PostgreSQL)</option>
												<option value="Full-Stack Development" className="bg-slate-900">Full-Stack Web Development (Turnkey App)</option>
												<option value="Enterprise SaaS Architecture" className="bg-slate-900">Enterprise SaaS Architecture & Scaling</option>
												<option value="Database Design & Optimization" className="bg-slate-900">Database Design & Prisma ORM Optimization</option>
												<option value="Technical SEO & Performance Audit" className="bg-slate-900">Technical SEO & Next.js Performance Audit</option>
											</select>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">
												Approximate Budget
											</label>
											<input
												type="text"
												name="budget"
												value={inquiryForm.budget}
												onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
												placeholder="e.g. $500 - $2,000 / ৳5k - ৳95k"
												className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
											/>
										</div>
									</div>

									<div>
										<label className="block text-slate-300 font-semibold mb-1.5 text-xs">
											Project Scope & Goals
										</label>
										<textarea
											name="message"
											rows={4}
											required
											value={inquiryForm.message}
											onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
											placeholder="Share details about your product, desired launch date, and objectives..."
											className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
										/>
									</div>

									<button
										type="submit"
										disabled={isSubmittingInquiry}
										className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white font-bold text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
									>
										<Send className="w-4 h-4" />
										<span>{isSubmittingInquiry ? "Submitting Inquiry..." : "Submit Consultation Request"}</span>
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>

			{/* modern agency footer */}
			<Footer />
		</div>
	);
}
