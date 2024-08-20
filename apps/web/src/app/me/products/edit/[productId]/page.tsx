import { requireAuth } from '@/lib/requireAuth';
import ProductForm from '../../ProductForm';
import { prismaClient, Product } from '@repo/db';
import { notFound } from 'next/navigation';
import { TProductSchema } from '@repo/utils';

const ProductEdit = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const session = await requireAuth('/me/products/create');
  const product: Pick<
    Product,
    | 'title'
    | 'description'
    | 'price'
    | 'dimension'
    | 'quantityInStock'
    | 'medias'
    | 'tableProps'
  > | null = await prismaClient.product.findFirst({
    where: {
      id: productId,
      // userId: session.user.id
    },
    select: {
      title: true,
      description: true,
      price: true,
      dimension: true,
      quantityInStock: true,
      medias: true,
      tableProps: true,
    },
  });

  if (!product) return notFound();

  return (
    <div className='container max-w-lg rounded-lg border-2 border-gray-700 my-8 p-0'>
      {/* @ts-ignore */}
      <ProductForm product={product} productId={productId} />
    </div>
  );
};

export default ProductEdit;
