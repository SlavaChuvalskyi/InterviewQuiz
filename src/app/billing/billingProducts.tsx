'use client'
import {StripePlan, StripeProduct, UserProfile} from "@/app/types";
import {useUserStore} from "@stores/userStore";
import {Grid} from "@/components/ui/grid";
import {CardContent} from "@/components/ui/card";
import {ProductDisplay} from "@/app/billing/product";
import {redirect} from "next/navigation";

type ProductProps = {
    plans: StripePlan[],
    products: StripeProduct[],
}

export function BillingProducts({products, plans}: ProductProps) {

    const user: UserProfile | null = useUserStore((state) => state.user)

    if (!user) {
        redirect('/auth/login')
    }

        console.log('BillingProducts user = ', user)
    return (
        <Grid className="grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 justify-center place-items-center">
            {products.map((product:StripeProduct) => {

                const plan: StripePlan | undefined = plans.find((item:StripePlan) => item.product === product.id);

                if (!plan) {
                    return null;
                }

                return (
                    <CardContent key={product.id}>
                        <ProductDisplay product={product} plan={plan} user={user}/>
                    </CardContent>)
            })}
        </Grid>
    )
}