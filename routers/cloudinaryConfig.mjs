import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: "dwabmkhhu",
  api_key: 778847721561175,
  api_secret: "TgwauOl3XQsXNnW_2vlb8_A_Qds"
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'my_uploads', // Optional folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }] // Auto-resize
  }
});

export const upload = multer({ storage });