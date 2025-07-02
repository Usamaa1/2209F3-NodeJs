import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required."],
    unique: true,
    minlength: [2, "Category name must be at least 2 characters long."],
  },
});

export default mongoose.model("Category", categorySchema);
