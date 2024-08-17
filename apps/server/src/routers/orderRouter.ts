import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { ObjectIdParamSchema, OrderSchema } from "@repo/utils";
import {
  addAddressToOrder,
  changeQuantityOfOrderItem,
  createOrder,
  getAllOrders,
  removeOrderItem,
} from "../controllers/orderCtrl";
import { authMiddleware } from "../middleware/authMiddleware";

const orderRouter: Router = Router();

// all my orders as well as single by id by passing orderId in query
orderRouter.get(["/", "/myorders"], authMiddleware, getAllOrders);

// create order
orderRouter.post(
  "/",
  authMiddleware,
  validateRequest(OrderSchema, "body"),
  createOrder
);

// pass quantity in query like /:orderId?quantity=10
orderRouter.put(
  "/:orderItemId",
  authMiddleware,
  validateRequest(ObjectIdParamSchema("orderItemId"), "params"),
  changeQuantityOfOrderItem
);

orderRouter.delete(
  "/:orderItemId",
  authMiddleware,
  validateRequest(ObjectIdParamSchema("orderItemId"), "params"),
  removeOrderItem
);

orderRouter.delete(
  "/addAddress/:orderId/:addressId",
  authMiddleware,
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  validateRequest(ObjectIdParamSchema("addressId"), "params"),
  addAddressToOrder
);

export { orderRouter };
