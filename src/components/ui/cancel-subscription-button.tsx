'use client'

import { Button } from "@/components/ui/button-custom";
import { createClientStripe, updateSupebaseUserSubscription } from "@lib/client";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { useUserStore } from "@stores/userStore";
import { getUserSubscription } from "@lib/stripe";

export function CancelSubscriptionButton({ stripeSubscriptionId }: { stripeSubscriptionId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useToast();
    const userState = useUserStore((state) => state);
    const setUserSubscription = userState.setUserSubscription;
    const userSubscriptionId = userState?.userSubscription?.id;

    const handleCancellation = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const stripe = createClientStripe();

            const subscription = await stripe.subscriptions.update(
                stripeSubscriptionId,
                {
                    cancel_at_period_end: true,
                }
            );

            console.log('heer = ', subscription)

            if (userSubscriptionId && subscription.cancel_at_period_end && subscription.cancel_at) {
                const responseUpdatedSubscription = await updateSupebaseUserSubscription({
                    status: subscription.status,
                    ended_at: new Date(subscription.cancel_at * 1000),
                }, userSubscriptionId);

                if (responseUpdatedSubscription) {
                    const userSubscription = await getUserSubscription(userSubscriptionId, stripeSubscriptionId);
                    setUserSubscription(userSubscription);
                    showToast("Subscription canceled. No charges will occur on your next payment date.", "success");
                }
                else {
                    showToast('Error occurred', 'error')
                }

            } else {
                console.log('error occurred on cancellation sub event')
                showToast("Subscription cancellation failed due to an error.", "warning");
            }

        } catch (error: unknown) {
            console.log('error occurred on cancellation sub event', error)
            showToast(error?.toString() ?? "An error occurred", "warning");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleCancellation}>
            <Button disabled={isLoading} type="submit" title={'Cancel subscription'} color={'negative'}>{isLoading ? 'Loading...' : 'Cancel subscription'}</Button>
        </form>
    );
}
