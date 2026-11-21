"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	MessageSquare,
	X,
	Send,
	Sparkles,
	Phone,
	Mail,
	ArrowRight,
	Bot,
	CheckCheck,
} from "lucide-react";

// floating chat client component for direct customer communication
export default function FloatingChat() {
	// console.log("floating chat mounted")
	const [isOpen, setIsOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const [inputMessage, setInputMessage] = useState("");
	const [chatMessages, setChatMessages] = useState([
		{
			id: "welcome",
			sender: "agent",
			text: "Hello! Welcome to Provash Dev Engineering Studio. How can we help you with your web application or custom software architecture today?",
			time: "Just now",
		},
	]);
	const [isTyping, setIsTyping] = useState(false);
	const messagesEndRef = useRef(null);

	// ensure component is mounted on client to prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// auto scroll to bottom on new message
	useEffect(() => {
		if (isOpen) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [chatMessages, isOpen]);

	// handle user message submit
	const handleSendMessage = (e) => {
		e?.preventDefault();
		const trimmed = inputMessage.trim();
		if (!trimmed) return;

		const userMsg = {
			id: `user-${Date.now()}`,
			sender: "user",
			text: trimmed,
			time: "Just now",
		};

		setChatMessages((prev) => [...prev, userMsg]);
		setInputMessage("");
		setIsTyping(true);

		// simulated fast agency assistant response
		setTimeout(() => {
			setIsTyping(false);
			const agentReply = {
				id: `agent-${Date.now()}`,
				sender: "agent",
				text: "Thank you for reaching out! We have received your message. For instant response and consultation, feel free to connect with Provash directly on WhatsApp.",
				time: "Just now",
				showWhatsApp: true,
			};
			setChatMessages((prev) => [...prev, agentReply]);
		}, 1000);
	};

	if (!mounted) return null;

	return (
		<div className="fixed bottom-6 right-6 z-50 select-none">
			{/* chat popup window */}
			{isOpen && (
				<div className="fixed sm:absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[380px] max-w-[380px] h-[520px] max-h-[calc(100vh-6rem)] rounded-3xl bg-[#071329]/95 border border-cyan-500/35 shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.25)] backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
					{/* chat header */}
					<div className="p-4 bg-gradient-to-r from-[#0c214d] via-[#091b3a] to-[#071329] border-b border-cyan-500/25 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="relative">
								<div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-[0_0_15px_rgba(6,182,212,0.6)]">
									P
								</div>
								<span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
							</div>
							<div>
								<div className="flex items-center gap-1.5">
									<h4 className="text-sm font-bold text-white tracking-wide">
										Provash Dev Support
									</h4>
									<Sparkles className="w-3.5 h-3.5 text-cyan-400" />
								</div>
								<p className="text-[11px] text-cyan-300/80 font-medium">
									Engineering Lead • Online
								</p>
							</div>
						</div>

						{/* close button */}
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
							aria-label="close chat"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* chat quick direct channels bar */}
					<div className="px-4 py-2 bg-slate-900/60 border-b border-cyan-500/15 flex items-center justify-between text-[11px]">
						<span className="text-slate-400 font-medium">Direct connect:</span>
						<div className="flex items-center gap-2">
							<a
								href="https://wa.me/8801710490345"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:text-white text-[10px] font-bold transition-all shadow-sm"
							>
								<Phone className="w-3 h-3 text-emerald-400" />
								<span>WhatsApp</span>
							</a>
							<a
								href="mailto:provashsharma10@gmail.com"
								className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white text-[10px] font-bold transition-all shadow-sm"
							>
								<Mail className="w-3 h-3 text-cyan-400" />
								<span>Email</span>
							</a>
						</div>
					</div>

					{/* messages scroll area */}
					<div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
						{chatMessages.map((msg) => (
							<div
								key={msg.id}
								className={`flex flex-col ${
									msg.sender === "user" ? "items-end" : "items-start"
								}`}
							>
								<div
									className={`max-w-[85%] p-3.5 rounded-2xl ${
										msg.sender === "user"
											? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-none shadow-[0_4px_15px_rgba(6,182,212,0.3)]"
											: "bg-[#0c1c38] border border-cyan-500/20 text-slate-200 rounded-bl-none shadow-sm leading-relaxed"
									}`}
								>
									<p>{msg.text}</p>

									{msg.showWhatsApp && (
										<a
											href="https://wa.me/8801710490345"
											target="_blank"
											rel="noopener noreferrer"
											className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shadow-md transition-all cursor-pointer"
										>
											<Phone className="w-3 h-3" />
											<span>Open WhatsApp Chat</span>
											<ArrowRight className="w-3 h-3" />
										</a>
									)}
								</div>
								<span className="text-[9px] text-slate-500 mt-1 px-1">
									{msg.time}
								</span>
							</div>
						))}

						{/* typing indicator */}
						{isTyping && (
							<div className="flex items-center gap-1.5 p-3 rounded-2xl bg-[#0c1c38] border border-cyan-500/20 w-fit text-cyan-400 text-[11px]">
								<Bot className="w-3.5 h-3.5 animate-bounce" />
								<span className="animate-pulse">Typing reply...</span>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* quick prompt chips */}
					<div className="px-3 py-1.5 bg-slate-950/70 border-t border-cyan-500/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
						<button
							type="button"
							onClick={() => {
								setInputMessage("I need a custom full-stack web application.");
							}}
							className="shrink-0 px-2.5 py-1 rounded-full bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium transition-colors cursor-pointer"
						>
							🚀 Build Web App
						</button>
						<button
							type="button"
							onClick={() => {
								setInputMessage("What is the estimated budget and timeline?");
							}}
							className="shrink-0 px-2.5 py-1 rounded-full bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-[10px] font-medium transition-colors cursor-pointer"
						>
							💰 Pricing & Timeline
						</button>
					</div>

					{/* chat input form */}
					<form
						onSubmit={handleSendMessage}
						className="p-3 bg-[#050b17] border-t border-cyan-500/20 flex items-center gap-2"
					>
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							placeholder="Type your message..."
							className="flex-1 bg-slate-900 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
						/>
						<button
							type="submit"
							disabled={!inputMessage.trim()}
							className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
							aria-label="send message"
						>
							<Send className="w-4 h-4" />
						</button>
					</form>
				</div>
			)}

			{/* floating circular trigger button */}
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-cyan-400 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.7)] hover:shadow-[0_0_35px_rgba(6,182,212,0.9)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-cyan-200/50"
				aria-label={isOpen ? "close floating chat" : "open floating chat"}
			>
				{/* glowing ambient ring */}
				<span className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-sm group-hover:bg-cyan-400/50 transition-all pointer-events-none" />

				{/* online active pulse dot */}
				<span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping pointer-events-none" />
				<span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 pointer-events-none" />

				{/* icon toggle */}
				{isOpen ? (
					<X className="w-6 h-6 text-white relative z-10 transition-transform group-hover:rotate-90 duration-200" />
				) : (
					<MessageSquare className="w-6 h-6 text-white relative z-10 transition-transform group-hover:scale-110 duration-200" />
				)}
			</button>
		</div>
	);
}
