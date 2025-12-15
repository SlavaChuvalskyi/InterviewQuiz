"use server";
import Stripe from 'stripe'
import { BillingData, StripePlan, StripeProduct, UserSubscription } from "@/app/types";

export async function createStripe() {
    return new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}

export async function getUserSubscription(subscriptionId: string, stripeSubscriptionId: string) {

    const stripe = await createStripe();

    // 1. Retrieve subscription from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

    // 2. Extract the first subscription item (plan)
    const planItem = stripeSubscription.items.data[0];
    const plan_id = planItem?.price.id ?? '';
    const plan_amount = planItem?.price.unit_amount ?? 0;
    const current_period_end = planItem?.current_period_end ?? null;

    const plan_interval = planItem.price.recurring?.interval as "day" | "week" | "month" | "year";

    let productName, productID = null;
    if (planItem?.price.product) {
        const product = await stripe.products.retrieve(planItem.price.product as string);
        productID = product.id;
        productName = product.name;
    }

    // 4. Map Stripe subscription to your UserSubscription type
    const userSubscription: UserSubscription = {
        id: subscriptionId,
        stripe_subscription_id: stripeSubscriptionId,
        status: stripeSubscription.status as 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'pause',
        planID: plan_id,
        planInterval: plan_interval,
        planAmount: plan_amount,
        productID: productID ?? '',
        productName: productName ?? '',
        cancel_at: stripeSubscription.cancel_at ?? undefined,
        cancel_at_period_end: stripeSubscription.cancel_at_period_end,
        canceled_at: stripeSubscription.canceled_at ?? undefined,
        currency: stripeSubscription.currency,
        ended_at: stripeSubscription.ended_at ?? undefined,
        current_period_end: current_period_end ?? undefined,
        start_date: stripeSubscription.start_date,
        stripe_customer_id: stripeSubscription.customer as string
    };

    // stripePlan: planItem ? {
    //     id: planItem.price.id,
    //     object: planItem.price.object as "plan",
    //     active: planItem.price.active,
    //     amount: planItem.price.unit_amount ?? 0,
    //     amount_decimal: planItem.price.unit_amount_decimal ?? '0',
    //     billing_scheme: planItem.price.billing_scheme,
    //     created: planItem.price.created,
    //     currency: planItem.price.currency,
    //     interval: plan_interval,
    //     interval_count: planItem.price.recurring?.interval_count ?? 1,
    //     livemode: planItem.price.livemode,
    //     metadata: planItem.price.metadata,
    //     nickname: planItem.price.nickname,
    //     product: planItem.price.product as string,
    //     tiers_mode: null,
    //     transform_usage: null,
    //     trial_period_days: planItem.price.trial_period_days ?? 0,
    //     usage_type: planItem.price.usage_type as "metered" | "licensed",
    // } : null,

    return userSubscription;
}

export async function getListPlans() {

    const stripe = await createStripe();

    const products = await stripe.products.list({ limit: 50, active: true });

    const plans = await stripe.plans.list({ limit: 9, active: true });

    // Sort plans by amount (ascending)
    const sortedPlans = plans.data.sort((a, b) => (a.amount ?? 0) - (b.amount ?? 0));

    const data: BillingData = {
        plans: sortedPlans as StripePlan[],
        products: products.data as StripeProduct[],
    }

    return data;
}