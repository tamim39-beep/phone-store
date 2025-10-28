import * as ProductService from "../service/productServices.js";

export const getAllProductsHandler = async (req, res, next) => {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdHandler = async (req, res, next) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    next(error);
  }
};

export const createProductHandler = async (req, res, next) => {
  try {
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json({ status: "success", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const updateProductHandler = async (req, res, next) => {
  try {
    const updatedProduct = await ProductService.updateProduct(
      req.params.id,
      req.body
    );
    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler = async (req, res, next) => {
  try {
    const result = await ProductService.deleteProduct(req.params.id);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};
