import { Product } from '@repo/db';
import React from 'react';
import ProductCard from './ProductCard';

export const ProductList = ({
  products,
}: {
  products: Pick<
    Product,
    | 'id'
    | 'description'
    | 'medias'
    | 'quantityInStock'
    | 'title'
    | 'slug'
    | 'price'
  >[];
}) => {
  return (
    <>
      <div className='flex flex-wrap gap-8 justify-center py-4 pb-10'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
