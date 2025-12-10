'use client'

import {Button} from "@/ui/button";
import {createClientStripe} from "@lib/client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useToast} from "@/app/components/toast";

export function CheckoutButton({priceId, customerId}: { priceId: string; customerId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const {showToast} = useToast();
    const router = useRouter();

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const stripe = createClientStripe();

            const session = await stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                line_items: [{price: priceId, quantity: 1}],
                customer: customerId,
                mode: "subscription",
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`
            });

            router.push(session.url ?? `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`)

        } catch (error: unknown) {
            showToast("Custom period cannot exceed 1 year for Cash Flow chart", "warning");
            // 'An error occurred'
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleCheckout}>
            <Button type="submit">{isLoading ? 'Loading...' : 'Checkout'}</Button>
        </form>
    );
}
