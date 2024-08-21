import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EPaymentMode, Order, OrderItem } from "@repo/db";
import Link from "next/link";

import React from "react";
import PayOnlineButton from "./PayOnlineButton";
import { ArrowBigRightDashIcon } from "lucide-react";
import { OrderStatusesColums } from "./OrderStatusesColums";

interface X extends Order {
  items: OrderItem[];
}

const OrdersList = async ({
  orders,
  isAdmin,
  userId,
}: {
  // required in case user is admin
  userId?: string;
  orders: X[];
  isAdmin: boolean;
}) => {
  return (
    <Card className="overflow-x-auto mx-auto">
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead>ID</TableHead>
              <TableHead>Total Items</TableHead>
              <TableHead>Shipping Price</TableHead>
              <TableHead>Tax Price</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Placed At</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin ? <TableHead>Actions</TableHead> : null}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50">
                <TableCell className="underline text-blue-600">
                  <Link href={`/me/orders/${order.id}`}>{order.id}</Link>
                </TableCell>

                <TableCell className="font-medium">
                  {order.items.length}
                </TableCell>
                <TableCell className="font-medium">
                  {order.shippingPrice}
                </TableCell>

                <TableCell className="font-medium">{order.taxPrice}</TableCell>
                <TableCell className="font-medium">
                  {order.totalAmount}
                </TableCell>
                <TableCell className="font-medium">
                  {!order.paymentMode ? (
                    <div className="flex items-center justify-center">
                      <Link href={`/me/orders/${order.id}`}>
                        <Button>
                          Complete it <ArrowBigRightDashIcon />
                        </Button>
                      </Link>
                    </div>
                  ) : order.paymentMode == EPaymentMode.COD ? (
                    "COD"
                  ) : order.paidAt ? (
                    "Paid"
                  ) : isAdmin && order.userId == userId ? (
                    "Not Paid"
                  ) : (
                    <PayOnlineButton label="Pay Now" orderId={order.id} />
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {new Date(order.createdAt).toDateString()}
                </TableCell>
                <OrderStatusesColums order={order} isAdmin={isAdmin} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersList;
