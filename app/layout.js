import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
    title: "EKRAM ORIGINAL",
    description: "Heritage meets modern fashion.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F8F6F1] text-[#333333]`}>
                <Navbar />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <ChatWidget />
            </body>
        </html>
    );
}
