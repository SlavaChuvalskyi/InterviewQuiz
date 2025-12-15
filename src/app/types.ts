
export interface BillingData {
    plans: StripePlan[];
    products: StripeProduct[]
}

export type PriceData = {
    price: string,
    quantity: number,
}

export interface StripeProduct {
    id: string;
    object: "product";
    active: boolean;
    created: number;
    default_price: string | null;
    description: string | null;
    images: string[];
    marketing_features: any[];
    livemode: boolean;
    metadata: Record<string, string>;
    name: string;
    package_dimensions: unknown | null;
    shippable: boolean | null;
    statement_descriptor: string | null;
    tax_code: string | null;
    unit_label: string | null;
    updated: number;
    url: string | null;
}

export interface StripePlan {
    id: string;
    object: "plan";
    active: boolean;
    amount: number;
    amount_decimal: string;
    billing_scheme: "per_unit" | "tiered";
    created: number;
    currency: string;
    interval: "day" | "week" | "month" | "year";
    interval_count: number;
    livemode: boolean;
    metadata: Record<string, string>;
    nickname: string | null;
    product: string; // product ID
    tiers_mode: string | null;
    transform_usage: any | null;
    trial_period_days: number | null;
    usage_type: "metered" | "licensed";
}

export interface UserProfile {
    id: string
    username: string
    created_at: string // ISO date string
    updated_at: string // ISO date string
    email?: string
    subscriptions: UserSubscription
    [key: string]: any // for any additional fields that might be present
}

export interface UserSubscription {
    id: string;
    status?: 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'pause';
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    stripe_plan_id?: string;
    planID?: string;
    planInterval?: "day" | "week" | "month" | "year";
    planAmount?: number;
    productID?: string;
    productName?: string;
    start_date?: number | undefined,
    ended_at?: number | undefined,
    cancel_at?: number | undefined,
    cancel_at_period_end?: boolean,
    canceled_at?: number | undefined,
    current_period_end?: number | undefined,
    currency?: string,
}