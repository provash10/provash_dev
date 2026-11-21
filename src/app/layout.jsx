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
			className={`${geistSans.variable} ${geistMono.variable}`}
			suppressHydrationWarning
		>
			<head>
				{/* sanitize browser extension attributes before hydration */}
				<script
					dangerouslySetInnerHTML={{
						__html: `
(function(){
  try {
    function clean() {
      var els = document.querySelectorAll('[bis_skin_checked]');
      for (var i = 0; i < els.length; i++) {
        els[i].removeAttribute('bis_skin_checked');
      }
    }
    clean();
    if (typeof MutationObserver !== 'undefined') {
      new MutationObserver(function() { clean(); }).observe(document.documentElement, {
        attributes: true,
        subtree: true,
        attributeFilter: ['bis_skin_checked']
      });
    }
  } catch(e) {}
})();
`,
					}}
				/>
			</head>
			<body
				className="min-h-screen bg-slate-950 text-slate-100 antialiased"
				suppressHydrationWarning
			>
				<QueryProvider>
					<NavigationManager />
					<main className="w-full">{children}</main>
				</QueryProvider>
			</body>
		</html>
	);
}
