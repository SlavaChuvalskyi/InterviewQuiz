
export interface BillingData {
    plans: StripePlan[];
    products: StripeProduct[]
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
    stripe_customer_id: string
    stripe_subscription_id: string
    email?: string
    full_name?: string
    phone?: string
    [key: string]: any // for any additional fields that might be present
}