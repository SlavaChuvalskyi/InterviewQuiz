'use client'
import { AppIcon } from "@/ui/icon";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

type HeaderProps = {
    title?: string;
    subtitle?: string;
}

// Route configuration for dynamic titles
const routeConfig: Record<string, { title: string; subtitle: string }> = {
    '/dashboard': {
        title: 'Financial Dashboard',
        subtitle: 'Welcome back, John'
    },
    '/users': {
        title: 'User Management',
        subtitle: 'Manage your team members'
    },
    '/invoices': {
        title: 'Invoices',
        subtitle: 'Track and manage all invoices'
    },
    '/settings': {
        title: 'Settings',
        subtitle: 'Configure your preferences'
    }
};

export default function Header({ title, subtitle }: HeaderProps) {
    const pathname = usePathname();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Get route config based on current path
    const getRouteConfig = () => {
        // Check for exact match first
        if (routeConfig[pathname]) {
            return routeConfig[pathname];
        }

        // Check for partial match (e.g., /users/123 matches /users)
        const matchingRoute = Object.keys(routeConfig).find(route =>
            pathname.startsWith(route)
        );

        if (matchingRoute) {
            return routeConfig[matchingRoute];
        }

        // Default fallback
        return {
            title: 'Dashboard',
            subtitle: 'Welcome back'
        };
    };

    const config = getRouteConfig();
    const displayTitle = title || config.title;
    const displaySubtitle = subtitle || config.subtitle;

    return (
        <div className={'flex justify-between items-center h-min mb-8 mt-6'}>
            <div>
                <h4 className={'text-2xl font-bold tracking-tight text-[var(--foreground)]'}>
                    {displayTitle}
                </h4>
                <p className="text-sm text-[var(--muted)] mt-1">{displaySubtitle}</p>
            </div>
            <div className={'flex items-center gap-x-3'}>
                {/* Notification Button */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] hover:scale-110 active:scale-95 transition-all duration-200 relative cursor-pointer"
                    >
                        <AppIcon
                            name={'bell'}
                            alt={'Notifications'}
                            size={20}
                        />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--danger)] rounded-full border-2 border-[var(--background)]"></span>
                    </button>

                    {/* Notification Dropdown */}
                    {isNotificationOpen && (
                        <>
                            {/* Backdrop to close menu */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsNotificationOpen(false)}
                            />

                            {/* Menu */}
                            <div className="absolute right-0 mt-2 w-80 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-3 border-b border-[var(--border)]">
                                    <p className="font-semibold text-[var(--foreground)]">Notifications</p>
                                </div>

                                <div className="p-8 text-center">
                                    <AppIcon name="bell" size={48} className="mx-auto mb-3 text-[var(--muted)]" />
                                    <p className="text-sm text-[var(--muted)]">Nothing here</p>
                                    <p className="text-xs text-[var(--muted)] mt-1">You're all caught up!</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] text-white font-semibold hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                        JD
                    </button>

                    {/* Dropdown Menu */}
                    {isUserMenuOpen && (
                        <>
                            {/* Backdrop to close menu */}
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsUserMenuOpen(false)}
                            />

                            {/* Menu */}
                            <div className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-3 border-b border-[var(--border)]">
                                    <p className="font-semibold text-[var(--foreground)]">John Doe</p>
                                    <p className="text-xs text-[var(--muted)]">john.doe@example.com</p>
                                </div>

                                <div className="py-2">
                                    <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                                        <AppIcon name="user" size={16} />
                                        <span>Profile</span>
                                    </Link>
                                    <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                                        <AppIcon name="settings" size={16} />
                                        <span>Settings</span>
                                    </Link>
                                    <Link href="/billing" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                                        <AppIcon name="credit-card" size={16} />
                                        <span>Billing</span>
                                    </Link>
                                </div>

                                <div className="border-t border-[var(--border)] py-2">
                                    <button
                                        onClick={() => {
                                            // Add logout logic here
                                            console.log('Logout clicked');
                                        }}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors w-full"
                                    >
                                        <AppIcon name="log-out" size={16} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}