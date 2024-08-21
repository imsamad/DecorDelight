import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { ObjectIdParamSchema, OrderSchema } from "@repo/utils";
import {
  addAddressToOrder,
  changeQuantityOfOrderItem,
  changeStatusOfOrder,
  createOrder,
  getAllOrders,
  getSingleOrder,
  getStripePaymentUrl,
  removeOrderItem,
  setPaymentMode,
} from "../controllers/orderCtrl";
import { requireAdmin, requireAuth } from "../middleware/authMiddleware";

const orderRouter: Router = Router();

// all my orders as well as single by id by passing orderId in query
orderRouter.get(["/", "/myorders"], requireAuth, getAllOrders);

orderRouter.put(
  "/change_status/:orderId/:status",
  requireAdmin,
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  changeStatusOfOrder,
);

orderRouter.get(
  "/:orderId",
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  requireAuth,
  getSingleOrder,
);

// create order
orderRouter.post(
  "/",
  requireAuth,
  validateRequest(OrderSchema, "body"),
  createOrder,
);

orderRouter.put(
  "/getStripePaymentUrl/:orderId",
  (a, b, c) => {
    console.log("objectobjectobjectobjectobjectobject");
    c();
  },
  requireAuth,
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  getStripePaymentUrl,
);

orderRouter.put(
  "/addAddress/:orderId/:addressId",
  requireAuth,
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  validateRequest(ObjectIdParamSchema("addressId"), "params"),
  addAddressToOrder,
);

orderRouter.put(
  "/setPaymentMode/:orderId",
  requireAuth,
  validateRequest(ObjectIdParamSchema("orderId"), "params"),
  setPaymentMode,
);

// pass quantity in query like /:orderId?quantity=10
orderRouter.put(
  "/:orderItemId",
  requireAuth,
  validateRequest(ObjectIdParamSchema("orderItemId"), "params"),
  changeQuantityOfOrderItem,
);

orderRouter.delete(
  "/:orderItemId",
  requireAuth,
  validateRequest(ObjectIdParamSchema("orderItemId"), "params"),
  removeOrderItem,
);

export { orderRouter };
