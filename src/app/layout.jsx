import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationManager from "@/components/HeaderFooter/NavigationManager";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Provash Dev | Scalable Web Applications & Enterprise Software Architecture",
	description:
		"Full-Stack Web Engineering Studio specialized in Next.js 16, React 19, TypeScript 5, Express.js APIs, and scalable PostgreSQL Prisma SaaS platforms.",
	icons: {
		icon: "/icon.png",
	},
};

// root layout component
export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
			suppressHydrationWarning
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								if (typeof window === 'undefined') return;
								try {
									var orig = Element.prototype.setAttribute;
									Element.prototype.setAttribute = function(name, val) {
										if (name === 'bis_skin_checked') return;
										return orig.apply(this, arguments);
									};
								} catch (err) {}
								window.addEventListener('unhandledrejection', function(e) {
									if (e.reason && (String(e.reason).includes('chrome-extension') || String(e.reason).includes('M_ID') || String(e.reason).includes('bis_skin_checked'))) {
										e.preventDefault();
										e.stopImmediatePropagation();
									}
								}, true);
								window.addEventListener('error', function(e) {
									if (e.filename && e.filename.includes('chrome-extension')) {
										e.preventDefault();
										e.stopImmediatePropagation();
									}
								}, true);
							})();
						`,
					}}
				/>
			</head>
			<body
				className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased"
				suppressHydrationWarning
			>
				<QueryProvider>
					<NavigationManager />
					<main className="flex-1 w-full">{children}</main>
				</QueryProvider>
			</body>
		</html>
	);
}
