import Stripe from 'stripe';

import { Request, Response } from 'express';
import { EPaymentMode, EUserRole, prismaClient } from '@repo/db';
import { CustomResponseError } from '@repo/utils';
require('dotenv').config({
  path: `${process.cwd()}/.env`,
});

export const createOrder = async (req: Request, res: Response) => {
  const cartItems = req.body.order;
  const userId = req.user?.id!;

  let cartQtyMapping: any = {};
  let cartItemIds: any = [];

  req.body.order.forEach(({ cartItemId, quantity }: any) => {
    cartItemIds.push(cartItemId);
    cartQtyMapping[cartItemId] = quantity;
  });

  const carts = await prismaClient.cartItem.findMany({
    where: {
      id: { in: cartItemIds },
      product: { status: 'PUBLISHED' },
    },
    include: {
      product: {
        select: {
          quantityInStock: true,
          price: true,
          title: true,
        },
      },
    },
  });

  if (
    carts.length == 0 ||
    carts.length != cartItems.length ||
    carts.find((c: any) => c.userId != userId)
  )
    throw new CustomResponseError(404, {
      message: 'Record does not exist',
    });

  let orderItems: any = [];
  let updatedCart: any = [];
  let deletedCart: any = [];
  let productQuantityUpdate: any = [];

  carts.forEach((cart: any) => {
    let crtItemQty = cartQtyMapping[cart.id];

    if (!crtItemQty)
      throw new CustomResponseError(404, {
        message: 'Record (Cart Item) does not exist',
      });

    let filledQty = Math.min(crtItemQty, cart.product.quantityInStock);

    if (filledQty == 0)
      throw new CustomResponseError(404, {
        message: `Product: ${cart.product.title} is out of stock`,
      });

    orderItems.push({
      productsId: cart.productId,
      priceAtThatTime: cart.product.price,
      quantity: filledQty,
    });

    productQuantityUpdate.push({
      where: { id: cart.productId },
      data: {
        quantityInStock: cart.product.quantityInStock - filledQty,
      },
    });

    if (cart.quantity - filledQty <= 0) {
      deletedCart.push(cart.id);
    } else {
      updatedCart.push({
        where: { id: cart.id },
        data: {
          quantity: cart.quantity - filledQty,
        },
      });
    }
  });

  const order = await prismaClient.$transaction(async (txn) => {
    try {
      await Promise.all(
        productQuantityUpdate.map((p: any) => txn.product.update(p))
      );
      if (deletedCart.length)
        await txn.cartItem.deleteMany({
          where: { id: { in: deletedCart } },
        });

      await Promise.all(updatedCart.map((c: any) => txn.cartItem.update(c)));
      const itemsPrice: number = orderItems.reduce(
        (acc: number, red: any) =>
          acc + red.priceAtThatTime.amount * red.quantity,
        0
      );

      let taxPrice = 0;
      let shippingPrice = 0;
      let totalAmount: number = itemsPrice + shippingPrice + taxPrice;

      const order = await txn.order.create({
        data: {
          items: {
            create: orderItems,
          },
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalAmount,
          userId,
        },
        include: {
          items: true,
        },
      });

      return order;
    } catch (error) {
      throw error;
    }
  });

  res.json({
    order,
  });
};

export const removeOrderItem = async (req: Request, res: Response) => {
  const userId = req.user?.id! as string;

  await prismaClient.$transaction(async (txn) => {
    try {
      const orderItem = await txn.orderItem.findFirst({
        where: {
          id: req.params.orderItemId,
        },
        include: {
          product: true,
          order: true,
        },
      });

      if (!orderItem || orderItem.order.userId != userId)
        throw new CustomResponseError(404, {
          message: 'Record not found',
        });

      const order = orderItem.order;

      const itemCost = orderItem.priceAtThatTime.amount * orderItem.quantity;
      await txn.order.update({
        where: { id: orderItem?.id },
        data: {
          itemsPrice: order.itemsPrice - itemCost,
          totalAmount: order.totalAmount - itemCost,
        },
      });

      await txn.product.update({
        where: { id: orderItem.productsId },
        data: {
          quantityInStock: {
            increment: orderItem.quantity,
          },
        },
      });

      await txn.orderItem.delete({
        where: { id: orderItem.id },
      });
    } catch (error) {
      throw error;
    }
  });

  res.json({
    message: 'Removed',
  });
};

