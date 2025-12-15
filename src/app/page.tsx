'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button-custom";

export default function LandingPage() {
    return (
        <div className="flex flex-col flex-1 bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]">
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
        </div>
    );
}