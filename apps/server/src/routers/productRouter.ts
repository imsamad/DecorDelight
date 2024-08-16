import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { ObjectIdParamSchema, ProductSchema } from "@repo/utils";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getSingleProduct,
  getProducts,
  publishProduct,
} from "../controllers/productCtrl";
import { EProductStatus } from "@repo/db";

const productRouter: Router = Router();

productRouter.get("/my", authMiddleware, getMyProducts);

productRouter
  .route("/")
  .post(authMiddleware, validateRequest(ProductSchema, "body"), createProduct)
  .get(getProducts);

productRouter
  .route("/:productId")
  .put(
    authMiddleware,
    validateRequest(ObjectIdParamSchema("productId"), "params"),
    validateRequest(ProductSchema, "body"),
    updateProduct
  )
  .delete(
    authMiddleware,
    validateRequest(ObjectIdParamSchema("productId"), "params"),
    deleteProduct
  )
  .get(getSingleProduct);

productRouter
  .route("/publised/:productId")
  .put(
    authMiddleware,
    validateRequest(ObjectIdParamSchema("productId"), "params"),
    publishProduct(EProductStatus.PUBLISHED)
  );

productRouter
  .route("/unpublised/:productId")
  .put(
    authMiddleware,
    validateRequest(ObjectIdParamSchema("productId"), "params"),
    publishProduct(EProductStatus.DRAFT)
  );

export { productRouter };
