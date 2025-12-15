import { createBrowserClient } from '@supabase/ssr'
import Stripe from "stripe";
import { UserProfile } from "@/app/types";

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
    )
}

export function createClientStripe() {
    return new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}

export async function getUserProfile(userID: string): Promise<UserProfile | null> {
    const supabase = createClient();
    const { data: profile, error } = await supabase
        .from("profiles")
        .select(`
                *,
                subscriptions (
                  *
                )
              `)
        .eq("id", userID)
        .single();

    if (error) {
        console.error("Error fetching profile:", error);
        return null;
    }

    return profile
}

export async function updateSupebaseProfile(data: any, userID: string) {
    const supabase = createClient();
    const { data: updatedProfile, error } = await supabase.from("profiles").update(data).eq("id", userID).select();

    if (error) {
        console.error("Error updating profile:", error);
        return null;
    } else {
        console.log("Updated profile:", updatedProfile);
        return updatedProfile[0] ?? [];
    }
}

export async function updateSupebaseUserSubscription(data: any, subscriptionID: string) {
    const supabase = createClient();
    const { data: updatedSubscription, error } = await supabase.from("subscriptions").update(data).eq("id", subscriptionID).select();

    if (error) {
        console.error("Error updating subscription:", error);
        return null;
    } else {
        console.log("Updated subscription:", updatedSubscription);
        return updatedSubscription[0] ?? [];
    }
}
