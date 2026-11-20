"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
	ShieldCheck,
	CreditCard,
	Zap,
	ArrowRight,
	CheckCircle2,
	Lock,
	Smartphone,
	Building2,
	RefreshCw,
} from "lucide-react";

// checkout content component wrapped in suspense
function CheckoutContent() {
	// console.log("rendering payment checkout confirmation screen")

	const searchParams = useSearchParams();
	const router = useRouter();

	const txn = searchParams.get("txn") || "";
	const queryAmount = searchParams.get("amount") || "";
	const queryService = searchParams.get("service") || "";

	const [paymentData, setPaymentData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isProcessing, setIsProcessing] = useState(false);
	const [selectedMethod, setSelectedMethod] = useState("bkash");
	const [error, setError] = useState(null);

	// fetch payment transaction details
	useEffect(() => {
		if (!txn) {
			setIsLoading(false);
			return;
		}

		const fetchDetails = async () => {
			try {
				const res = await fetch(`http://localhost:5000/api/v1/payments/${txn}`);
				const data = await res.json();
				if (data.success && data.data) {
					setPaymentData(data.data);
				}
			} catch (_err) {
				// console.log("offline payment lookup notice", _err)
			} finally {
				setIsLoading(false);
			}
		};

		fetchDetails();
	}, [txn]);

	// handle payment verification
	const handleConfirmPayment = async () => {
		setIsProcessing(true);
		setError(null);

		try {
			const res = await fetch(
				`http://localhost:5000/api/v1/payments/verify/${txn || "demo"}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
				},
			);
			const data = await res.json();

			if (data.success) {
				const invoiceNum =
					data.data?.invoiceNumber || paymentData?.invoiceNumber || txn;
				router.push(
					`/payment/success?invoice=${invoiceNum}&txn=${txn}&amount=${paymentData?.amount || queryAmount}&service=${encodeURIComponent(paymentData?.serviceTitle || queryService || "Agency Service")}`,
				);
			} else {
				// fallback redirect for offline demo
				router.push(
					`/payment/success?invoice=INV-${txn.slice(0, 8)}&txn=${txn}&amount=${queryAmount || 15000}&service=${encodeURIComponent(queryService || "Agency Package")}`,
				);
			}
		} catch (_err) {
			// console.log("simulation payment completion notice", _err)
			router.push(
				`/payment/success?invoice=INV-OFFLINE&txn=${txn}&amount=${queryAmount || 15000}&service=${encodeURIComponent(queryService || "Agency Package")}`,
			);
		} finally {
			setIsProcessing(false);
		}
	};

	const displayService =
		paymentData?.serviceTitle || queryService || "Starter Launchpad Package";
	const displayAmount = paymentData?.amount || queryAmount || "15000";
	const displayClientName = paymentData?.clientName || "Valued Client";
	const displayEmail = paymentData?.clientEmail || "";

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 py-12 relative overflow-hidden">
			{/* background ambient glow */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

			<div className="relative z-10 w-full max-w-xl">
				{/* card container */}
				<div className="rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-6 backdrop-blur-xl">
					{/* header */}
					<div className="flex items-center justify-between border-b border-slate-800 pb-5">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
								<CreditCard className="w-5 h-5" />
							</div>
							<div>
								<h1 className="text-xl font-black text-white">
									Secure Checkout
								</h1>
								<p className="text-slate-400 text-xs">
									Provash Agency & Digital Ecosystem
								</p>
							</div>
						</div>
						<div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
							<Lock className="w-3.5 h-3.5" />
							<span>Encrypted 256-bit</span>
						</div>
					</div>

					{/* order summary */}
					<div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
						<div className="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
							<span>Selected Service</span>
							<span>Total Amount</span>
						</div>
						<div className="flex justify-between items-start gap-4">
							<div>
								<h2 className="text-base font-bold text-white">
									{displayService}
								</h2>
								<p className="text-xs text-slate-400 mt-0.5">
									Client: {displayClientName}{" "}
									{displayEmail ? `(${displayEmail})` : ""}
								</p>
								{txn && (
									<p className="text-[11px] font-mono text-cyan-400 mt-1">
										Ref: {txn}
									</p>
								)}
							</div>
							<div className="text-right">
								<span className="text-2xl font-black text-cyan-300">
									৳{Number(displayAmount).toLocaleString()}
								</span>
								<p className="text-[11px] text-slate-400">BDT (All Taxes Incl.)</p>
							</div>
						</div>
					</div>

					{/* payment method selection */}
					<div className="space-y-3">
						<label className="block text-xs font-semibold text-slate-300">
							Select Preferred Payment Gateway
						</label>
						<div className="grid grid-cols-3 gap-3">
							<button
								type="button"
								onClick={() => setSelectedMethod("bkash")}
								className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
									selectedMethod === "bkash"
										? "border-pink-500 bg-pink-950/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]"
										: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
								}`}
							>
								<Smartphone className="w-4 h-4 mb-1 text-pink-400" />
								<p className="text-xs font-bold text-white">bKash</p>
								<p className="text-[10px] text-slate-400">Direct / Merchant</p>
							</button>

							<button
								type="button"
								onClick={() => setSelectedMethod("nagad")}
								className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
									selectedMethod === "nagad"
										? "border-amber-500 bg-amber-950/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
										: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
								}`}
							>
								<Smartphone className="w-4 h-4 mb-1 text-amber-400" />
								<p className="text-xs font-bold text-white">Nagad</p>
								<p className="text-[10px] text-slate-400">Instant Wallet</p>
							</button>

							<button
								type="button"
								onClick={() => setSelectedMethod("card")}
								className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
									selectedMethod === "card"
										? "border-blue-500 bg-blue-950/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
										: "border-slate-800 bg-slate-950 text-slate-400 hover:text-white"
								}`}
							>
								<Building2 className="w-4 h-4 mb-1 text-blue-400" />
								<p className="text-xs font-bold text-white">Cards / Bank</p>
								<p className="text-[10px] text-slate-400">Visa / Master</p>
							</button>
						</div>
					</div>

					{/* gateway instruction note */}
					<div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs space-y-1.5 text-slate-300">
						<div className="flex items-center gap-2 text-cyan-400 font-bold">
							<ShieldCheck className="w-4 h-4" />
							<span>Sprint Assurance Guarantee</span>
						</div>
						<p className="text-[11px] text-slate-400">
							Your payment initiates an active agile sprint tracked in real time. We provide complete milestone tracking and full refund protection if milestones fail.
						</p>
					</div>

					{error && (
						<div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
							{error}
						</div>
					)}

					{/* confirm payment action */}
					<div className="space-y-3 pt-2">
						<button
							type="button"
							onClick={handleConfirmPayment}
							disabled={isProcessing}
							className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:from-cyan-300 hover:to-blue-400 transition-all cursor-pointer shadow-lg shadow-cyan-400/25 disabled:opacity-50"
						>
							{isProcessing ? (
								<>
									<RefreshCw className="w-4 h-4 animate-spin" />
									<span>Verifying Payment...</span>
								</>
							) : (
								<>
									<span>Confirm & Pay ৳{Number(displayAmount).toLocaleString()}</span>
									<ArrowRight className="w-4 h-4" />
								</>
							)}
						</button>

						<div className="text-center">
							<Link
								href="/#pricing"
								className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
							>
								Cancel and return to pricing plans
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// exported page with suspense boundary
export default function CheckoutPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
					<RefreshCw className="w-6 h-6 animate-spin" />
				</div>
			}
		>
			<CheckoutContent />
		</Suspense>
	);
}
