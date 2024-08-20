import { requireAuth } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import CartList from './CartList';

const CartPage = async () => {
  const session = await requireAuth('/cart');
  const carts = await prismaClient.cartItem.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        select: {
          medias: true,
          title: true,
          id: true,
          quantityInStock: true,
          price: true,
          slug: true,
        },
      },
    },
  });

  return (
    <div className='pt-16'>
      {/* <div className='bg-red-400 p-2 max-w-screen-lg w-full'> </div> */}
      <CartList carts={carts} />
    </div>
  );
};
export const revalidate = 0;
export default CartPage;
