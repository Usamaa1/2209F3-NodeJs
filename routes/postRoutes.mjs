import express from "express";
import { createPost, filterPostsByDate } from "../controllers/postController.mjs";

const router = express.Router();

router.post("/post/createPost", createPost);
router.get("/post/postDateFilter", filterPostsByDate);

export default router;
