"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { MapPin, Phone } from "lucide-react";
import { Address } from "@repo/db";

import { useState } from "react";

import { AddressForm } from "./AddressForm";

export function AddressCard({
  address: address_,

  disableEditButton = true,
}: {
  address: Address;

  disableEditButton?: boolean;
}) {
  const [address, setAddress] = useState(address_);

  return (
    <Card className="max-w-fit mx-auto shadow-lg rounded-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-xl font-semibold">{`${address?.userName}`}</CardTitle>
        {address.isDefault && <Badge variant="outline">Default</Badge>}
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p>{`${address.landmark}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}</p>
          <div className="flex items-center mt-2">
            <Phone className="mr-2" size={16} />
            <p>{address.phoneNumber}</p>
          </div>
          {address.longitude && address.latitude && (
            <div className="flex items-center mt-2">
              <MapPin className="mr-2" size={16} />
              <p>{`Lat: ${address.latitude}, Long: ${address.longitude}`}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
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
