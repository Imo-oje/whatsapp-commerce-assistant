import { Router } from "express";
import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:productId", getSingleProduct);

export default productRouter;
