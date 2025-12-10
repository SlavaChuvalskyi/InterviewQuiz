'use client'
import Link from "next/link";
import {Button} from "@/ui/button";
import UserMenu from "@/components/user-menu";
import { useUserStore } from '@/stores/userStore'
import {UserProfile} from "@/app/types";

export default function Header() {

    const user: UserProfile | null = useUserStore((state) => state.user)

    return (
        <header
            className={'flex justify-between items-center p-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-50'}>
            <div className="flex items-center gap-2">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-[var(--foreground)]">Interview Quiz</h1>
                </Link>
            </div>

            <div className="flex gap-3">
                {!user ? <>
                    <Link href="/auth/login">
                        <Button color="neutral" size="sm">Login</Button>
                    </Link>
                    <Link href="/auth/sign-up">
                        <Button color="primary" size="sm">Sign Up</Button>
                    </Link>
                </> : null}

                {/* User Menu */}
                <UserMenu user={user}/>
            </div>
        </header>
    );
}