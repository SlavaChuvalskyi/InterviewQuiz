"use server";
import Stripe from 'stripe'
import { redirect } from "next/navigation";
import {BillingData, StripePlan, StripeProduct} from "@/app/types";

export async function createStripe() {
    return new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}

export async function checkoutPayment(priceID: string, customerID: string) {
    const stripe = await createStripe();

    const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        line_items: [
            { price: priceID, quantity: 1 }
        ],
        customer: customerID,
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`
    });

    console.log('session = ', session)

    redirect(session.url!); // server-side redirect to Stripe
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

export async function createStripeCustomer(email: string, userID: string) {

    const stripe = await createStripe();

    return await stripe.customers.create({
        email,
        metadata: {
            supabase_id: userID,
        },
    });
}