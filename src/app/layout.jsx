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
	title: "Provash Agency | Scalable Web Apps, YouTube Automation & Marketing",
	description:
		"Premier Digital Agency providing Web Development, YouTube Automation, and Social Media Marketing solutions.",
	icons: {
		icon: "/img/devaiozfavicon.png",
	},
};

// root layout component
export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
				className="min-h-full flex flex-col bg-slate-950 text-slate-100"
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
