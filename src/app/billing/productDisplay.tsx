import PlanDisplay from "@/app/billing/plan";
import { StripePlan, StripeProduct, UserProfile, UserSubscription, PriceData } from "@/app/types";
import { CheckoutButton } from "@/components/ui/checkout-button";
import { CancelSubscriptionButton } from "@/components/ui/cancel-subscription-button";
import { formattedDate, addInterval } from "@/utils/string";
import { UpdateSubscriptionButton } from "@/components/ui/update-subscription-button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import {ResumeSubscriptionButton} from "@/components/ui/resume-subscription-button";

type ProductProps = {
    plan: StripePlan,
    product: StripeProduct,
    user: UserProfile,
    userSubscription: UserSubscription | null | undefined
}

export function ProductDisplay({ product, plan, user, userSubscription }: ProductProps) {

    if (!userSubscription || !userSubscription.stripe_customer_id) {
        return null;
    }
    const stripe_plan_id = userSubscription.planID;
    const stripe_subscription_id = userSubscription.stripe_subscription_id;
    const stripe_subscription_status = ("" + (userSubscription?.status || "")).toLowerCase();

    const isUserPlan = stripe_plan_id === plan.id;

    let canCustomerSubscribe = !stripe_plan_id;
    const isActivePlan = isUserPlan && !userSubscription.cancel_at_period_end && stripe_subscription_status === 'active';
    const isCanceledPlan = isUserPlan && !isActivePlan && userSubscription.cancel_at_period_end;
    const endDate = isCanceledPlan && userSubscription.current_period_end ? formattedDate(new Date(userSubscription.current_period_end * 1000)) : null;

    const priceData: PriceData = { price: plan.id, quantity: 1 };

    if (!canCustomerSubscribe && !isUserPlan) {
        canCustomerSubscribe = (userSubscription.planAmount ?? 0) <= plan.amount;
    }

    return (
        <div
            className={`
                relative flex flex-col p-8 bg-white border transition-all duration-300 group
                ${isActivePlan
                    ? "border-blue-500 shadow-2xl ring-1 ring-blue-500 scale-[1.02] z-10 rounded-[2rem]"
                    : "border-gray-200 hover:border-blue-200 hover:shadow-xl rounded-3xl"
                }
                h-full min-h-[500px] w-full max-w-[600px] mx-auto
            `}
        >
            {isActivePlan && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-max">
                    <Badge className="bg-blue-600 px-4 py-1.5 text-sm font-bold uppercase cursor-default tracking-widest shadow-lg hover:bg-blue-600 text-white border-0">
                        Current Plan
                    </Badge>
                </div>
            )}

            {/* Header */}
            <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight min-h-[3.5rem] flex items-center">
                        {product.name}
                    </h3>
                    {product.images?.[0] && (
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 p-2 flex items-center justify-center border border-gray-100 shadow-sm">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>

                {product.description && (
                    <p className="text-gray-500 font-medium leading-relaxed min-h-[3rem] line-clamp-2">
                        {product.description}
                    </p>
                )}
            </div>

            {/* Price */}
            <div className={`mb-8 p-6 rounded-2xl border ${isActivePlan ? 'bg-blue-50/50 border-blue-100' : 'bg-gray-50/50 border-gray-100'}`}>
                <PlanDisplay plan={plan} highlight={isActivePlan} />
                {isActivePlan && userSubscription?.current_period_end && (
                    <p className="mt-2 text-xs text-gray-500">
                        Next billing on {formattedDate(new Date(userSubscription.current_period_end * 1000))}
                    </p>
                )}
            </div>

            {/* Features */}
            <div className="mb-8 ">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Features</span>
                    <div className="h-px bg-gray-100 flex-1"></div>
                </div>
                <ul className="space-y-4 min-h-[3rem]">
                    {product.marketing_features?.slice(0,3)?.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                            <div className={`mt-0.5 rounded-full p-1 ${isActivePlan ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-500'}`}>
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                            <span className="text-sm font-medium leading-tight">{typeof feature === 'object' && feature !== null && 'name' in feature ? feature.name : feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="flex-1 pt-6 border-t border-gray-100/80 flex flex-col justify-end items-center">
                {isActivePlan && stripe_subscription_id && (
                    <div className="w-full flex justify-center">
                        <CancelSubscriptionButton stripeSubscriptionId={stripe_subscription_id} />
                    </div>
                )}

                {isCanceledPlan && stripe_subscription_id && (
                    <>
                        <div className="bg-amber-50 text-amber-800 text-sm p-4 rounded-xl border border-amber-200">
                            <p className="font-bold mb-1">Cancellation Scheduled</p>
                            <p className="opacity-90 text-xs">Access available until {endDate}</p>

                        </div>

                        <div className="w-full flex justify-center mt-2">
                            <ResumeSubscriptionButton stripeSubscriptionId={stripe_subscription_id}/>
                        </div>
                    </>
                )}

                {!isActivePlan && !isCanceledPlan && canCustomerSubscribe && (
                    <div className="w-full flex justify-center">
                        {stripe_subscription_id ? (
                            <UpdateSubscriptionButton
                                stripeSubscriptionId={stripe_subscription_id}
                                newPriceId={plan.id}
                            />
                        ) : (
                            <CheckoutButton
                                priceData={priceData}
                                customerId={userSubscription?.stripe_customer_id ?? ''}
                            />
                        )}
                    </div>
                )}

                {!isActivePlan && !isCanceledPlan && !canCustomerSubscribe && (
                    <div className="bg-gray-50 text-gray-500 text-sm p-4 rounded-xl border border-gray-200 text-center font-medium">
                        Downgrade available by cancelling current plan
                    </div>
                )}
            </div>
        </div>
    )
}