import express from "express";
import {
  filterProducts,
  searchProducts,
  sortProducts,
  productsWithCategory,
  createProduct,
} from "../controllers/productController.mjs";

const router = express.Router();

router.post("/products/create", createProduct);
router.get("/products/filter", filterProducts);
router.get("/products/search", searchProducts);
router.get("/products/sort", sortProducts);
router.get("/productsWithCategory", productsWithCategory);

export default router;
