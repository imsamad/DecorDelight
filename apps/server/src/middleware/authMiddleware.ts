import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomResponseError } from "@repo/utils";
import { EUserRole, prismaClient } from "@repo/db";
import { AUTH_COOKIE_NAME } from "../lib/const";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await attachUserToRequest(req, res);

  if (!req.user?.id)
    throw new CustomResponseError(404, {
      message: "not authorised",
    });

  next();
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await attachUserToRequest(req, res);
  if (req.user?.role != EUserRole.ADMIN)
    throw new CustomResponseError(404, {
      message: "not authorised, you are not admin!",
    });
  next();
};

export const attachUserToRequest = async (
  req: Request,
  _: Response,
  next?: NextFunction,
): Promise<Request | void> => {
  let authToken = req.cookies[AUTH_COOKIE_NAME];

  authToken = authToken ? authToken : req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    next && next();
    return;
  }

  const userJWT: any = jwt.verify(authToken, process.env.JWT_SECRET!);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userJWT.id,
      blockedAt: undefined,
      emailVerifiedAt: { not: null },
    },
  });

  if (!user) {
    next && next();
    return;
  }

  user.password = "";

  req.user = user;
  next && next();
};
