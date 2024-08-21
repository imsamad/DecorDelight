"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuRadioGroup } from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { Order } from "@repo/db";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { humaniseDateObject } from "@repo/utils";
import { fetcher } from "@/lib/fetcher";
import { useToast } from "@/components/ui/use-toast";

export const OrderStatusesColums = ({
  order,
  isAdmin,
}: {
  order: Order;
  isAdmin: boolean;
}) => {
  const [orderStatuses, setOrderStasus] = useState<
    Partial<Pick<Order, "cancelledAt" | "outOfDeliveryAt" | "deliveredAt">>
  >({
    cancelledAt: order.cancelledAt || null,
    outOfDeliveryAt: order.outOfDeliveryAt || null,
    deliveredAt: order.deliveredAt || null,
  });
  const { toast } = useToast();
  const [status, setStatus] = useState<string>("");

  const submitChanges = async () => {
    if (!isAdmin) return;
    fetcher(`/orders/change_status/${order.id}/${status}`, "PUT")
      .then(({ order }: { order: Order }) => {
        setOrderStasus({
          cancelledAt: order.cancelledAt || null,
          outOfDeliveryAt: order.outOfDeliveryAt || null,
          deliveredAt: order.deliveredAt || null,
        });
        setOpen(false);
        toast({
          title: "Order Updated",
          variant: "default",
        });
      })
      .catch((er) => {
        toast({
          title: "Server is under maintenance, please try again",
          variant: "destructive",
        });
      });
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableCell>
        {!order.addressId
          ? "Not placed"
          : order.outOfDeliveryAt
            ? "Out for delivery"
            : order.deliveredAt
              ? "Delivered"
              : order.cancelledAt
                ? "Cancelled by seller"
                : !order.paymentMode
                  ? "Select Payment Method"
                  : "Under Process"}
      </TableCell>
      {isAdmin ? (
        <TableCell>
          <Dialog open={open} onOpenChange={() => setOpen((p) => !p)}>
            <DialogTrigger asChild>
              <Button>Change Status</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Status</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                This order has been :
                <p>Place at: {humaniseDateObject(order.createdAt)}</p>
                {orderStatuses.cancelledAt ? (
                  <p>
                    Cancelled at:
                    {humaniseDateObject(orderStatuses.cancelledAt)}
                  </p>
                ) : (
                  ""
                )}{" "}
                {orderStatuses.outOfDeliveryAt ? (
                  <p>
                    {" "}
                    Out Of Delivered at:{" "}
                    {humaniseDateObject(orderStatuses.outOfDeliveryAt)}
                  </p>
                ) : (
                  ""
                )}{" "}
                {orderStatuses.deliveredAt ? (
                  <p>
                    {" "}
                    Delivered at:{" "}
                    {humaniseDateObject(orderStatuses.deliveredAt)}
                  </p>
                ) : (
                  ""
                )}
              </DialogDescription>
              <DropdownMenuRadioGroup defaultValue="comfortable">
                <RadioGroup onValueChange={(v) => setStatus(v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cancelledAt"
                      id="cancelledAt"
                      disabled={!!order.cancelledAt}
                    />
                    <Label htmlFor="cancelledAt">Cancel Order</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      disabled={!!order.outOfDeliveryAt}
                      value="outOfDeliveryAt"
                      id="outOfDeliveryAt"
                    />
                    <Label htmlFor="outOfDeliveryAt">
                      Mark it set to deliver (Out of delivery)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="deliveredAt"
                      id="deliveredAt"
                      disabled={!!order.deliveredAt}
                    />
                    <Label htmlFor="deliveredAt">Mark it delivered</Label>
                  </div>
                </RadioGroup>
              </DropdownMenuRadioGroup>
              <DialogFooter>
                <Button disabled={!status} onClick={submitChanges}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TableCell>
      ) : null}
    </>
  );
};
