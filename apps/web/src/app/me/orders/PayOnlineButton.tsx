"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import React from "react";

const PayOnlineButton = ({
  orderId,
  label,
}: {
  orderId: string;
  label?: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        toast({
          title: "You are being redirected to Stripe website.",
        });
        fetcher(`/orders/getStripePaymentUrl/${orderId}`, "PUT")
          .then(({ url }) => {
            router.push(url);
          })
          .catch((err) => {});
      }}
    >
      {label ? label : "Pay Online"}
    </Button>
  );
};

export default PayOnlineButton;
