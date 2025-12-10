import { createBrowserClient } from '@supabase/ssr'
import Stripe from "stripe";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  )
}

export function createClientStripe() {
    return new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}
