import express from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProductsHandler);
router.get("/products/:id", getProductByIdHandler);
router.post("/products", createProductHandler);
router.put("/products/:id", updateProductHandler);
router.delete("/products/:id", deleteProductHandler);

export default router;
