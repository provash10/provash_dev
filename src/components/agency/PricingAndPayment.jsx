"use client";

import React, { useState } from "react";
import { Check, CreditCard, ShieldCheck, Zap, X, ArrowRight } from "lucide-react";

// agency pricing plans
const plansData = [
	{
		id: "starter",
		name: "Starter Launchpad",
		priceBDT: "৳15,000",
		priceUSD: "$150",
		description:
			"Ideal for individuals or small startups looking for an immediate digital boost.",
		features: [
			"Single-page responsive Next.js website",
			"Or 4 YouTube automated videos with script & edit",
			"Basic SEO & meta tags configuration",
			"5-day fast turnaround",
			"1 month post-launch support",
		],
		badge: null,
		buttonText: "Choose Starter",
		popular: false,
	},
	{
		id: "growth",
		name: "Growth Business",
		priceBDT: "৳45,000",
		priceUSD: "$450",
		description:
			"Complete web engineering & automated content creation to scale your brand revenue.",
		features: [
			"Multi-page Next.js web application with backend API",
			"12 automated YouTube videos with high-CTR thumbnails",
			"Social media marketing & targeted Meta ads setup",
			"Database & authentication integration",
			"Priority 24/7 technical support",
		],
		badge: "Most Popular",
		buttonText: "Order Growth Plan",
		popular: true,
	},
	{
		id: "enterprise",
		name: "Enterprise Elite",
		priceBDT: "৳95,000",
		priceUSD: "$950",
		description:
			"Custom software development, full channel management, and omni-channel growth.",
		features: [
			"Full-stack custom SaaS or business application",
			"Online payment gateway integration (bKash, SSLCommerz, Stripe)",
			"Full monthly YouTube channel operations & SEO",
			"Omni-channel advertising (Meta, Google & LinkedIn)",
			"Dedicated developer & weekly strategy meetings",
		],
		badge: "Enterprise",
		buttonText: "Get Enterprise Plan",
		popular: false,
	},
];

