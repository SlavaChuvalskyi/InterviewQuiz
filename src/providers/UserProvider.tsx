'use client'
import { useEffect, ReactNode } from 'react'
import { useUserStore } from '@stores/userStore'
import {createClient} from "@lib/client";

export function UserProvider({ children }: { children: ReactNode }) {
    const supabase = createClient()
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        // Listen for auth changes and set user profile if there is an active session
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {

            if (session && session.user) {
                supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single().then(({data}) => {
                        setUser(data ?? null);
                    })
            }
            else {
                setUser( null)
            }
        })

        return () => listener.subscription.unsubscribe()
    }, [setUser])

    return <>{children}</>
}
