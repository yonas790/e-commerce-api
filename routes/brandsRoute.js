import express from "express";
import { createBrandCtrl,deleteBrandCtrl, updateBrandCtrl, getSingleBrandsCtrl, getAllBrandsCtrl } from "../controllers/brandsCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const brandsRoute = express.Router();

brandsRoute.post("/", isLoggedIn, isAdmin, createBrandCtrl);
brandsRoute.get("/", isLoggedIn, getAllBrandsCtrl);
brandsRoute.get("/:id", isLoggedIn, getSingleBrandsCtrl);
brandsRoute.put("/:id", isLoggedIn, isAdmin, updateBrandCtrl);
brandsRoute.delete("/:id", isLoggedIn, isAdmin, deleteBrandCtrl);

export default brandsRoute;