"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaYoutube, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
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
	Server,
	Database,
	Laptop,
	Share2,
	ThumbsUp,
	UserPlus,
} from "lucide-react";
import PricingAndPayment from "@/components/agency/PricingAndPayment";
import Footer from "@/components/HeaderFooter/Footer/Footer";

// trusted tech stack marquee data matching frontend and backend specification
const techStackList = [
	{ name: "Next.js 16", category: "Full-Stack App Router" },
	{ name: "React 19", category: "Modern UI Library" },
	{ name: "TypeScript 5", category: "Strict Type Safety" },
	{ name: "Bun", category: "Ultra-Fast Runtime" },
	{ name: "Tailwind CSS v4", category: "Modern Styling" },
	{ name: "TanStack Query v5", category: "Server State & Cache" },
	{ name: "Shadcn UI", category: "Component Primitives" },
	{ name: "Node.js", category: "Backend Runtime" },
	{ name: "Express.js", category: "RESTful Modular API" },
	{ name: "PostgreSQL", category: "Relational ACID DB" },
	{ name: "Prisma ORM", category: "Type-Safe Data Client" },
	{ name: "Redis", category: "In-Memory Caching" },
	{ name: "JWT Auth & RBAC", category: "Security & Tokens" },
	{ name: "Zod", category: "Schema Validation" },
	{ name: "Biome", category: "Fast Linter & Formatter" },
	{ name: "Docker", category: "Containerization" },
	{ name: "Cloudinary", category: "Cloud Media CDN" },
	{ name: "bKash & Stripe", category: "Payment Gateways" },
];

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

