"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Dynamic import for 3D scene to prevent SSR issues
const Scene3D = dynamic(() => import("@/components/canvas/scene"), {
	ssr: false,
	loading: () => <div className="fixed inset-0 bg-background -z-10" />,
});

const emailSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function WaitlistPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EmailForm>({
		resolver: zodResolver(emailSchema),
	});

	const onSubmit = async (data: EmailForm) => {
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toast.success("Welcome to the waitlist!", {
					description: "We'll notify you when we launch.",
				});
				reset();
			} else {
				const errorData = await response.json();
				throw new Error(errorData.message || "Something went wrong");
			}
		} catch (error) {
			toast.error("Failed to join waitlist", {
				description:
					error instanceof Error ? error.message : "Please try again later.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden dark">
			{/* 3D Background Scene */}
			<Suspense
				fallback={<div className="fixed inset-0 bg-background -z-10" />}
			>
				<Scene3D />
			</Suspense>

			{/* Main Content */}
			<motion.div
				className="relative z-10 w-full max-w-md"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
			>
				{/* Hero Section */}
				<motion.div
					className="text-center mb-12 space-y-6"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: [0.25, 0.46, 0.45, 0.94],
					}}
				>
					<div className="space-y-3">
						<h1 className="text-5xl font-light text-gradient tracking-tight">
							Coming Soon
						</h1>
						<div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-zinc-400 to-transparent mx-auto" />
					</div>

					<motion.p
						className="text-lg text-zinc-400 font-light leading-relaxed max-w-sm mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						Be the first to experience something extraordinary. Join our
						exclusive waitlist.
					</motion.p>
				</motion.div>

				{/* Waitlist Form */}
				<motion.div
					className="glass-card rounded-2xl p-8 space-y-6 depth-shadow-lg animate-glow"
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.8,
						delay: 0.6,
						ease: [0.25, 0.46, 0.45, 0.94],
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="space-y-3">
							<Label
								htmlFor="email"
								className="text-sm font-medium text-zinc-300"
							>
								Email Address
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								className="glass-input h-12 text-base placeholder:text-zinc-500 border-0 focus:ring-2 focus:ring-white/20 transition-all duration-200"
								{...register("email")}
								disabled={isSubmitting}
							/>
							{errors.email && (
								<motion.p
									className="text-sm text-red-400 font-medium"
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
								>
									{errors.email.message}
								</motion.p>
							)}
						</div>

						<Button
							type="submit"
							disabled={isSubmitting}
							className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-medium transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? (
								<motion.div
									className="flex items-center gap-2"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<div className="w-4 h-4 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin" />
									Joining...
								</motion.div>
							) : (
								"Join Waitlist"
							)}
						</Button>
					</form>

					<motion.div
						className="pt-4 border-t border-white/10"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1 }}
					>
						<p className="text-xs text-zinc-500 text-center leading-relaxed">
							We respect your privacy. No spam, ever.
							<br />
							Unsubscribe at any time.
						</p>
					</motion.div>
				</motion.div>

				{/* Feature Highlights */}
				<motion.div
					className="mt-12 grid grid-cols-3 gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					{[
						{ icon: "⚡", label: "Fast" },
						{ icon: "🔒", label: "Secure" },
						{ icon: "✨", label: "Beautiful" },
					].map((feature, index) => (
						<motion.div
							key={feature.label}
							className="glass rounded-xl p-4 text-center space-y-2 hover:glass-card transition-all duration-300"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
							whileHover={{ scale: 1.05 }}
						>
							<div className="text-2xl opacity-60">{feature.icon}</div>
							<div className="text-xs text-zinc-400 font-medium">
								{feature.label}
							</div>
						</motion.div>
					))}
				</motion.div>
			</motion.div>
		</main>
	);
}