export const changeQuantityOfOrderItem = async (
  req: Request,
  res: Response
) => {
  const userId = req.user?.id! as string;
  const newQty = Number(req.query.quantity);
  if (newQty == 0) return removeOrderItem(req, res);
  if (isNaN(newQty))
    throw new CustomResponseError(404, {
      message: 'Quantity must be in valid numeric type',
    });

  await prismaClient.$transaction(async (txn) => {
    try {
      const orderItem = await txn.orderItem.findFirst({
        where: {
          id: req.params.orderItemId,
        },
        include: {
          product: true,
          order: true,
        },
      });

      if (!orderItem || orderItem.order.userId != userId)
        throw new CustomResponseError(404, {
          message: 'Record not found',
        });

      const qtyDelta = orderItem.quantity - newQty;

      const order = orderItem.order;

      const itemCost = orderItem.priceAtThatTime.amount * qtyDelta;

      await txn.order.update({
        where: { id: orderItem?.id },
        data: {
          itemsPrice: order.itemsPrice + itemCost,
          totalAmount: order.totalAmount + itemCost,
        },
      });

      await txn.product.update({
        where: { id: orderItem.productsId },
        data: {
          quantityInStock: {
            increment: qtyDelta,
          },
        },
      });

      await txn.orderItem.update({
        where: { id: orderItem.id },
        data: {
          quantity: {
            increment: qtyDelta,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  });

  res.json({
    message: 'Changed!',
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const where: any = {};

  if (req.user?.role != EUserRole.ADMIN) {
    where.userId = req.user?.id;
  }
  if (req.query.orderId) where.id = req.query.id;

  return res.json({
    orders: await prismaClient.order.findMany({
      where,
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
  });
};

export const getSingleOrder = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.orderId,
  };

  if (req.user?.role != EUserRole.ADMIN) {
    where.userId = req.user?.id;
  }

  return res.json({
    order: await prismaClient.order.findFirst({
      where,
      include: {
        address: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    }),
  });
};

export const addAddressToOrder = async (req: Request, res: Response) => {
  const addressId = req.params.addressId,
    orderId = req.params.orderId,
    userId = req.user?.id;

  if (
    !(await prismaClient.address.findFirst({
      where: { id: addressId, userId },
    })) ||
    !(await prismaClient.order.findFirst({
      where: { id: orderId, userId },
    }))
  )
    throw new CustomResponseError(404, {
      message: 'Record not found',
    });

  res.json({
    order: await prismaClient.order.update({
      where: { id: orderId },
      data: {
        address: { connect: { id: addressId } },
      },
    }),
  });
};

export const setPaymentMode = async (req: Request, res: Response) => {
  const addressId = req.params.addressId,
    orderId = req.params.orderId,
    userId = req.user?.id,
    mode = req.query.paymentMode;

  if (mode != EPaymentMode.COD && mode != EPaymentMode.ONLINE)
    throw new CustomResponseError(404, {
      message: 'Record not found',
    });

  if (
    !(await prismaClient.order.findFirst({
      where: { id: orderId, userId },
    }))
  )
    throw new CustomResponseError(404, {
      message: 'Record not found',
    });

  res.json({
    order: await prismaClient.order.update({
      where: { id: orderId },
      data: {
        paymentMode: mode,
      },
    }),
  });
};

const stripeRef = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getStripePaymentUrl = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const userId = req.user?.id;

  const order = await prismaClient.order.findFirst({
    where: { userId, id: orderId },
    include: {
      items: {
        select: {
          product: true,
          quantity: true,
        },
      },
    },
  });

  if (!order)
    throw new CustomResponseError(404, {
      message: 'Record does not exist',
    });

  const session = await stripeRef.checkout.sessions.create({
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'IN', 'BN'],
    },

    success_url: `${process.env.STRIPE_CALLBACK_BASE_URL}/me/orders/${orderId}/stripepayment_success_cb`,
    cancel_url: `${process.env.STRIPE_CALLBACK_BASE_URL}/me/orders/${orderId}/stripepayment_cancel_cb`,

    line_items: order.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: item.product.price.currency,
        unit_amount: item.product.price.amount,
        product_data: {
          name: item.product.title,
        },
      },
    })),
  });

  await prismaClient.order.update({
    where: { id: order.id },
    data: {
      stripeSessionId: session.id,
      paidJson: { session: JSON.parse(JSON.stringify(session)) },
      paymentMode: 'ONLINE',
    },
  });

  res.json({
    url: session.url,
  });
};
