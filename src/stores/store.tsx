'use client'
import { useAppStore } from './app';
import { useEffect } from 'react';
import {createClient} from "@lib/client";
import {useUserStore} from "@stores/userStore";

export function StoreProvider({ children }) {
    const appLoading = useAppStore((state) => state.appLoading);
    const setAppLoading = useAppStore((state) => state.setAppLoading);
    const setUser = useUserStore((state) => state.setUser)
    const supabase = createClient()

    useEffect(() => {
        let profileSubscription: any = null;

        async function init() {
            const { data: sessionData } = await supabase.auth.getSession();
            const userId = sessionData?.session?.user?.id;
            if (!userId) return;

            // Subscribe to changes on this user's profile
            profileSubscription = supabase
                .from(`profiles:id=eq.${userId}`)
                .on("UPDATE", (payload) => {
                    console.log("Profile updated:", payload.new);
                    setUser(payload.new); // update your store
                })
                .subscribe();
        }

        init();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                console.log("[Auth] event:", _event, session);
                if (!session?.user) {
                    setUser(null);
                    // Remove profile subscription
                    if (profileSubscription) {
                        supabase.removeSubscription(profileSubscription);
                        profileSubscription = null;
                    }
                }
            }
        );

        return () => {
            // Cleanup
            authListener.subscription.unsubscribe();
            if (profileSubscription) supabase.removeSubscription(profileSubscription);
        }
    }, [setUser, setAppLoading])

    // Don't render children until ready
    if (appLoading) return null;

    return <>{children}</>;
}