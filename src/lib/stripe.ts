"use server";
import Stripe from 'stripe'
import {BillingData, StripePlan, StripeProduct} from "@/app/types";

export async function createStripe() {
    return new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}

export async function getListPlans() {

    const stripe = await createStripe();

    const products = await stripe.products.list({ limit: 50, active: true });

    const plans = await stripe.plans.list({ limit: 6, active: true });

    const data:BillingData = {
        plans: plans.data as StripePlan[],
        products: products.data as StripeProduct[],
    }

    return data;
}