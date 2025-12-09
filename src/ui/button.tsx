'use client'
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge'
import { Spinner } from "@/ui/general-component";

export const BUTTON_COLORS = ['positive', 'negative', 'neutral', 'emphasized'];
export const BUTTON_SIZES = ['xs', 'sm', 'md'];
export const BUTTON_TYPES = ['submit', 'reset', 'button'];

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    caption?: string,
    className?: string,
    type?: (typeof BUTTON_TYPES)[number] | undefined;
    color?: (typeof BUTTON_COLORS)[number];
    size?: (typeof BUTTON_SIZES)[number];
    pending?: boolean | undefined
    disabled?: boolean,
    children?: React.ReactNode
};

export function Button(props: ButtonProps) {

    const { caption, className = "", type = 'button', color = 'positive', size = 'md', pending = false, disabled = false, children, ...rest } = props;

    // *** RENDERING *** //

    const is_color_positive = color === 'positive';
    const is_color_negative = color === 'negative';
    const is_color_neutral = color === 'neutral';
    const is_color_emphasized = color === 'emphasized';

    const css = clsx('relative inline-flex justify-center items-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer', {
        // Positive (Primary)
        'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 border border-transparent': is_color_positive && !disabled,

        // Negative (Danger)
        'bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 border border-transparent': is_color_negative && !disabled,

        // Neutral (Outline/Ghost)
        'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--secondary)]': is_color_neutral && !disabled,

        // Emphasized (Secondary)
        'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80 border border-transparent': is_color_emphasized && !disabled,

        // Disabled states
        'opacity-50 cursor-not-allowed': disabled,
        'bg-[var(--primary)] text-[var(--primary-foreground)]': is_color_positive && disabled,
        'bg-[var(--danger)] text-white': is_color_negative && disabled,
        'bg-transparent text-[var(--muted)] border-[var(--border)]': is_color_neutral && disabled,
        'bg-[var(--secondary)] text-[var(--muted)]': is_color_emphasized && disabled,

        // Sizes
        'py-2.5 px-5 text-sm': size === 'md',
        'py-2 px-4 text-xs': size === 'sm',
        'py-1.5 px-3 text-[10px]': size === 'xs',
    });


    return <button
        disabled={pending || disabled}
        className={twMerge(css, className)}
        type={type as 'button' | 'submit' | 'reset' | undefined}
        {...rest}
    >
        {pending ? <Spinner /> : (children ?? caption)}
    </button>
}