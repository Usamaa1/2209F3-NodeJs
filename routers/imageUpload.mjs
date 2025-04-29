import express from 'express';
import { upload } from './cloudinaryConfig.mjs';
const imageRouter = express.Router();



// Single image upload
imageRouter.post('/uploadImage', upload.single('image'), (req, res) => {
  res.json({
    success: true,
    imageUrl: req.file.path // Cloudinary URL
  });
});

// // Multiple images upload (max 5)
// imageRouter.post('/upload-multiple', upload.array('images', 5), (req, res) => {
//   const urls = req.files.map(file => file.path);
//   res.json({ urls });
// });

export default imageRouter;