// pricing and payment component
export default function PricingAndPayment() {
	// console.log("rendering agency pricing and online payment section")

	const [selectedPlan, setSelectedPlan] = useState(null);
	const [paymentGateway, setPaymentGateway] = useState("BKASH");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [paymentSuccess, setPaymentSuccess] = useState(null);

	// handle checkout submission
	const handleCheckout = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formData = new FormData(e.currentTarget);
		const payload = {
			serviceTitle: selectedPlan.name,
			amount:
				selectedPlan.id === "starter"
					? 15000
					: selectedPlan.id === "growth"
						? 45000
						: 95000,
			currency: "BDT",
			clientName: formData.get("clientName"),
			clientEmail: formData.get("clientEmail"),
			clientPhone: formData.get("clientPhone"),
			paymentGateway: paymentGateway,
		};

		try {
			const res = await fetch("http://localhost:5000/api/v1/payments/initiate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const data = await res.json();
			if (data.success) {
				setPaymentSuccess(data.data);
			} else {
				// fallback demonstration invoice
				setPaymentSuccess({
					transactionId: `txn_${Date.now()}`,
					amount: payload.amount,
					currency: "BDT",
					status: "PENDING",
				});
			}
		} catch (error) {
			// console.log("payment initiation completed with offline notice", error)
			setPaymentSuccess({
				transactionId: `demo_txn_${Date.now()}`,
				amount: payload.amount,
				currency: "BDT",
				status: "PENDING",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section id="pricing" className="space-y-10 scroll-mt-24">
			{/* section header matching markivo */}
			<div className="text-center max-w-3xl mx-auto space-y-3">
				<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.25)]">
					<CreditCard className="w-4 h-4 text-cyan-400" />
					PRICING PLANS
				</div>
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
					Take a Look of Our Pricing and Select Your Choice
				</h2>
				<p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto">
					Select an all-inclusive package tailored to your goals. We accept bKash, Nagad, Visa, Mastercard, and international bank transfers with 100% money-back sprint assurance.
				</p>
			</div>

			{/* plans grid with markivo aesthetic */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
				{plansData.map((plan) => (
					<div
						key={plan.id}
						className={`relative rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${
							plan.popular
								? "bg-gradient-to-br from-[#09152a] via-[#0d2247] to-[#071329] border-2 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.35)] md:-translate-y-2"
								: "bg-[#09152a]/90 backdrop-blur-xl border border-cyan-500/25 hover:border-cyan-400/60 shadow-[0_4px_25px_rgba(6,182,212,0.12)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.25)]"
						}`}
					>
						{plan.popular && (
							<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.6)]">
								{plan.badge}
							</div>
						)}

						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-bold text-cyan-200 mb-2">{plan.name}</h3>
								<p className="text-slate-300 text-xs leading-relaxed min-h-[36px]">
									{plan.description}
								</p>
							</div>

							<div className="flex items-baseline gap-2">
								<span className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-cyan-200 to-white">
									{plan.priceBDT}
								</span>
								<span className="text-slate-400 text-sm font-semibold">
									/ {plan.priceUSD}
								</span>
							</div>

							<div className="space-y-3 pt-4 border-t border-cyan-500/20">
								{plan.features.map((feature, idx) => (
									<div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
										<Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
										<span>{feature}</span>
									</div>
								))}
							</div>
						</div>

						<div className="pt-8">
							<button
								onClick={() => {
									setSelectedPlan(plan);
									setPaymentSuccess(null);
								}}
								className={`w-full py-3 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
									plan.popular
										? "bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 hover:from-cyan-400 hover:via-blue-500 hover:to-cyan-400 text-white border border-cyan-300/60 shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-105 active:scale-95"
										: "bg-slate-900/90 hover:bg-slate-800 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-105 active:scale-95"
								}`}
							>
								{plan.buttonText}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* payment options badges */}
			<div className="rounded-2xl bg-[#09152a]/90 backdrop-blur-md border border-cyan-500/25 p-5 flex flex-wrap items-center justify-between gap-4 text-slate-300 text-xs shadow-[0_0_20px_rgba(6,182,212,0.1)]">
				<div className="flex items-center gap-3">
					<ShieldCheck className="w-5 h-5 text-emerald-400" />
					<span>100% Secure Encrypted Payment Gateway Integration</span>
				</div>
				<div className="flex items-center gap-3 text-slate-200 font-semibold">
					<span className="px-3 py-1 rounded-full bg-pink-950/70 text-pink-300 border border-pink-500/40 font-bold">
						bKash
					</span>
					<span className="px-3 py-1 rounded-full bg-orange-950/70 text-orange-300 border border-orange-500/40 font-bold">
						Nagad
					</span>
					<span className="px-3 py-1 rounded-full bg-blue-950/70 text-blue-300 border border-blue-500/40 font-bold">
						Visa / Mastercard
					</span>
					<span className="px-3 py-1 rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 font-bold">
						Bank Transfer
					</span>
				</div>
			</div>

			{/* checkout modal */}
			{selectedPlan && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
					<div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#0b1b3d] via-[#0f2a5c] to-[#08132b] border border-cyan-400 p-6 md:p-8 shadow-[0_0_45px_rgba(6,182,212,0.4)] space-y-6 text-white max-h-[90vh] overflow-y-auto">
						<button
							onClick={() => setSelectedPlan(null)}
							className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-900 border border-cyan-500/40 cursor-pointer"
						>
							<X className="w-5 h-5" />
						</button>

						<div>
							<span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
								Checkout & Payment
							</span>
							<h3 className="text-xl md:text-2xl font-black mt-1 text-white">
								{selectedPlan.name}
							</h3>
							<p className="text-slate-300 text-xs mt-1">
								Total Payable:{" "}
								<strong className="text-cyan-300 text-sm">
									{selectedPlan.priceBDT} ({selectedPlan.priceUSD})
								</strong>
							</p>
						</div>

						{paymentSuccess ? (
							<div className="space-y-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 p-6 text-center">
								<div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
									<Zap className="w-6 h-6" />
								</div>
								<h4 className="text-lg font-bold text-white">Payment Initiated!</h4>
								<p className="text-slate-300 text-xs">
									Transaction Reference:{" "}
									<code className="text-cyan-300 font-mono">
										{paymentSuccess.transactionId}
									</code>
								</p>
								<div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
									<p className="text-slate-300 font-semibold">
										bKash / Nagad Direct Payment:
									</p>
									<p className="text-slate-400">
										Send money to:{" "}
										<strong className="text-cyan-400">+8801700000000</strong> (Personal)
									</p>
									<p className="text-slate-400">
										Reference: Use your transaction ID or Name
									</p>
								</div>
								<button
									onClick={() => setSelectedPlan(null)}
									className="w-full py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-sm cursor-pointer"
								>
									Done
								</button>
							</div>
						) : (
							<form onSubmit={handleCheckout} className="space-y-4">
								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Full Name
									</label>
									<input
										type="text"
										name="clientName"
										required
										placeholder="e.g. John Doe"
										className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Email Address
									</label>
									<input
										type="email"
										name="clientEmail"
										required
										placeholder="e.g. john@example.com"
										className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-1">
										Phone Number (bKash / WhatsApp)
									</label>
									<input
										type="tel"
										name="clientPhone"
										required
										placeholder="e.g. +8801XXXXXXXXX"
										className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400"
									/>
								</div>

								<div>
									<label className="block text-xs font-semibold text-slate-300 mb-2">
										Select Payment Gateway
									</label>
									<div className="grid grid-cols-3 gap-2">
										<button
											type="button"
											onClick={() => setPaymentGateway("BKASH")}
											className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
												paymentGateway === "BKASH"
													? "border-pink-500 bg-pink-950/50 text-pink-300"
													: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
											}`}
										>
											bKash
										</button>
										<button
											type="button"
											onClick={() => setPaymentGateway("SSLCOMMERZ")}
											className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
												paymentGateway === "SSLCOMMERZ"
													? "border-blue-500 bg-blue-950/50 text-blue-300"
													: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
											}`}
										>
											Nagad / Cards
										</button>
										<button
											type="button"
											onClick={() => setPaymentGateway("STRIPE")}
											className={`py-2 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
												paymentGateway === "STRIPE"
													? "border-purple-500 bg-purple-950/50 text-purple-300"
													: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
											}`}
										>
											International
										</button>
									</div>
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer shadow-lg shadow-cyan-400/20"
								>
									{isSubmitting ? "Processing..." : "Proceed to Pay Securely"}
									<ArrowRight className="w-4 h-4" />
								</button>
							</form>
						)}
					</div>
				</div>
			)}
		</section>
	);
}
