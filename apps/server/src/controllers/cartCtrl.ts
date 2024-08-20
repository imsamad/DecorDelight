import { prismaClient } from '@repo/db';
import { Request, Response } from 'express';

export const addCartItem = async (req: Request, res: Response) => {
  const cartExist = await prismaClient.cartItem.findFirst({
    where: { userId: req.user?.id!, productId: req.body.productId },
  });
  if (cartExist) {
    return res.json({
      cartItem: await prismaClient.cartItem.update({
        where: { id: cartExist.id },
        data: {
          quantity: cartExist.quantity + Number(req.body.quantity),
        },
      }),
    });
  }

  const data = {
    ...req.body,
    userId: req.user?.id!,
    quantity: Number(req.body.quantity),
  };

  res.json({
    cartItem: await prismaClient.cartItem.create({
      data,
    }),
  });
};

export const getCartItems = async (req: Request, res: Response) => {
  res.json({
    cartItems: await prismaClient.cartItem.findMany({
      where: { userId: req.user?.id! },
      include: {
        product: {
          select: {
            medias: true,
            title: true,
            id: true,
            quantityInStock: true,
            price: true,
            slug: true,
          },
        },
      },
    }),
  });
};

export const deleteCartItem = async (req: Request, res: Response) => {
  res.json({
    cartItems: await prismaClient.cartItem.delete({
      where: { id: req.params.cartItemId },
    }),
  });
};

export const updateCartItem = async (req: Request, res: Response) => {
  const quantity = Number(req.query.quantity);

  if (quantity == 0) {
    await prismaClient.cartItem.delete({
      where: { id: req.params.cartItemId },
    });
    res.json({ message: 'Deleted!' });
  } else {
    res.json({
      cartItems: await prismaClient.cartItem.update({
        where: { id: req.params.cartItemId },
        data: {
          quantity: Number(req.query.quantity),
        },
      }),
    });
  }
};
