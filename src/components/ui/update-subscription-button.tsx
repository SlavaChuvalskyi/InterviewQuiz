'use client'

import { Button } from "@/components/ui/button-custom";
import { createClientStripe, updateSupebaseUserSubscription } from "@lib/client";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";
import { useUserStore } from "@stores/userStore";
import { getUserSubscription } from "@lib/stripe";
import { useRouter } from "next/navigation";

export function UpdateSubscriptionButton({ stripeSubscriptionId, newPriceId }: { stripeSubscriptionId: string, newPriceId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { showToast } = useToast();
    const userState = useUserStore((state) => state);
    const setUserSubscription = userState.setUserSubscription;
    const userSubscriptionId = userState?.userSubscription?.id;
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true);

        try {
            const stripe = createClientStripe();
            let subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);

            const updatedSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
                items: [
                    {
                        id: subscription.items.data[0].id,
                        price: newPriceId,
                    },
                ],
                cancel_at_period_end: false,
                proration_behavior: "always_invoice", // important
                expand: ["items"],
                billing_cycle_anchor: "now",
            });

            if (userSubscriptionId && updatedSubscription) {

                const subscriptionItem = updatedSubscription.items.data[0] ?? null;

                const responseUpdatedSubscription = await updateSupebaseUserSubscription({
                    stripe_subscription_id: updatedSubscription.id,
                    status: updatedSubscription.status,
                    stripe_plan_id: subscriptionItem ? subscriptionItem.price.id : null,
                    started_at: updatedSubscription.start_date ? new Date(updatedSubscription.start_date * 1000) : new Date(),
                    ended_at: updatedSubscription?.cancel_at_period_end && subscriptionItem?.current_period_end ? new Date(subscriptionItem.current_period_end * 1000) : null,
                }, userSubscriptionId);

                if (responseUpdatedSubscription) {

                    const userSubscription = await getUserSubscription(userSubscriptionId, responseUpdatedSubscription.stripe_subscription_id);
                    setUserSubscription(userSubscription);
                    showToast("Subscription updated", "success");
                    router.refresh();
                }
                else {
                    showToast('Error occurred', 'error')
                }

            } else {
                console.log('error occurred on update sub event')
                showToast("Subscription update is failed due to an error.", "warning");
            }

        } catch (error: unknown) {
            console.log('error occurred on update sub event', error)
            showToast(error instanceof Error ? error.message : "An error occurred", "warning");
        } finally {
            setIsLoading(false)

        }
    }

    return (
        <form onSubmit={handleUpdate}>
            <Button disabled={isLoading} type="submit" title={'Checkout'}>{isLoading ? 'Loading...' : 'Checkout'}</Button>
        </form>
    );
}
