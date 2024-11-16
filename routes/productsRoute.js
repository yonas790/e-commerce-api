import express from "express";
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/multerConfig.js";
import isAdmin from "../middlewares/isAdmin.js"
const productRouter = express.Router();

productRouter.post("/", isLoggedIn, isAdmin, upload.array("images") ,createProductCtrl);
productRouter.get("/", getProductsCtrl);
productRouter.get("/:id", getProductCtrl);
productRouter.put("/:id", isLoggedIn, isAdmin, updateProductCtrl);
productRouter.delete("/:id/delete",isAdmin, isLoggedIn, deleteProductCtrl);

export default productRouter;