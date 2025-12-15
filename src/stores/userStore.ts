import { create } from 'zustand'
import {UserProfile, UserSubscription} from "@/app/types";

interface UserState {
    user: UserProfile | null
    userSubscription: UserSubscription | null
    setUser: (user: UserProfile | null) => void
    setUserSubscription: (userSubscription: UserSubscription | null) => void
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    userSubscription: null,
    setUser: (user:UserProfile | null) => set({ user }),
    setUserSubscription: (userSubscription: UserSubscription | null ) => set({ userSubscription }),
}))
