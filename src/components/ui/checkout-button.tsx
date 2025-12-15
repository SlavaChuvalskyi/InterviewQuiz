'use client'

import { Button } from "@/components/ui/button-custom";
import { createClientStripe } from "@lib/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";
import { PriceData } from "@/app/types";

export function CheckoutButton({ priceData, customerId }: { priceData: PriceData; customerId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useToast();
    const router = useRouter();

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const stripe = createClientStripe();

            const session = await stripe.checkout.sessions.create({
                billing_address_collection: "auto",
                line_items: [priceData],
                customer: customerId,
                mode: "subscription",
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/billing/cancel`
            });

            router.push(session.url ?? `${process.env.NEXT_PUBLIC_BASE_URL}/billing/error`)

        } catch (error: unknown) {
            console.log('error occurred on checkout event', error)
            showToast(error?.toString() ?? "An error occurred", "warning");
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleCheckout}>
            <Button disabled={isLoading} type="submit" title={'Checkout'}>{isLoading ? 'Loading...' : 'Checkout'}</Button>
        </form>
    );
}
