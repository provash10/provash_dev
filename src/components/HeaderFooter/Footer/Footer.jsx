"use client";

import Link from "next/link";
import React from "react";
import { ArrowRight, Mail, Phone, MapPin, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

// modern agency footer matching markivo aesthetic
const Footer = () => {
	return (
		<footer className="w-full bg-[#071329] border-t border-slate-900 text-slate-400 text-xs">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
					{/* column 1: brand & mission */}
					<div className="lg:col-span-2 space-y-4">
						<Link href="/" className="inline-block">
							<img
								src="/img/devaioz_tlogo.png"
								alt="DEVAIOZ Agency Logo"
								className="h-9 w-auto object-contain"
							/>
						</Link>
						<p className="text-slate-400 text-xs leading-relaxed max-w-sm">
							DEVAIOZ is a full-service digital agency and software engineering studio.
							We engineer high-performance web applications, revenue-generating YouTube
							automation systems, and scalable digital marketing funnels for global brands.
						</p>
						<div className="flex items-center gap-3 pt-2">
							<a
								href="https://github.com/provash10"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-110"
								title="GitHub"
							>
								<FaGithub className="w-4 h-4" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-110"
								title="LinkedIn"
							>
								<FaLinkedin className="w-4 h-4" />
							</a>
							<a
								href="https://youtube.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-400 hover:border-red-500/50 transition-all hover:scale-110"
								title="YouTube"
							>
								<FaYoutube className="w-4 h-4" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all hover:scale-110"
								title="Twitter"
							>
								<FaTwitter className="w-4 h-4" />
							</a>
						</div>
					</div>

					{/* column 2: services */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-white uppercase tracking-wider">
							Core Services
						</h4>
						<ul className="space-y-2">
							<li>
								<Link href="/#services" className="hover:text-cyan-300 transition-colors">
									Full-Stack Web Development
								</Link>
							</li>
							<li>
								<Link href="/#services" className="hover:text-cyan-300 transition-colors">
									YouTube Automation & Editing
								</Link>
							</li>
							<li>
								<Link href="/#services" className="hover:text-cyan-300 transition-colors">
									Social Media Ads & Marketing
								</Link>
							</li>
							<li>
								<Link href="/#services" className="hover:text-cyan-300 transition-colors">
									Technical SEO & Consulting
								</Link>
							</li>
							<li>
								<Link href="/#pricing" className="hover:text-cyan-300 transition-colors">
									Custom SaaS Engineering
								</Link>
							</li>
						</ul>
					</div>

					{/* column 3: quick links */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-white uppercase tracking-wider">
							Navigation
						</h4>
						<ul className="space-y-2">
							<li>
								<Link href="/" className="hover:text-cyan-300 transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link href="/portfolio" className="hover:text-cyan-300 transition-colors">
									Developer Portfolio
								</Link>
							</li>
							<li>
								<Link href="/#pricing" className="hover:text-cyan-300 transition-colors">
									Pricing Plans
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:text-cyan-300 transition-colors">
									About Founder
								</Link>
							</li>
							<li>
								<Link href="/contact" className="hover:text-cyan-300 transition-colors">
									Contact & Hire
								</Link>
							</li>
						</ul>
					</div>

					{/* column 4: contact details */}
					<div className="space-y-3">
						<h4 className="text-sm font-bold text-white uppercase tracking-wider">
							Contact Info
						</h4>
						<ul className="space-y-2.5">
							<li className="flex items-center gap-2">
								<Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
								<span className="text-slate-300">provash20cb@gmail.com</span>
							</li>
							<li className="flex items-center gap-2">
								<Phone className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
								<span className="text-slate-300">+880 1XXXXXXXXX</span>
							</li>
							<li className="flex items-start gap-2">
								<MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
								<span className="text-slate-300">Dhaka, Bangladesh (Remote Worldwide)</span>
							</li>
						</ul>
					</div>
				</div>

				{/* bottom copyright strip */}
				<div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
					<p>© {new Date().getFullYear()} DEVAIOZ Agency. All rights reserved.</p>
					<p className="flex items-center gap-1">
						<span>Crafted with</span>
						<Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
						<span>by Provash</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
