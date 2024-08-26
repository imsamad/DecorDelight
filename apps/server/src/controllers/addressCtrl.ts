import { ObjectIdFormatSchema } from '@repo/utils';
import { Request, Response } from 'express';
import { prismaClient } from '@repo/db';

export const createAddress = async (req: Request, res: Response) => {
  console.log('address: ', req.body);
  const addressData = {
    ...req.body,
    userId: req.user?.id,
  };
  const orderId = req.query.addToOrder;
  if (orderId && ObjectIdFormatSchema.safeParse(orderId).success)
    addressData.orders = { connect: { id: orderId } };

  const address = await prismaClient.address.create({
    data: addressData,
  });
  console.log('address: ', address);
  res.json({
    address,
  });
};

export const updateAddress = async (req: Request, res: Response) => {
  const addressData = {
    ...req.body,
    userId: req.user?.id,
  };
  const orderId = req.query.addToOrder;

  if (orderId && ObjectIdFormatSchema.safeParse(orderId).success)
    addressData.orders = { connect: { id: orderId } };

  res.json({
    address: await prismaClient.address.update({
      where: { userId: req.user?.id, id: req.params.addressId },
      data: addressData,
    }),
  });
};

export const deleteAddress = async (req: Request, res: Response) => {
  res.json({
    address: await prismaClient.address.delete({
      where: { userId: req.user?.id, id: req.params.addressId },
    }),
  });
};

export const getMyAddress = async (req: Request, res: Response) => {
  res.json({
    addresses: await prismaClient.address.findMany({
      where: { userId: req.user?.id },
    }),
  });
};

export const getSingleAddress = async (req: Request, res: Response) => {
  res.json({
    address: await prismaClient.address.findMany({
      where: { userId: req.user?.id, id: req.params.addressId },
    }),
  });
};
