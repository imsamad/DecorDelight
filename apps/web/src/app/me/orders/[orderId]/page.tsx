import { prismaClient } from '@repo/db';
import { requireAuth } from '@/lib/requireAuth';
import { notFound } from 'next/navigation';
import OrderDetails from './OrderDetails';

const OrderDetailPage = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const session = await requireAuth(`/me/orders/${orderId}`);
  const where: any = { id: orderId };
  if (session.user.role != 'ADMIN') where.userId = session.user.id;

  const order = await prismaClient.order.findFirst({
    where,
    include: {
      address: true,

      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const addresses = await prismaClient.address.findMany({
    where: { userId: session.user.id },
  });

  if (!order) notFound();

  return <OrderDetails order={order} addresses={addresses} />;
};

export default OrderDetailPage;
