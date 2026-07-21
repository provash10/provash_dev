import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/HeaderFooter/Navbar/Navbar";
import Footer from "@/components/HeaderFooter/Footer/Footer";
import HeaderIcon from "@/components/HeaderFooter/HeaderIcon/HeaderIcon";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // title: "Devaioz",
  title: "Provash-Portfolio",
  description: "The Ultimate Developer Ecosystem.",
  icons: {
    icon: "/img/devaiozfavicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950" suppressHydrationWarning>
        {/* <Navbar></Navbar> */}
        <HeaderIcon></HeaderIcon>
        <main className="px-2 md:px-3 py-3 pt-20 md:pt-3 flex-1">
          {children}
        </main>
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
