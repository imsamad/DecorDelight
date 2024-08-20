import { requireAdmin } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import ProductList from './ProductList';

const ProductListPage = async () => {
  const session = await requireAdmin('/products');

  const products = await prismaClient.product.findMany({
    // where: { userId: session.user.id },
  });

  return <ProductList products={products} />;
};

export default ProductListPage;
