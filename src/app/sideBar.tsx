'use client'
import { usePathname } from "next/navigation";
import Image from 'next/image'
import Link from "next/link";
import { AppIcon } from "@/ui/icon";
import clsx from "clsx";

type ListItem = {
    id: string,
    icon: string,
    name: string,
    path: string
}

const list: ListItem[] = [
    { id: 'dashboard', icon: 'grid', name: 'Dashboard', path: "/" },
    { id: 'invoices', icon: 'database', name: 'Invoices', path: "/invoices" },
    { id: 'users', icon: 'user', name: 'Clients', path: "/users" },
    { id: 'payments', icon: 'dollar-sign', name: 'Payments', path: "/payments" },
    { id: 'reports', icon: 'line-chart-2', name: 'Reports', path: "/reports" },
    { id: 'settings', icon: 'settings', name: 'Settings', path: "/settings" },
];

export default function SideBar() {

    const pathname = usePathname();
    return (
        <div className={'h-screen sticky top-0 bg-[var(--surface)] border-r border-[var(--border)] flex flex-col'}>
            <div className={'flex items-center p-6 border-b border-[var(--border)]'}>
                <div className="relative w-8 h-8 mr-3 rounded-lg overflow-hidden shadow-sm">
                    <Image src="/img/invoice_logo_v2.png" alt="Invoice" fill className="object-cover" />
                </div>
                <h2 className={'text-lg font-bold tracking-tight text-[var(--foreground)]'}>
                    Invoice Flow
                </h2>
            </div>
            <ul className={'flex-1 px-4 py-6 space-y-1'}>
                {list.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <li key={item.id}>
                            <Link href={item.path} className={clsx(
                                'flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group',
                                isActive
                                    ? 'bg-[var(--foreground)] text-[var(--background)] shadow-md'
                                    : 'text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]'
                            )}>
                                <AppIcon
                                    name={item.icon}
                                    alt={item.name}
                                    size={18}
                                    className={clsx('mr-3 transition-colors', isActive ? 'text-[var(--background)]' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]')}
                                />
                                <span className={'text-sm font-medium'}>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}