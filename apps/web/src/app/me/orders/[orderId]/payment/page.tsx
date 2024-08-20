import { requireAuth } from '@/lib/requireAuth';
import { notFound } from 'next/navigation';
import React from 'react';
import { PaymentOptionCard } from './PaymentOptionCard';

const OrderPaymentPage = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const session = await requireAuth(`/me/orders/${orderId}/payment`);
  const order = await prismaClient.order.findFirst({
    where: { userId: session.user.id, id: orderId, paidAt: undefined },
  });

  if (!order) notFound();

  return (
    <div className='max-w-screen-md mx-auto'>
      {' '}
      <PaymentOptionCard order={order} />
    </div>
  );
};

export default OrderPaymentPage;
