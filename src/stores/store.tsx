'use client'
import { useAppStore } from './appStore';
import { ReactNode, useEffect, useRef } from 'react';
import { createClient, getUserProfile, updateSupebaseProfile, updateSupebaseUserSubscription } from "@lib/client";
import { useUserStore } from "@stores/userStore";
import { getUserSubscription } from "@lib/stripe";
import { UserSubscription } from '@/app/types';

export function StoreProvider({ children }: { children: ReactNode }) {
    const appLoading = useAppStore((state) => state.appLoading);
    const setAppLoading = useAppStore((state) => state.setAppLoading);
    const userState = useUserStore((state) => state);
    const setUser = userState.setUser;
    const setUserSubscription = userState.setUserSubscription;
    const supabase = createClient()

    const ran = useRef(false);

    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        async function init() {
            const { data: sessionData } = await supabase.auth.getSession();
            const userId = sessionData?.session?.user?.id;

            if (!userId) {
                setAppLoading(false);
                return
            }

            const profile = await getUserProfile(userId);

            let subscription: UserSubscription | null = profile?.subscriptions ?? null;
            const subscriptionId = subscription && subscription?.id ? subscription?.id : null;
            const stripe_subscription_id = subscription && subscription?.stripe_subscription_id ? subscription?.stripe_subscription_id : null;

            if (subscriptionId && stripe_subscription_id) {

                subscription = await getUserSubscription(subscriptionId, stripe_subscription_id);
                if (subscription) {

                    if (subscription.ended_at) {
                        const responseUpdatedSubscription = await updateSupebaseUserSubscription({
                            stripe_subscription_id: null,
                            stripe_plan_id: null,
                            status: null,
                            started_at: null,
                            ended_at: null,
                        }, subscriptionId);

                        if (!responseUpdatedSubscription) {
                            console.error('Error occurred while update user subscription');
                        }
                    }
                }
            }

            setUser(profile ?? null);
            setUserSubscription(subscription ?? null);
            setAppLoading(false)
        }

        init();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (!session?.user) {
                    setUser(null);
                    setUserSubscription(null);
                    setAppLoading(false);
                }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, [setUser, setAppLoading])

    // Don't render children until ready
    if (appLoading) return null;

    return <>{children}</>;
}