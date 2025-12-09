'use client'

import Link from "next/link";
import { AppIcon } from "@/ui/icon";
import { Button } from "@/ui/button";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]">
            {/* Header */}
            <header className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <AppIcon name="dollar-sign" size={28} className="text-[var(--primary)]" />
                        <h1 className="text-2xl font-bold text-[var(--foreground)]">Interview Quiz</h1>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/dashboard">
                            <Button color="neutral" size="sm">Login</Button>
                        </Link>
                        <Link href="http://localhost:3000/auth/sign-up">
                            <Button color="primary" size="sm">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container flex-1 mx-auto px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                        Manage Your Finances
                        <span className="block text-[var(--primary)] mt-2">With Confidence</span>
                    </h2>
                    <p className="text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto">
                        Track invoices, monitor cash flow, and gain insights into your financial health with our powerful dashboard.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/dashboard">
                            <Button color="primary" size="lg" className="px-8">
                                Get Started Free
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button color="neutral" size="lg" className="px-8">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8">
                <div className="container mx-auto px-6 text-center text-[var(--muted)] text-sm">
                    <p>© 2025 InterviewQuiz. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}