import type {Metadata} from "next";
import {Inter, Playfair_Display} from "next/font/google";
import "./globals.css";
import {ReactNode} from "react";
import {ToastProvider} from "@/app/components/toast";
import Header from "@/app/header";
import {UserProvider} from "@/providers/UserProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Interview Quiz",
    description: "Interview Quiz",
    icons: {
        icon: "./favicon.png", // PNG favicon in public folder
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${playfairDisplay.variable} flex flex-col h-svh`}>
        <UserProvider>
            <ToastProvider>
                {/* Header */}
                <Header/>

                {children}

                {/* Footer */}
                <footer className="border-t border-[var(--border)] bg-[var(--surface)] py-8">
                    <div className="container mx-auto px-6 text-center text-[var(--muted)] text-sm">
                        <p>© 2025 InterviewQuiz. All rights reserved.</p>
                    </div>
                </footer>
            </ToastProvider>
        </UserProvider>
        </body>
        </html>
    );
}
