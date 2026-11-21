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
								var observer = new MutationObserver(function(mutations) {
									for (var i = 0; i < mutations.length; i++) {
										var m = mutations[i];
										if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
											m.target.removeAttribute('bis_skin_checked');
										}
									}
								});
								observer.observe(document.documentElement, {
									attributes: true,
									subtree: true,
									attributeFilter: ['bis_skin_checked']
								});
							})();
						`,
					}}
				/>
			</head>
			<body
				className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased overflow-x-hidden overflow-y-auto"
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
