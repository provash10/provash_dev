import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/HeaderFooter/Navbar/Navbar";
import HeaderIcon from "@/components/HeaderFooter/HeaderIcon/HeaderIcon";
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
			<body
				className="min-h-full flex flex-col bg-slate-950 text-slate-100"
				suppressHydrationWarning
			>
				<QueryProvider>
					<Navbar />
					<HeaderIcon />
					<main className="px-3 md:px-6 py-4 flex-1">{children}</main>
				</QueryProvider>
			</body>
		</html>
	);
}
