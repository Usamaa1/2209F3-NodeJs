import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required."],
    minlength: [3, "Product name must be at least 3 characters long."],
  },
  description: {
    type: String,
    required: [true, "Product description is required."],
  },
  price: {
    type: Number,
    required: [true, "Product price is required."],
    min: [0, "Price cannot be negative."],
  },
  category: {
    type: String,
    required: [true, "Product category is required."],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category ID is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
