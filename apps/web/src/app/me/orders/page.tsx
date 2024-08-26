import { requireAuth } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import OrdersList from './OrdersList';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageWrapper } from '@/components/PageWrapper';

////export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const MyOrdersPage = async ({
  wrapInPage = true,
}: {
  wrapInPage?: boolean;
}) => {
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
      <div className='flex flex-col items-center justify-center py-10 mt-24'>
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

  const isAdmin = session.user.role == 'ADMIN';

  if (!wrapInPage)
    return (
      <OrdersList
        orders={orders}
        isAdmin={isAdmin}
        userId={isAdmin ? session.user.id : undefined}
      />
    );

  return (
    <PageWrapper>
      <OrdersList
        orders={orders}
        isAdmin={isAdmin}
        userId={isAdmin ? session.user.id : undefined}
      />
    </PageWrapper>
  );
};

export const revalidate = 0;

export default MyOrdersPage;
