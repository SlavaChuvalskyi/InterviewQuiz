import {getListPlans} from "@lib/stripe";
import {CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {BillingData} from "@/app/types";
import {BillingProducts} from "@/app/billing/billingProducts";

export default async function BillingPage() {

    const {plans, products}: BillingData = await getListPlans();

    return (
        <div className={'flex flex-col gap-6'}>
                <CardHeader>
                    <CardTitle className="text-2xl">Billing Page</CardTitle>
                    <CardDescription>Choose a subscription</CardDescription>
                </CardHeader>

            <BillingProducts products={products} plans={plans}/>
        </div>
    );
}
