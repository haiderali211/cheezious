import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Cheezious — Pakistan's Legendary Pizza",
  description:
    "Since 1999, Cheezious has been serving Pakistan's most legendary pizza. Hand-stretched, stone-baked, and loaded with love across 80+ locations.",
  keywords: ["cheezious", "pizza", "pakistan", "lahore", "karachi", "islamabad", "fast food"],
  openGraph: {
    title: "Cheezious — Pakistan's Legendary Pizza",
    description: "Hand-stretched, stone-baked, loaded with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-brand-black text-brand-white font-chillax antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
