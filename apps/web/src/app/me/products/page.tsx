import { requireAdmin } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import ProductList from './ProductList';
import { PageWrapper } from '@/components/PageWrapper';
////export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const ProductListPage = async () => {
  const session = await requireAdmin('/products');

  const products = await prismaClient.product.findMany({
    // where: { userId: session.user.id },
  });

  return (
    <PageWrapper>
      <ProductList products={products} />
    </PageWrapper>
  );
};

export default ProductListPage;
