import express from "express";
import { createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl } from "../controllers/categoriesCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js"

const categoriesRouter = express.Router();

categoriesRouter.post("/", isLoggedIn, createCategoryCtrl);
categoriesRouter.get("/", isLoggedIn, getAllCategoriesCtrl);
categoriesRouter.get("/:id", isLoggedIn, getSingleCategoryCtrl);
categoriesRouter.put("/:id", isLoggedIn, updateCategoryCtrl);
categoriesRouter.delete("/:id", isLoggedIn, deleteCategoryCtrl);

export default categoriesRouter;