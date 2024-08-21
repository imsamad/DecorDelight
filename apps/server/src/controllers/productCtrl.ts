import { prismaClient, EProductStatus } from "@repo/db";
import { Request, Response } from "express";
import { generateOTP } from "@repo/utils";
import slugify from "slugify";

export const createProduct = async (req: Request, res: Response) => {
  res.json({
    product: await prismaClient.product.create({
      data: {
        ...req.body,
        slug: slugify(`${req.body.title}_${generateOTP(8)}`),
        userId: req.user?.id!,
      },
    }),
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
  };

  const { userId, slug, ...rest } = req.body;

  res.json({
    product: await prismaClient.product.update({
      where,
      data: rest,
    }),
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
    userId: req.user?.id!,
  };

  res.json({
    product: await prismaClient.product.delete({
      where,
    }),
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
    status: EProductStatus.PUBLISHED,
  };

  res.json({
    product: await prismaClient.product.findFirst({
      where,
    }),
  });
};

export const getProducts = async (req: Request, res: Response) => {
  res.json({
    product: await prismaClient.product.findMany({
      where: {
        status: EProductStatus.PUBLISHED,
      },
    }),
  });
};

export const getMyProducts = async (req: Request, res: Response) => {
  const where: any = {
    id: req.params.productId,
  };

  res.json({
    product: await prismaClient.product.findMany({
      where,
      select: {
        id: true,
      },
    }),
  });
};

export const publishProduct =
  (status: EProductStatus) => async (req: Request, res: Response) => {
    const where: any = {
      id: req.params.productId,
      status:
        status == "DRAFT" ? EProductStatus.PUBLISHED : EProductStatus.DRAFT,
    };

    res.json({
      product: await prismaClient.product.update({
        where,
        data: {
          status,
        },
      }),
    });
  };
