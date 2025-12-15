import { getListPlans } from "@lib/stripe";
import { BillingData } from "@/app/types";
import { BillingProducts } from "@/app/billing/billingProducts";

export default async function BillingPage() {

    const { plans, products }: BillingData = await getListPlans();

    return (
        <div className={'flex flex-col flex-1 pb-20 pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full'}>
            <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 font-display">
                    Simple, transparent pricing
                </h1>
                <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Choose the plan that's right for you. Change or cancel anytime.
                </p>
            </div>

            <BillingProducts products={products} plans={plans} />
        </div>
    );
}
