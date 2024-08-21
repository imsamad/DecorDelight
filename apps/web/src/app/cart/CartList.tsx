"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { fetcher } from "@/lib/fetcher";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CartList = ({ carts: cartsProps }: { carts: any }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [carts, setCarts] = useState(cartsProps);
  const [selectedItems, setSelectedItems] = useState(
    cartsProps.map(({ id }: any) => id),
  );

  const refetchCart = async () => {
    fetcher("/carts", "GET")
      .then(({ cartItems }) => {
        setSelectedItems((items: any) =>
          items.filter(
            (item: any) =>
              cartItems.findIndex(({ id }: any) => id == item) != -1,
          ),
        );
        setCarts(cartItems);
      })
      .catch((err) => {});
  };

  const handleDelete = (cartId: string) => {
    fetcher(`/carts/${cartId}`, "DELETE")
      .then((res) => {
        refetchCart();
      })
      .catch((err) => {});
  };

  const handleItemSelection = (cartId: string) => {
    const index = selectedItems.findIndex((id: any) => id == cartId);
    if (index != -1) {
      setSelectedItems(selectedItems.filter((id: any) => id != cartId));
    } else setSelectedItems((p: any) => [...p, cartId]);
  };

  const handlePlaceOrder = async () => {
    const order = carts
      .filter(
        (cart: any) =>
          selectedItems.findIndex((id: any) => id == cart.id) != -1,
      )
      .map((cart: any) => ({ cartItemId: cart.id, quantity: cart.quantity }));

    fetcher("/orders", "POST", { order })
      .then((res) => {
        toast({
          title: "Order placed",
          variant: "default",
        });
        router.push(`/me/orders/${res.order.id}`);
      })
      .catch((err) => {});
  };

  if (carts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Image
          src="/emptyCartImage.jpeg" // Replace with your own image
          alt="Empty Cart"
          width={200}
          height={200}
          className="mb-4 rounded-lg"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/">
          <Button variant="default" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );

  return (
    <Card className="overflow-x-auto w-full mx-auto">
      <CardHeader>
        {/* <div className=''> */}
        {/* <h3 className='text-center text-lg font-semibold text-gray-900 truncate'> */}
        <CardTitle>Your cart</CardTitle>
        {/* </h3> */}
        {/* </div> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead>Select</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {carts.map((cart: any) => (
              <TableRow key={cart.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={
                      selectedItems.findIndex((id: any) => id == cart.id) != -1
                    }
                    onCheckedChange={() => {
                      handleItemSelection(cart.id);
                    }}
                  />
                </TableCell>
                <TableCell>
                  {cart.product.medias[0]?.url ? (
                    <Image
                      alt={cart.product.title}
                      src={cart.product.medias[0].url}
                      width={80}
                      height={80}
                      style={{
                        width: "auto",
                        height: "auto",
                      }}
                      className="rounded-lg"
                    />
                  ) : null}
                </TableCell>
                <TableCell className="font-medium">
                  {cart.product.title}
                </TableCell>
                <TableCell>
                  <QuantityComponent
                    qty={cart.quantity}
                    cartId={cart.id}
                    refetchCart={refetchCart}
                  />
                </TableCell>
                <TableCell>
                  {cart.product.price.currency}
                  &nbsp;
                  {cart.product.price.amount}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(cart.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-0">
              <TableCell colSpan={4} />
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="font-bold">
                {carts.reduce(
                  (acc: number, red: any) =>
                    acc +
                    (selectedItems.includes(red.id)
                      ? red.product.price.amount * red.quantity
                      : 0),
                  0,
                )}
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-inherit">
              <TableCell colSpan={4} />
              <TableCell colSpan={2}>
                <Button
                  className="w-full"
                  disabled={selectedItems.length === 0}
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CartList;

const QuantityComponent = ({
  qty,
  cartId,
  refetchCart,
}: {
  qty: number;
  cartId: string;
  refetchCart: () => void;
}) => {
  const [quantity, setQuantity] = useState(qty);

  const handleChangeQuantity = (inc: number) => {
    setQuantity((p) => p + inc);
    fetcher(`/carts/${cartId}?quantity=${quantity + inc}`, "PUT")
      .then(() => {
        refetchCart();
      })
      .catch((err) => {});
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        size="icon"
        variant="ghost"
        disabled={quantity === 1}
        onClick={() => handleChangeQuantity(-1)}
      >
        <MinusCircle />
      </Button>
      <p className="text-lg">{quantity}</p>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => handleChangeQuantity(1)}
      >
        <PlusCircle />
      </Button>
    </div>
  );
};
