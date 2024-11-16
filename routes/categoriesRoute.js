import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js"
import upload from "../config/multerConfig.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, isAdmin, upload.single("image") ,createCategoryCtrl);
categoriesRouter.get("/", isLoggedIn, getAllCategoriesCtrl);
categoriesRouter.get("/:id", isLoggedIn, getSingleCategoryCtrl);
categoriesRouter.put("/:id", isLoggedIn, isAdmin, updateCategoryCtrl);
categoriesRouter.delete("/:id", isLoggedIn, isAdmin, deleteCategoryCtrl);

export default categoriesRouter;