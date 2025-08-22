import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Coming Soon - Join the Waitlist",
	description:
		"Be the first to experience something extraordinary. Join our exclusive waitlist for early access.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
			>
				{children}
				<Toaster
					theme="dark"
					position="top-center"
					richColors
					toastOptions={{
						style: {
							background: "rgba(39, 39, 42, 0.9)",
							border: "1px solid rgba(255, 255, 255, 0.1)",
							backdropFilter: "blur(16px)",
							color: "#fafafa",
						},
					}}
				/>
			</body>
		</html>
	);
}
