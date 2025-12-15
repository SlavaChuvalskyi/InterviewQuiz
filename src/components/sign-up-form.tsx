'use client'

import { cn } from '@/lib/utils'
import { createClient, createClientStripe, updateSupebaseProfile, updateSupebaseUserSubscription } from '@/lib/client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useToast } from "@/components/ui/toast";
import { useUserStore } from "@stores/userStore";
import { UserProfile } from "@/app/types";

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { showToast } = useToast()

    const userState = useUserStore((state) => state);
    const user: UserProfile | null = userState.user;
    const setUser = userState.setUser;
    const setUserSubscription = userState.setUserSubscription;

    if (user) {
        redirect('/')
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        const supabase = createClient()
        setIsLoading(true)
        setError(null)

        if (password !== repeatPassword) {
            setError('Passwords do not match')
            setIsLoading(false)
            return
        }

        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username },
                    emailRedirectTo: `${window.location.origin}`,
                },
            })

            if (authError) throw authError;

            const userID = authData?.user?.id ?? null;

            if (!userID) {
                setError('Cannot get user data!')
                setIsLoading(false)
                return
            }

            // 1. Create Supabase profile
            const { data: profile, error: profileError } = await supabase.from("profiles").insert({
                id: userID,
                username,
                email
            }).select();

            if (profileError) throw profileError;

            const stripe = createClientStripe();

            // 2. Create Stripe Customer
            const customer = await stripe.customers.create({
                email,
                metadata: {
                    supabase_id: userID,
                },
            });

            // 3. Save stripe_customer_id to user profile
            const responseUpdatedSubscription = await updateSupebaseUserSubscription({
                stripe_customer_id: customer.id,
            }, profile[0].subscription_id);

            if (responseUpdatedSubscription) {
                showToast('You’ve created an account and logged in', 'success')
                setUser(profile[0]);
                setUserSubscription(responseUpdatedSubscription);
            }
            else {
                showToast('Error occurred', 'error')
            }

        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign up</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="repeat-password">Repeat Password</Label>
                                </div>
                                <Input
                                    id="repeat-password"
                                    type="password"
                                    required
                                    value={repeatPassword}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-sm text-red-500">{error}</p>}
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Creating an account...' : 'Sign up'}
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
