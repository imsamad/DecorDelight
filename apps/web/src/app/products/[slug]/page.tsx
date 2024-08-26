import { notFound } from 'next/navigation';
import { ProductDetails } from './ProductDetails';
import { PageWrapper } from '@/components/PageWrapper';
import { ProductList } from '../ProductList';
import { prismaClient } from '@repo/db';

////export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

const ProductDisplayPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const product = await prismaClient.product.findUnique({
    where: { slug },
  });

  if (!product) return notFound();

  const recommendedProducts = (await prismaClient.product.findMany({})).filter(
    ({ id }) => id != product.id
  );

  return (
    <PageWrapper>
      <ProductDetails product={product} />
      <h1 className='text-2xl font-bold md:text-left text-center my-10'>
        Recommended For You
      </h1>
      <ProductList products={recommendedProducts} />
    </PageWrapper>
  );
};

export default ProductDisplayPage;
