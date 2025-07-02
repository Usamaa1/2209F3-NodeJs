import mongoose from "mongoose";

mongoose.Schema.Types.Number.cast(false);

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Post title is required."],
    minlength: [3, "Post title must be at least 3 characters long."],
  },
  content: {
    type: String,
    required: [true, "Post content is required."],
  },
  likes: {
    type: Number,
    // required: [true, "Likes is required"],
    // validate: {
    //   validator: (v)=> typeof v === "number" && !isNaN(v),
    //   message: "Likes must be a valid number"
    // }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Post", postSchema);
