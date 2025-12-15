'use client'
import { StripePlan, StripeProduct } from "@/app/types";
import { useUserStore } from "@stores/userStore";
import { Grid } from "@/components/ui/grid";
import { CardContent } from "@/components/ui/card";
import { ProductDisplay } from "@/app/billing/productDisplay";
import { redirect } from "next/navigation";

type ProductProps = {
    plans: StripePlan[],
    products: StripeProduct[],
}

export function BillingProducts({ products, plans }: ProductProps) {

    const userState = useUserStore((state) => state);
    const user = userState.user;
    const userSubscription = userState.userSubscription;

    if (!user) {
        redirect('/auth/login')
    }

    console.log('update billing page = ', user)

    return (
        <Grid className="grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto w-full">
            {plans.map((plan: StripePlan) => {

                const product: StripeProduct | undefined = products.find((item: StripeProduct) => item.id === plan.product);

                if (!product) {
                    return null;
                }

                return (
                    <div key={product.id} className="w-full h-full flex">
                        <ProductDisplay product={product} plan={plan} user={user} userSubscription={userSubscription} />
                    </div>)
            })}
        </Grid>
    )
}