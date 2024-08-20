'use client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { fetcher } from '@/lib/fetcher';
import { Product } from '@repo/db';
import { TObjectIdFormatSchema } from '@repo/utils';
import { Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ProductList = ({ products: productsProp }: { products: Product[] }) => {
  const [products, setProducts] = useState(productsProp);

  const getProducts = async () => {
    fetcher(`/products/my`, 'GET').then(({ products }) =>
      setProducts(products)
    );
  };

  const handleDelete = async (productId: TObjectIdFormatSchema) => {
    fetcher(`/products/${productId}`, 'DELETE')
      .then(() => {
        setProducts((p) => p.filter(({ id }) => id != productId));
      })
      .catch(() => {});
  };

  return (
    <div className='max-w-screen-lg mx-auto'>
      <h2 className='scroll-m-20 text-center text-3xl font-semibold tracking-tight my-6'>
        List of products
      </h2>
      <Table>
        <TableCaption>A list of products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>

            <TableHead>Quantity in stocks</TableHead>
            <TableHead>Dimensions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className='font-medium'>
                {product.medias[0]?.url ? (
                  <Image
                    alt={product.title}
                    src={product.medias[0].url}
                    width='80'
                    height={80}
                  />
                ) : null}
              </TableCell>
              <TableCell className='font-medium'>{product.title}</TableCell>
              <TableCell>
                {product.price.currency}
                &nbsp;
                {product.price.amount}
              </TableCell>
              <TableCell>{product.quantityInStock}</TableCell>
              <TableCell className='text-right'>
                <div className='flex'>
                  <p>
                    {product.dimension.height}
                    &nbsp;x &nbsp;
                  </p>
                  <p>
                    {product.dimension.width}
                    &nbsp;x &nbsp;
                  </p>
                  <p>{product.dimension.length}</p>
                  <p>
                    &nbsp; {`&`} {product.dimension.weight} KG
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className='w-4 h-4 mr-2' />
                    Delete
                  </Button>
                  <Link href={`/me/products/edit/${product.id}`}>
                    <Button size='sm' variant='default'>
                      <Edit2 className='w-4 h-4 mr-2' />
                      Edit
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductList;
