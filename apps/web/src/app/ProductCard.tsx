import { Product } from '@repo/db';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import AddToCart from './AddToCart';

const ProductCard = ({
  product,
}: {
  product: Pick<
    Product,
    'id' | 'description' | 'medias' | 'quantityInStock' | 'title' | 'price'
  >;
}) => {
  return (
    <div
      key={product.id}
      className='bg-white  w-[280px] md:w-[260px] rounded-lg shadow-lg overflow-hidden border border-slate-300 transform transition-shadow hover:shadow-cyan-500'
    >
      <Image
        src={product.medias[0].url}
        width={280}
        height={200}
        style={{
          width: 'auto',
          height: 'auto',
        }}
        alt={product.title}
        className='object-cover'
        priority
      />{' '}
      <div className='p-4 py-2 pb-4'>
        <h3 className='text-md  font-medium text-gray-700 truncate'>
          {product.title}
        </h3>
        {/* <div className='mt-2 mb-4 text-gray-700'>{product.description}</div> */}

        <div className='flex justify-between items-center '>
          <p className='text-sm font-bold text-gray-500'>
            {product.price.amount}&nbsp;&#x20B9;
          </p>
          <p className='flex'>
            <FullSilverStarIcon />
            <FullSilverStarIcon />
            <FullSilverStarIcon />
            <FullSilverStarIcon />
            <HalfSilverStarIcon />
            {/* <FullSilverIcon />
            <FullSilverIcon /> */}
          </p>
        </div>

        <div className='flex mt-4 space-x-2'>
          <Button
            size='sm'
            className='flex-1 bg-green-400 text-white hover:bg-green-700'
          >
            Buy
          </Button>
          <AddToCart
            productId={product.id}
            quantityInStock={product.quantityInStock}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

const FullSilverStarIcon = () => (
  <svg
    width='1rem'
    height='1rem'
    viewBox='0 0 24 24'
    fill='yellow'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M12 1.7l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.31L12 1.7z' />
  </svg>
);

const HalfSilverStarIcon = () => (
  <svg
    width='1rem'
    height='1rem'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='halfSilverStar' x1='0%' y1='0%' x2='100%' y2='0%'>
        <stop offset='50%' style={{ stopColor: 'yellow', stopOpacity: 1 }} />
        <stop
          offset='50%'
          style={{ stopColor: 'transparent', stopOpacity: 1 }}
        />
      </linearGradient>
    </defs>
    <path
      d='M12 1.7l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.31L12 1.7z'
      fill='url(#halfSilverStar)'
    />
  </svg>
);
