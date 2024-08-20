import { requireAuth } from '@/lib/requireAuth';
import { prismaClient } from '@repo/db';
import React from 'react';
import { AddressForm } from './AddressForm';
import { AddressCard } from '../../AddressCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderAddressPage = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const session = await requireAuth(`/me/orders/${orderId}/address`);
  const addresses = await prismaClient.address.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div className='container flex justify-center items-stretch p-10 flex-wrap gap-2'>
      {addresses.length ? (
        <Card className='flex flex-col basis-[400px]'>
          <CardHeader>
            <CardTitle>Select any one of them</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            {addresses.map((address) => (
              <div key={address.id} className=''>
                <AddressCard address={address} orderId={orderId} />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
      <div className='basis-[400px]'>
        <AddressForm orderId={orderId} />
      </div>
    </div>
  );
};

export default OrderAddressPage;