// social media and channel growth three primary packages
const socialMediaGrowthOptions = [
	{
		id: "youtube-setup",
		optionNumber: "Option 1",
		title: "YouTube Channel Setup & Monetization",
		subtitle: "Complete Brand Channel, 4K Art, SEO & Verification",
		badge: "High Retention & SEO",
		icon: <FaYoutube className="w-6 h-6 text-red-400" />,
		description:
			"Complete YouTube channel creation from scratch. Custom 4K banner and avatar design, phone verification, high-ranking SEO tags and keywords, watermark, upload defaults, playlist structuring, and monetization compliance.",
		platforms: [
			"YouTube Studio",
			"4K Banner & Logo",
			"Channel SEO Tags",
			"Verification Setup",
			"Monetization Readiness",
			"Upload Defaults",
		],
		deliverables: [
			"Professional channel creation & phone number verification",
			"Custom high-converting channel banner, logo & watermark",
			"Complete channel SEO: high-search keywords, tags & description",
			"Upload defaults, community tab & playlist structuring",
			"Monetization eligibility roadmap & copyright-safe guidelines",
			"One-on-one strategy session on viral titles & thumbnail design",
		],
		priceBDT: "৳5,000",
		priceUSD: "$50",
		gradient: "from-red-500/20 via-pink-500/10 to-transparent",
		border: "border-red-500/30 hover:border-red-400",
		glow: "shadow-[0_0_25px_rgba(239,68,68,0.2)]",
		popular: false,
	},
	{
		id: "facebook-setup",
		optionNumber: "Option 2",
		title: "Facebook Page & Meta Business Setup",
		subtitle: "Official Brand Page, Auto-Responder & Meta Suite",
		badge: "Verified Business Setup",
		icon: <FaFacebook className="w-6 h-6 text-blue-400" />,
		description:
			"Professional Facebook business page creation and Meta Business Suite configuration. Custom cover banner and profile branding, custom username/URL, WhatsApp button integration, auto-responder chat bot, and Meta pixel setup.",
		platforms: [
			"Meta Business Suite",
			"Custom Page URL",
			"WhatsApp Business",
			"Auto-Responder Bot",
			"Meta Pixel",
			"Action CTA Button",
		],
		deliverables: [
			"Official business page creation with optimized category & bio",
			"Custom high-resolution banner cover & branded profile logo",
			"Meta Business Suite & WhatsApp Business direct button link",
			"Instant auto-reply chat bot & FAQ messaging configuration",
			"Custom vanities URL / username registration (@yourbrand)",
			"Meta Pixel tracking code setup for future ad retargeting",
		],
		priceBDT: "৳5,000",
		priceUSD: "$50",
		gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
		border: "border-blue-500/30 hover:border-blue-400",
		glow: "shadow-[0_0_25px_rgba(59,130,246,0.2)]",
		popular: false,
	},
	{
		id: "growth-sales",
		optionNumber: "Option 3",
		title: "Followers, Subscribers & Monetization Boost",
		subtitle: "Real Audience, Watch Time & Multi-Platform Growth",
		badge: "Most Popular / Fast Growth",
		icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
		description:
			"Fast-track your audience growth across YouTube, Facebook, Instagram, TikTok, and Telegram. High-retention subscribers, 4,000 watch hours packages, Facebook page likes/followers, Instagram active followers, and monetization eligibility fulfillment.",
		platforms: [
			"YouTube Subscribers",
			"4000 Watch Hours",
			"Facebook Followers",
			"Instagram Growth",
			"TikTok Audience",
			"Aged Channels & Pages",
		],
		deliverables: [
			"Real & high-retention YouTube subscribers (1,000+ packages)",
			"4,000 YouTube public watch hours for instant YPP monetization",
			"Facebook page followers & active post likes (10,000+ packages)",
			"Instagram targeted followers & post engagement boost",
			"Safe, policy-compliant delivery with lifetime non-drop warranty",
			"Turnkey monetized channels & aged pages available upon request",
		],
		priceBDT: "৳8,000",
		priceUSD: "$80",
		gradient: "from-emerald-500/20 via-teal-500/15 to-transparent",
		border: "border-emerald-400/50 hover:border-emerald-300",
		glow: "shadow-[0_0_35px_rgba(16,185,129,0.3)]",
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

// markivo showcase portfolio case studies
const projectCaseStudies = [
	{
		title: "SaaS Workflow & Analytics Platform",
		category: "Full-Stack Web App",
		description:
			"Engineered a scalable multi-tenant SaaS application with real-time dashboard analytics, role-based auth, and automated Stripe/bKash billing.",
		impact: "Processed $120k+ GMV with <350ms response latency",
		tech: ["Next.js 16", "TypeScript 5", "PostgreSQL", "Tailwind CSS v4"],
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
		q: "What options do you offer for Web Development?",
		a: "We offer three specialized options: Option 1: Frontend Development (React 19, Next.js 16, Tailwind v4 UI/UX), Option 2: Backend Development (Node.js, Express, PostgreSQL, Prisma APIs), and Option 3: Full-Stack Development (Complete turnkey application with client UI, admin dashboard, auth, and online payments).",
	},
	{
		q: "What is included in YouTube & Facebook Setup services?",
		a: "We provide end-to-end channel and page setups: custom 4K banner and logo design, phone verification, high-ranking SEO tags, auto-reply chat bots, WhatsApp Business linking, and complete monetization eligibility guidelines.",
	},
	{
		q: "Are the followers, subscribers, and watch hours safe and non-drop?",
		a: "Yes! All audience packages (YouTube subscribers, 4,000 watch hours, Facebook followers, Instagram followers) are delivered safely complying with platform guidelines, accompanied by lifetime non-drop warranty.",
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

	// social media growth tab filter state
	const [activeSocialTab, setActiveSocialTab] = useState("all");

	// faq accordion state
	const [activeFaq, setActiveFaq] = useState(0);

	const toggleFaq = (index) => {
		setActiveFaq(activeFaq === index ? null : index);
	};

	// filter web dev options if tab is active
	const filteredWebDev =
		activeWebTab === "all"
			? webDevOptions
			: webDevOptions.filter((opt) => opt.id === activeWebTab);

	// filter social media options if tab is active
	const filteredSocialMedia =
		activeSocialTab === "all"
			? socialMediaGrowthOptions
			: socialMediaGrowthOptions.filter((opt) => opt.id === activeSocialTab);

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

						{/* right column hero illustration image */}
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

			{/* trusted companies marquee strip right below banner */}
			<section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="rounded-2xl bg-[#09152a]/80 backdrop-blur-md border border-cyan-500/25 p-5 md:p-6 shadow-[0_4px_30px_rgba(6,182,212,0.12)]">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div className="flex items-center gap-2.5 text-cyan-300 font-bold text-xs uppercase tracking-wider flex-shrink-0">
							<Sparkles className="w-4 h-4 text-cyan-400" />
							<span>Enterprise Technologies & Stack:</span>
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

			{/* main content container with max-w */}
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24" suppressHydrationWarning>
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
							From modular frontend and backend engineering to YouTube channel setup, Facebook business pages, audience scaling, and turnkey SaaS applications.
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
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
							{filteredWebDev.map((opt) => (
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
											<h4 className="text-xl font-bold text-white mt-0.5 group-hover:text-cyan-200 transition-colors">
												{opt.title}
											</h4>
											<p className="text-[11px] text-slate-400 font-medium">
												{opt.subtitle}
											</p>
											<p className="text-slate-300 text-xs leading-relaxed mt-2.5">
												{opt.description}
											</p>
										</div>

										{/* tech stack pills */}
										<div className="space-y-1.5 pt-2">
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
										<div className="space-y-1.5 pt-2">
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
									</div>

									{/* card footer with price and action button */}
									<div className="relative z-10 pt-6 mt-6 border-t border-cyan-500/20 space-y-3">
										<div className="flex items-baseline justify-between">
											<div>
												<span className="text-[10px] text-slate-400 uppercase tracking-wider block">
													Starting Price
												</span>
												<div className="flex items-baseline gap-1.5">
													<span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
														{opt.priceBDT}
													</span>
													<span className="text-slate-400 text-xs font-semibold">
														/ {opt.priceUSD}
													</span>
												</div>
											</div>

											<span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold">
												Milestone Assured
											</span>
										</div>

										<Link
											href="/#consultation"
											className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
												opt.popular
													? "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
													: "bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95"
											}`}
										>
											<span>Select {opt.title}</span>
											<ArrowRight className="w-3.5 h-3.5" />
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* 2. social media and channel growth solutions right after web development */}
					<div className="space-y-6 pt-4">
						<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-cyan-500/20">
							<div>
								<div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
									<Share2 className="w-4 h-4" />
									<span>AUDIENCE & BRAND ACCELERATION</span>
								</div>
								<h3 className="text-xl sm:text-2xl font-black text-white mt-1">
									Social Media & Channel Growth Solutions
								</h3>
								<p className="text-slate-400 text-xs mt-1">
									Turnkey YouTube channel setup, verified Facebook business pages, real followers, subscribers, and watch time packages.
								</p>
							</div>

							{/* interactive social options pill switcher */}
							<div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md">
								<button
									type="button"
									onClick={() => setActiveSocialTab("all")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeSocialTab === "all"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									All 3 Packages
								</button>
								<button
									type="button"
									onClick={() => setActiveSocialTab("youtube-setup")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeSocialTab === "youtube-setup"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									1. YouTube Setup
								</button>
								<button
									type="button"
									onClick={() => setActiveSocialTab("facebook-setup")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeSocialTab === "facebook-setup"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									2. Facebook Page
								</button>
								<button
									type="button"
									onClick={() => setActiveSocialTab("growth-sales")}
									className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
										activeSocialTab === "growth-sales"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]"
											: "text-slate-400 hover:text-white"
									}`}
								>
									3. Followers & Subscribers
								</button>
							</div>
						</div>

						{/* social media three cards grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
							{filteredSocialMedia.map((pkg) => (
								<div
									key={pkg.id}
									className={`group relative rounded-3xl p-6 sm:p-7 bg-[#09152a]/90 backdrop-blur-xl border ${pkg.border} ${pkg.glow} transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5`}
								>
									<div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${pkg.gradient} rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

									<div className="relative z-10 space-y-4">
										<div className="flex items-center justify-between">
											<div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)] group-hover:scale-110 group-hover:border-cyan-300 transition-all duration-300">
												{pkg.icon}
											</div>
											<span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
												{pkg.badge}
											</span>
										</div>

										<div>
											<span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest">
												{pkg.optionNumber}
											</span>
											<h4 className="text-xl font-bold text-white mt-0.5 group-hover:text-cyan-200 transition-colors">
												{pkg.title}
											</h4>
											<p className="text-[11px] text-slate-400 font-medium">
												{pkg.subtitle}
											</p>
											<p className="text-slate-300 text-xs leading-relaxed mt-2.5">
												{pkg.description}
											</p>
										</div>

										{/* platforms / features pills */}
										<div className="space-y-1.5 pt-2">
											<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
												Supported Channels & Tools
											</span>
											<div className="flex flex-wrap gap-1.5">
												{pkg.platforms.map((platform, i) => (
													<span
														key={i}
														className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950 border border-cyan-500/20 text-slate-300 font-medium"
													>
														{platform}
													</span>
												))}
											</div>
										</div>

										{/* deliverables list */}
										<div className="space-y-1.5 pt-2">
											<span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
												<CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
												Key Deliverables
											</span>
											<div className="space-y-1.5">
												{pkg.deliverables.map((item, idx) => (
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

									{/* card footer with price and action button */}
									<div className="relative z-10 pt-6 mt-6 border-t border-cyan-500/20 space-y-3">
										<div className="flex items-baseline justify-between">
											<div>
												<span className="text-[10px] text-slate-400 uppercase tracking-wider block">
													Starting Price
												</span>
												<div className="flex items-baseline gap-1.5">
													<span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
														{pkg.priceBDT}
													</span>
													<span className="text-slate-400 text-xs font-semibold">
														/ {pkg.priceUSD}
													</span>
												</div>
											</div>

											<span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold">
												Non-Drop Guarantee
											</span>
										</div>

										<Link
											href="/#consultation"
											className={`w-full py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
												pkg.popular
													? "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white border border-cyan-300/60 shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:shadow-[0_0_30px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
													: "bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95"
											}`}
										>
											<span>Order {pkg.title}</span>
											<ArrowRight className="w-3.5 h-3.5" />
										</Link>
									</div>
								</div>
							))}
						</div>
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

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
						{enterpriseTechStack.map((stack, idx) => (
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
										<h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
											{stack.category}
										</h3>
										<p className="text-slate-300 text-xs leading-relaxed mt-1.5">
											{stack.description}
										</p>
									</div>

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
								</div>

								<div className="relative z-10 pt-5 mt-5 border-t border-cyan-500/20">
									<Link
										href="/portfolio"
										className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white group-hover:translate-x-1 transition-all"
									>
										<span>View in Developer Portfolio</span>
										<ArrowRight className="w-3.5 h-3.5" />
									</Link>
								</div>
							</div>
						))}
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

				{/* markivo we are a digital agency with added value for your business */}
				<section className="space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
						{/* left agency story and value pillars */}
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

							{/* markivo three value feature boxes */}
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

						{/* right interactive agency credentials card */}
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

				{/* markivo explore our projects showcase portfolio grid */}
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

				{/* pricing plans and instant checkout section */}
				<PricingAndPayment />

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
						{clientTestimonials.map((item, idx) => (
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
												<option value="1. Frontend Web Development" className="bg-slate-900">1. Frontend Web Development (React / Next.js)</option>
												<option value="2. Backend Development" className="bg-slate-900">2. Backend Development (Node.js / PostgreSQL)</option>
												<option value="3. Full-Stack Development" className="bg-slate-900">3. Full-Stack Web Development (Turnkey App)</option>
												<option value="YouTube Channel Setup & Monetization" className="bg-slate-900">YouTube Channel Setup & Monetization</option>
												<option value="Facebook Page & Meta Business Setup" className="bg-slate-900">Facebook Page & Meta Business Setup</option>
												<option value="Followers, Subscribers & Watch Time" className="bg-slate-900">Followers, Subscribers & Watch Time Boost</option>
												<option value="YouTube Channel Automation & Ops" className="bg-slate-900">YouTube Channel Automation & Video Ops</option>
												<option value="Social Media Marketing & Ads" className="bg-slate-900">Social Media Marketing & Meta/Google Ads</option>
												<option value="Technical SEO & Consulting" className="bg-slate-900">Technical SEO & CRO Audits</option>
											</select>
										</div>
										<div>
											<label className="block text-xs font-semibold text-slate-300 mb-1.5">
												Approximate Budget
											</label>
											<input
												type="text"
												name="budget"
												placeholder="e.g. $500 - $2,000 / ৳5k - ৳95k"
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

			{/* modern agency footer */}
			<Footer />
		</div>
	);
}
