'use client'
import { useUserStore } from "@stores/userStore";
import { createClientStripe, updateSupebaseUserSubscription } from "@lib/client";
import { getUserSubscription } from "@lib/stripe";
import { redirect } from "next/navigation";
import { UserSubscription } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/general-component";
import { useToast } from "@/components/ui/toast";
import { currencyString } from "@/utils/string";

export default function SuccessPage() {
    const { showToast } = useToast();
    const [subscription, setSubscription] = useState<UserSubscription | null>(null);

    const userState = useUserStore((state) => state);
    const user = userState.user;
    // Safe access
    if (!user) {
        redirect('/auth/login')
    }

    // Safe access after redirect
    // Use non-null assertion or optional chaining with default if unsure, but user is checked.
    // However, user.subscription_id comes from UserProfile which has [key:string]:any. 
    // We assume it returns string.
    const userSubscriptionID = user.subscription_id;
    const setUserSubscription = userState.setUserSubscription;

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const query_session_id = query.get('session_id');

    if (!query_session_id) {
        redirect('/')
    }

    const ran = useRef(false);

    useEffect(() => {

        if (ran.current) return;
        ran.current = true;

        const saveUserSubscription = async () => {
            const stripe = createClientStripe();

            const session = await stripe.checkout.sessions.retrieve(query_session_id);
            const stripe_subscription_id = session?.subscription;

            if (!stripe_subscription_id) {
                redirect('/')
            }

            const userSubscription = await getUserSubscription(userSubscriptionID, "" + stripe_subscription_id);

            if (!userSubscription) {
                redirect('/')
            }

            if (session?.payment_status === 'paid') {

                const responseUpdatedSubscription = await updateSupebaseUserSubscription({
                    stripe_subscription_id: stripe_subscription_id,
                    stripe_plan_id: userSubscription.planID,
                    status: userSubscription.status,
                    started_at: userSubscription.start_date ? new Date(userSubscription.start_date * 1000) : new Date(),
                    ended_at: userSubscription?.ended_at ? new Date(userSubscription.ended_at * 1000) : null,
                }, userSubscriptionID);

                if (responseUpdatedSubscription) {
                    const updatedUserSubscription = await getUserSubscription(userSubscriptionID, responseUpdatedSubscription.stripe_subscription_id);
                    setUserSubscription(updatedUserSubscription);
                }
                else {
                    showToast('Error occurred', 'error')
                }
            }

            setSubscription(userSubscription);
        };

        // Only run if user is present (though we redirect above, effects might run)
        if (user && userSubscriptionID) {
            saveUserSubscription();
        }

    }, [query_session_id, user, userSubscriptionID, setUserSubscription, showToast]);

    if (!user) return null; // Should have redirected

    return (
        <div className="flex flex-col flex-1 items-center justify-center min-h-[60vh] text-center p-6">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Thank you, <span className="font-semibold">{user.username}</span>! Your subscription is now active.
            </p>
            {subscription ? (
                <>
                    <div className="text-xl font-medium text-gray-800 mb-2">
                        <h3>Subscription to {subscription.productName} successful!</h3>
                    </div>
                    <div className="text-md text-gray-600">
                        <p>Plan: {currencyString(subscription.planAmount)} / {subscription.planInterval}</p>
                    </div>
                </>
            ) : <Spinner />}
        </div>
    )
}
