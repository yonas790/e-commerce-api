import express from "express";
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productRouter = express.Router();

productRouter.post("/", isLoggedIn, createProductCtrl);
productRouter.get("/", getProductsCtrl);
productRouter.get("/:id", getProductCtrl);
productRouter.put("/:id", isLoggedIn, updateProductCtrl);
productRouter.delete("/:id/delete", isLoggedIn, deleteProductCtrl);

export default productRouter;