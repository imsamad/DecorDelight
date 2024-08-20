import { prismaClient } from '@repo/db';
import { ProductList } from './ProductList';

const HomePage = async () => {
  const products = await prismaClient.product.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      title: true,
      medias: true,
      description: true,
      quantityInStock: true,
      id: true,
      slug: true,
      price: true,
    },
  });

  return <ProductList products={products} />;
};

export default HomePage;
