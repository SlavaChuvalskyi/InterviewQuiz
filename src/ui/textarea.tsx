'use client'

import React from 'react';
import clsx from 'clsx';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, id, ...props }, ref) => {
    return (
        <div className="flex flex-col w-full">
            {label && (
                <label htmlFor={id} className="mb-1 text-sm font-medium text-[var(--foreground)]">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                ref={ref}
                className={clsx(
                    "px-3 py-2 rounded-lg border bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all min-h-[100px] resize-y",
                    error ? "border-[var(--danger)] focus:ring-[var(--danger)]" : "border-[var(--border)]",
                    className
                )}
                {...props}
            />
            {error && <span className="mt-1 text-xs text-[var(--danger)]">{error}</span>}
        </div>
    );
});

Textarea.displayName = "Textarea";
