import express from "express";
import {
  getAllProductsHandler,
  getProductByIdHandler,
  addProductHandler,
  updateProductByIdHandler, // ✅ ini nama yang benar
  deleteProductByIdHandler,
} from "../handlers/productHandler.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProductsHandler);
productRouter.get("/products/:id", getProductByIdHandler);
productRouter.post("/products", addProductHandler);
productRouter.put("/products/:id", updateProductByIdHandler); // ✅ ganti di sini juga
productRouter.delete("/products/:id", deleteProductByIdHandler);

export default productRouter;
