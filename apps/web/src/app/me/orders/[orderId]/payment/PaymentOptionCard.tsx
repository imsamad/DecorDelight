'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { fetcher } from '@/lib/fetcher';

import { EPaymentMode, Order } from '@repo/db';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export const PaymentOptionCard = ({
  order,
  cb,
}: {
  order: Order;
  cb?: () => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<EPaymentMode>(
    EPaymentMode.ONLINE
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckboxChange = (value: EPaymentMode) => {
    setSelectedOption(value);
  };
  const router = useRouter();
  const handlePaymentSet = async () => {
    setIsLoading(true);

    if (selectedOption == 'ONLINE') {
      fetcher(`/orders/getStripePaymentUrl/${order.id}`, 'PUT')
        .then(({ url }) => {
          if (cb) cb();
          router.push(url);
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }
    fetcher(
      `/orders/setPaymentMode/${order.id}?paymentMode=${selectedOption}`,
      'PUT'
    )
      .then(() => {
        if (cb) cb();
        router.push(`/me/orders/${order.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle>Select Payment Option</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-3'>
          <Checkbox
            id={EPaymentMode.COD}
            checked={selectedOption === EPaymentMode.COD}
            onCheckedChange={() => handleCheckboxChange(EPaymentMode.COD)}
          />
          <label htmlFor={EPaymentMode.COD} className='text-gray-700'>
            Cash on Delivery (COD)
          </label>
        </div>
        <div className='flex items-center space-x-3'>
          <Checkbox
            id={EPaymentMode.ONLINE}
            checked={selectedOption === EPaymentMode.ONLINE}
            onCheckedChange={() => handleCheckboxChange(EPaymentMode.ONLINE)}
          />
          <label htmlFor={EPaymentMode.ONLINE} className='text-gray-700'>
            Online Payment
          </label>
        </div>
        <Button
          className='w-full'
          disabled={!selectedOption || isLoading}
          onClick={() => {
            handlePaymentSet();
          }}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};
