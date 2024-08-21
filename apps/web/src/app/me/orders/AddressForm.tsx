"use client";
import { FormFieldWrapper } from "@/components/FormFieldWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { Address } from "@repo/db";
import { AddressSchema, TAddressSchema } from "@repo/utils";
import { Edit2Icon, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const AddressForm = ({
  orderId,
  cb,
  address: addressProp,
}: {
  orderId?: string;
  cb?: (address: Address) => void;
  address?: Address;
}) => {
  const [open, setOpen] = useState(false);
  const addressForm = useForm<TAddressSchema>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      userName: "Abdus Samad",
      phoneNumber: "9870645161",
      city: "Haridwar",
      state: "Uttarakhand",
      country: "India",
      pincode: "247661",
      landmark: "Near Petrol Pump",
    },
    values: addressProp ? addressProp : undefined,
  });

  const { toast } = useToast();

  const handleAddressSubmit = async (address: TAddressSchema) => {
    try {
      let url = `/addresses`;
      if (addressProp && addressProp.id) url += `/${addressProp.id}`;
      if (orderId) url += `?addToOrder=${orderId}`;

      const { address: address_ } = await fetcher(
        url,
        addressProp && addressProp.id ? "PUT" : "POST",
        address,
      );

      toast({
        title: "Address has been set successfully.",
        variant: "default",
      });
      cb && cb(address_ as Address);
      setOpen(false);
    } catch (error) {
      // toast({
      //   title: 'Server is under maintenaince, please try again!',
      //   variant: 'destructive',
      // });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((p) => !p)}>
      <DialogTrigger className="inline" asChild>
        <Button variant="outline">
          <div className="flex items-center">
            {/* <PlusCircle className='w-4 h-4 mr-2' /> */}
            {addressProp && addressProp.id ? (
              <>
                <Edit2Icon className="w-4 h-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4 mr-2" />
                Address
              </>
            )}
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {addressProp && addressProp.id ? "Edit" : "Add"} Address
          </DialogTitle>
        </DialogHeader>
        <Form {...addressForm}>
          <form onSubmit={addressForm.handleSubmit(handleAddressSubmit)}>
            <FormFieldWrapper.TextField
              label="Name"
              name="userName"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="Phone Number"
              name="phoneNumber"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="City"
              name="city"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="Landmark"
              name="landmark"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="Pin Code"
              name="pincode"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="State"
              name="state"
              control={addressForm.control}
            />
            <FormFieldWrapper.TextField
              label="Country"
              name="country"
              control={addressForm.control}
            />
            <Button
              className="my-5"
              disabled={addressForm.formState.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>{" "}
      </DialogContent>
    </Dialog>
  );
};
