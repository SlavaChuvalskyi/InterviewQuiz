'use client'
import {useUserStore} from "@stores/userStore";
import {createClientStripe, createClient} from "@lib/client";

export default function SuccessPage() {

    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    const query_session_id = query.get('session_id');

    if (!query_session_id) {
        redirect('/')
    }

    const user: UserProfile | null = useUserStore((state) => state.user)

    if (!user) {
        redirect('/auth/login')
    }

    const supabase = createClient();
    const stripe = createClientStripe();
    stripe.checkout.sessions.retrieve(query_session_id).then((data)=>{

        const subscription_id = data?.subscription;
        if (data?.payment_status === 'paid' && subscription_id !== user.stripe_subscription_id) {
            console.log('here')
            supabase.from("profiles").update({
                stripe_subscription_id: subscription_id,
                }).eq("id", user.id);
        }

    });

  return (
      <section>
          <div className="product Box-root">
              <div className="description Box-root">
                  <h3>Subscription to Starter Plan successful!</h3>
              </div>
          </div>

      </section>
  )
}
