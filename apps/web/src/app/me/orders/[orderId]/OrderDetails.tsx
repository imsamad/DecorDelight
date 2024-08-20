'use client';
import GoBackButton from '@/components/GoBackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from '@/components/ui/table'; // Importing Shadcn's table components
import { Address, Order, OrderItem } from '@repo/db';
import React, { useState } from 'react';
import { AddressCard } from '../AddressCard';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/fetcher';
import clsx from 'clsx';

import { AddressForm } from './address/AddressForm';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { PaymentOptionCard } from './payment/PaymentOptionCard';
import { Button } from '@/components/ui/button';
import PayOnlineButton from '../PayOnlineButton';

interface X extends Order {
  items: OrderItem[];
  address: Address | null;
}

export const OrderDetails = ({
  order: orderProp,
  addresses: addressesProp,
}: {
  order: X;
  addresses: Address[];
}) => {
  const [order, setOrder] = useState<X>(orderProp);
  const [addresses, setAddresses] = useState<Address[]>(addressesProp);

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const refetchOrder = () => {
    fetcher(`/orders/${order.id}`, 'GET')
      .then(({ order }) => {
        setOrder(order);
      })
      .catch((err) => {});
  };

  const refetchAddresses = () => {
    fetcher(`/addresses`, 'GET')
      .then(({ addresses }) => {
        setAddresses(addresses);
      })
      .catch((err) => {});
  };

  const handleAddressSubmit = async (addressId: string, address: Address) => {
    try {
      if (order.addressId == addressId) return;
      setIsLoading(true);
      await fetcher(`/orders/addAddress/${order.id}/${addressId}`, 'PUT');
      refetchAddresses();
      refetchOrder();
      toast({
        title: 'Address has been set successfully.',
        variant: 'default',
      });

      setIsLoading(false);
    } catch (error) {
      toast({
        title: 'Server is under maintenance, please try again',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const changeable = !order.paidAt && !order.delivered && !order.paymentMode;
  // &&  order.outOfDelivery  || order.paymentMode == EPaymentMode.COD
  return (
    <Card className='max-w-screen-lg w-full mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg'>
      <CardHeader>
        <div>
          <GoBackButton />
        </div>
        <CardTitle className='text-2xl font-bold text-gray-900'>
          Order Details: {order.id}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className='space-y-6 '>
          {/* Product Details */}
          <Card className='bg-gray-50'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold text-gray-800'>
                Product Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table className='w-full '>
                <TableHeader>
                  <TableRow className='text-gray-700'>
                    <TableCell className='font-semibold'>Product</TableCell>
                    <TableCell className='font-semibold'>Quantity</TableCell>
                    <TableCell className='font-semibold'>Price</TableCell>
                    {/* <TableCell className='font-semibold'>Action</TableCell> */}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {order.items.map((item: OrderItem) => (
                    <TableRow key={item.id}>
                      {/* @ts-ignore */}
                      <TableCell>{item.product.title! as string}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {item.priceAtThatTime.currency}
                        {item.priceAtThatTime.amount}
                      </TableCell>
                      {/* <TableCell>
                        <Button variant='ghost' size='sm'>
                          <Trash2 className='w-4 h-4 text-red-600 ' />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className='bg-gray-50'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <p className='text-lg font-semibold text-gray-800'>
                  Shipping Address
                </p>
                {changeable ? (
                  <AddressForm
                    orderId={order.id}
                    cb={() => {
                      refetchOrder();
                      refetchAddresses();
                    }}
                  />
                ) : null}
              </div>
            </CardHeader>
            <CardContent>
              {changeable ? (
                <ScrollArea className='whitespace-nowrap pb-5'>
                  <div
                    className='flex overflow-x-auto overflow-y-hidden gap-2 w-max'
                    key={order.addressId}
                  >
                    {addresses.map((address) => (
                      <div
                        className={clsx(
                          'min-w-[290px] border-2 border-transparents transition-all rounded-md',
                          address.id.toString() == order?.addressId?.toString()
                            ? ' border-gray-800 rounded-md'
                            : 'hover:border-blue-400'
                        )}
                        key={address.id}
                        onClick={() => {
                          handleAddressSubmit(address.id, address);
                        }}
                      >
                        <AddressCard
                          address={address}
                          disableEditButton={false}
                        />
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation='horizontal' />
                </ScrollArea>
              ) : order.address ? (
                <AddressCard
                  address={order.address as Address}
                  disableEditButton={true}
                />
              ) : null}
            </CardContent>
          </Card>
          {/* 
          if cod, 
          
          */}
          {/* Payment Details */}
          {order.addressId ? (
            order.paidAt ? (
              <PaymentDetailCard order={order} />
            ) : order.paymentMode == 'COD' ? (
              <div>
                <div>
                  Your order have been placed, and under process, we will let
                  you kown by sending email.
                </div>

                <div>
                  As you have selected Cash-on-delivery as payment mode, you can
                  opt out to Online payment for faster processing.
                </div>
                <div className='my-2'>
                  <PayOnlineButton orderId={order.id} />
                </div>
              </div>
            ) : order.paymentMode == 'ONLINE' ? (
              <div>
                <div>
                  Your order have been placed, and seller would initate delivery
                  processs, once you made the payment. Thanks
                </div>

                <div className='my-2'>
                  <PayOnlineButton orderId={order.id} />
                </div>
              </div>
            ) : (
              <PaymentOptionCard
                cb={() => {
                  refetchOrder();
                }}
                order={order}
              />
            )
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetails;

const PaymentDetailCard = ({ order }: { order: Order }) => (
  <Card className='bg-gray-50'>
    <CardHeader>
      <CardTitle className='text-lg font-semibold text-gray-800'>
        Payment Details
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className='space-y-2'>
        <p className='text-sm text-gray-700'>
          <strong>Total Amount:</strong> INR {order.totalAmount}
        </p>
        <p className='text-sm text-gray-700'>
          <strong>Items Price:</strong> INR {order.itemsPrice}
        </p>
        <p className='text-sm text-gray-700'>
          <strong>Shipping Price:</strong> INR {order.shippingPrice}
        </p>
        <p className='text-sm text-gray-700'>
          <strong>Tax Price:</strong> INR {order.taxPrice}
        </p>
        <p className='text-sm text-gray-700'>
          <strong>Payment Mode:</strong> {order.paymentMode}
        </p>
        <p className='text-sm text-gray-700'>
          <strong>Paid At:</strong>
          {order.paidAt ? updateDateTime(new Date(order.paidAt)) : 'Not Paid'}
        </p>
      </div>
    </CardContent>
  </Card>
);

function updateDateTime(time: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return time.toLocaleString('en-US', options);
}
