import { requireAuth } from "@/lib/requireAuth";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const StripePaymentSuccessCBHandler = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const session = await requireAuth(
    `/me/orders/${orderId}/stripepayment_success_cb`,
  );

  const order = await prismaClient.order.findFirst({
    where: { id: orderId, userId: session.user.id, paidAt: undefined },
  });

  if (!order || !order.stripeSessionId) return notFound();

  const stripeSession = await stripe.checkout.sessions.retrieve(
    order.stripeSessionId,
  );

  if (stripeSession.payment_status != "paid") notFound();

  await prismaClient.order.update({
    where: { id: orderId },
    data: {
      paidAt: new Date(),
    },
  });
  redirect(`/me/orders/${orderId}`);
};

export default StripePaymentSuccessCBHandler;
