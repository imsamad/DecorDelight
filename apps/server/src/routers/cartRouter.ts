import { Router } from "express";
import {
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cartCtrl";
import { requireAuth } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { CartItemSchema } from "@repo/utils";

const cartRouter: Router = Router();

cartRouter.post(
  "/",
  requireAuth,
  validateRequest(CartItemSchema, "body"),
  addCartItem,
);

cartRouter.get(["/", "/myCart"], requireAuth, getCartItems);
cartRouter.put("/:cartItemId", requireAuth, updateCartItem);
cartRouter.delete("/:cartItemId", requireAuth, deleteCartItem);

export { cartRouter };
