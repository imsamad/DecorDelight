'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { fetcher } from '@/lib/fetcher';
import { ToastAction } from '@radix-ui/react-toast';
import { ShoppingBasketIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const AddToCart = ({
  productId,
  quantityInStock,
}: {
  productId: string;
  quantityInStock: number;
}) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const handleAddToCart = async () => {
    if (status == 'unauthenticated') {
      toast({
        title: 'You are not logged in!',
        action: (
          <ToastAction altText='Goto schedule to undo'>
            <Link href='/login?redirectTo=/'>
              <Button>Login</Button>
            </Link>
          </ToastAction>
        ),
      });
      return;
    }

    setIsLoading(true);

    fetcher(`/carts`, 'POST', {
      productId,
      quantity: 1,
    })
      .then(() => {
        toast({
          title: 'Added To Cart',
          variant: 'default',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Button
      size='sm'
      className='flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300'
      onClick={handleAddToCart}
    >
      <ShoppingBasketIcon className='w-4 h-4 mr-2' />
      Add To Cart
    </Button>
  );
};

export default AddToCart;
