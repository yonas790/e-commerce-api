import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Ecommerce-api", // Folder name in your Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Acceptable file formats
  },
});

const upload = multer({ storage });

export default upload;
