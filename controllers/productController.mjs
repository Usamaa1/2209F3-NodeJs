import Product from '../models/Product.mjs'


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, categoryId } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      categoryId,
    });

    await product.save();
    res.status(201).send(product);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).send({ error: messages });
    }
    if (err.code === 11000) {
      return res.status(400).send({ error: "Duplicate value exists" });
    }
    res.status(500).send({ error: "Server error" });
  }
};





// Filter Products
export const filterProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};

// Search Products
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};

// Sort Products
export const sortProducts = async (req, res) => {
  try {
    const { sort, order } = req.query;
    const sortOptions = {
      price: order === "asc" ? 1 : -1,
      createdAt: order === "asc" ? 1 : -1,
      averageRating: order === "asc" ? 1 : -1,
    };

    const products = await Product.find().sort({ [sort]: sortOptions[sort] });
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};

// Products with Category
export const productsWithCategory = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId");
    res.send(products);
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
};
