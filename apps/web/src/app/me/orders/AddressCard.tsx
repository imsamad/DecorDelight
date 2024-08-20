'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, PlusCircle } from 'lucide-react';
import { Address } from '@repo/db';
import { fetcher } from '@/lib/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AddressForm } from './[orderId]/address/AddressForm';

export function AddressCard({
  address: address_,
  orderId,
  disableEditButton = true,
}: {
  address: Address;
  orderId?: string;
  disableEditButton?: boolean;
}) {
  const [address, setAddress] = useState(address_);

  return (
    <Card className='max-w-fit mx-auto shadow-lg rounded-lg'>
      <CardHeader className='flex justify-between items-center'>
        <CardTitle className='text-xl font-semibold'>{`${address?.userName}`}</CardTitle>
        {address.isDefault && <Badge variant='outline'>Default</Badge>}
      </CardHeader>
      <CardContent>
        <div className='text-sm'>
          <p>{address.id}</p>
          <p>{`${address.landmark}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}</p>
          <div className='flex items-center mt-2'>
            <Phone className='mr-2' size={16} />
            <p>{address.phoneNumber}</p>
          </div>
          {address.longitude && address.latitude && (
            <div className='flex items-center mt-2'>
              <MapPin className='mr-2' size={16} />
              <p>{`Lat: ${address.latitude}, Long: ${address.longitude}`}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='flex justify-end space-x-2'>
        {!disableEditButton ? (
          <AddressForm
            address={address}
            cb={(address) => {
              setAddress(address);
            }}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
}
