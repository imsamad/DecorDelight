import { requireAuth } from "@/lib/requireAuth";
import { prismaClient } from "@repo/db";
import CartList from "./CartList";
import { PageWrapper } from "@/components/PageWrapper";
import { ProductList } from "../products/ProductList";

const CartPage = async () => {
  const session = await requireAuth("/cart");
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
  const productIdMapping: Record<string, boolean> = {};
  carts.forEach((cart) => {
    productIdMapping[cart.product.id] = true;
  });

  const recommendedProducts = (await prismaClient.product.findMany({})).filter(
    ({ id }) => !productIdMapping[id],
  );

  return (
    <PageWrapper>
      {/* <div className='bg-red-400 p-2 max-w-screen-lg w-full'> </div> */}
      <CartList carts={carts} />
      <h1 className="text-2xl font-bold  text-center my-10">
        Recommended For You
      </h1>
      <ProductList products={recommendedProducts} showCartButton={false} />
    </PageWrapper>
  );
};

export default CartPage;
