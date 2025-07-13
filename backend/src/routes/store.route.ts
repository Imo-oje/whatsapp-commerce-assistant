import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  createStore,
  updateStore,
  getCatalog,
} from "../controllers/storeController";
import { authenticate } from "../middleware/authenticate";

const storeRouter = Router();
storeRouter.get("/:storeId/products", getCatalog);
storeRouter.post("/create", authenticate, createStore);
storeRouter.patch("/update", authenticate, updateStore);

//product actions performed by store owners

storeRouter.post("/product", authenticate, createProduct);
storeRouter.get("/products", authenticate, getAllProducts); // Fetch all products of the current user’s store
storeRouter.get("/product/:productId", authenticate, getSingleProduct);
storeRouter.patch("/product/:productId", authenticate, updateProduct);
storeRouter.delete("/product/:productId", authenticate, deleteProduct);

export default storeRouter;
