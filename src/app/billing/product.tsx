import PlanDisplay from "@/app/billing/plan";
import {StripePlan, StripeProduct, UserProfile} from "@/app/types";
import {CheckoutButton} from "@/components/ui/checkout-button";

type ProductProps = {
    plan: StripePlan,
    product: StripeProduct,
    user: UserProfile | null,
}

export function ProductDisplay({product, plan, user}: ProductProps) {

    console.log("product = ", product)

    return (
        <section
            className={`max-w-sm rounded-2xl shadow-md p-6 flex flex-col gap-4 transition-shadow duration-300
    ${
                user?.stripe_subscription_id === plan.id
                    ? 'bg-blue-50 border-2 border-blue-400 shadow-lg' // Highlight current plan
                    : 'bg-white hover:shadow-lg'
            }`}
        >
            {/* Header */}
            <div className="flex items-center gap-4">
                {product.images?.[0] && (
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-contain rounded-full border border-gray-200"
                    />
                )}
                <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
            </div>

            {/* Description */}
            {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            )}

            {/* Plan display */}
            <div className="mt-2">
                <PlanDisplay plan={plan} />
            </div>

            {/* Features */}
            {product.marketing_features?.length > 0 && (
                <ul className="mt-3 flex flex-col gap-2 text-gray-700 text-sm">
                    {product.marketing_features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            <span className="text-green-500">✔</span> {feature}
                        </li>
                    ))}
                </ul>
            )}

            {/* Checkout button centered */}
            <div className="mt-6 flex justify-center">
                <CheckoutButton priceId={plan.id} customerId={user?.id ?? null} />
            </div>
        </section>

    )
}