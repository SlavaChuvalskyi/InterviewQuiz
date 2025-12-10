import {Button} from "@/ui/button";
import {checkoutPayment} from "@lib/stripe";

export function CheckoutButton({ priceId, customerId }) {
    return (
        <form action={checkoutPayment.bind(null, priceId, customerId)}>
            <Button type="submit">Checkout</Button>
        </form>
    );
}
