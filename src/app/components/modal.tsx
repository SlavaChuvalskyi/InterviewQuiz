'use client'

import { ReactNode, useEffect } from 'react';
import { AppIcon } from "@/ui/icon";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: Props) {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--surface)] w-full h-full md:w-[90%] md:h-[90%] md:rounded-xl shadow-2xl flex flex-col relative overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-[var(--secondary)] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--ring)] flex items-center justify-center"
                    >
                        <AppIcon name="x" size={20} />
                    </button>
                </div>
                <div className="flex-1 overflow-auto p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
