import { Router } from "express";
import {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartCtrl";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { CartItemSchema } from "@repo/utils";

const cartRouter: Router = Router();

cartRouter.post(
  "/",
  authMiddleware,
  validateRequest(CartItemSchema, "body"),
  addCartItem
);
cartRouter.get(["/", "/myCart"], authMiddleware, getCartItems);
cartRouter.put("/:cartItemId", authMiddleware, updateCartItem);
cartRouter.delete("/:cartItemId", authMiddleware, deleteCartItem);

export { cartRouter };
