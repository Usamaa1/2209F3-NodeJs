import express from "express";
import { client, database } from "../connection/connection.mjs";
const filterRouter = express.Router();

export default filterRouter.get("/products/filter", async (req, res) => {
  try {
    const Product = database.collection("products");


    // *********** SIMPLIFIED VERSION ***********
    // const { category, min = 0, max = 999999 } = req.query;

    // const filter = {
    //   category,
    //   price: { $gte: parseFloat(min), $lte: parseFloat(max) },
    // };

    const { category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = Product.find(filter);
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});
