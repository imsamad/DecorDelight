import { requireAuth } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import OrdersList from './OrdersList';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MyOrdersPage = async () => {
  const session = await requireAuth('/me/orders');
  const where: any = {};

  if (session.user.role == 'USER') where.userId = session.user.id;
  const orders = await prismaClient.order.findMany({
    where,
    include: {
      items: true,
    },
  });

  if (orders.length == 0)
    return (
      <div className='flex flex-col items-center justify-center py-10'>
        <Image
          src='/emptyCartImage.jpeg' // Replace with your own image
          alt='Empty Cart'
          width={200}
          height={200}
          className='mb-4 rounded-lg'
        />
        <h2 className='text-2xl font-semibold mb-2 text-gray-800'>
          Your orders are empty.
        </h2>
        <p className='text-gray-600 mb-6'>
          Looks like you haven't added anything to your order yet.
        </p>
        <Link href='/'>
          <Button variant='default' size='lg'>
            Continue Shopping
          </Button>
        </Link>
      </div>
    );

  return (
    <div className='max-w-screen-lg w-full mx-auto'>
      <OrdersList orders={orders} isAdmin={session.user.role == 'ADMIN'} />
    </div>
  );
};

export const revalidate = 0;

export default MyOrdersPage;
