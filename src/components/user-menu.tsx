'use client'

import {useEffect, useState, useRef, useEffectEvent, ReactEventHandler} from "react";
import Link from "next/link";
import {AppIcon} from "@/ui/icon";
import {LogoutButton} from "@/components/logout-button";
import {UserProfile} from "@/app/types";

type MenuProps = {
    user: UserProfile | null
}

export default function UserMenu({user}: MenuProps) {

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const onClickWindowHandler = useEffectEvent((e: MouseEvent) => {
        const popover_node = ref.current;
        // Make sure target is an HTMLElement
        const target = e.target as HTMLElement | null;

        if (popover_node && (!popover_node.contains((target as Node)) || target?.id === 'logout')) {
            e.preventDefault();
            e.stopPropagation();
            setIsUserMenuOpen(false);
        }
    });

    useEffect(() => {
        if (user && isUserMenuOpen) {
            window.addEventListener("click", onClickWindowHandler);
        }

        return () => {
            window.removeEventListener("click", onClickWindowHandler);
        }
    }, [user, isUserMenuOpen, onClickWindowHandler]);

    return (
        <div className="relative">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsUserMenuOpen(!isUserMenuOpen)
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)] text-white font-semibold hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            >
                {user && user.username ? user.username.slice(0, 4) : <span><AppIcon name="user" size={20}/></span>}
            </button>

            {/* Dropdown Menu */}
            {user && isUserMenuOpen && (
                <div
                    ref={ref}
                    className="absolute right-0 mt-2 w-56 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-[var(--border)]">
                        <p className="font-semibold text-[var(--foreground)]">{user?.username ?? "Anonymous"}</p>
                        <p className="text-xs">{user?.email ?? ""}</p>
                    </div>

                    <div className="py-2">
                        <Link href="/profile"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                            <AppIcon name="user" size={16}/>
                            <span>Profile</span>
                        </Link>
                        <Link href="/billing"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors">
                            <AppIcon name="credit-card" size={16}/>
                            <span>Billing</span>
                        </Link>
                    </div>

                    <div className="border-t border-[var(--border)] py-3 text-center cursor-pointer">
                        <LogoutButton/>
                    </div>
                </div>
            )}
        </div>
    )
}