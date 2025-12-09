'use client'

import React from 'react';
import clsx from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export function Input({ className, label, error, id, type, ...props }: InputProps) {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label htmlFor={id} className="mb-1 text-sm font-medium text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={clsx(
                    "py-2 rounded-lg border bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all",
                    type !== "date" && "px-3",
                    error ? "border-[var(--danger)] focus:ring-[var(--danger)]" : "border-[var(--border)]",
                    className
                )}
                {...props}
            />
            {error && <span className="mt-1 text-xs text-[var(--danger)]">{error}</span>}
        </div>
    );
}
