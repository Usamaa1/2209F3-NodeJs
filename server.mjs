import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";

const app = express();

mongoose.connect("mongodb://localhost:27017/mongooseDB")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use(express.json());

app.use("/", productRoutes);
app.use("/", postRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
