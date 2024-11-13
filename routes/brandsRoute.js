import express from "express";
import { createBrandCtrl,deleteBrandCtrl, updateBrandCtrl, getSingleBrandsCtrl, getAllBrandsCtrl } from "../controllers/brandsCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js"

const brandsRoute = express.Router();

brandsRoute.post("/", isLoggedIn, createBrandCtrl);
brandsRoute.get("/", isLoggedIn, getAllBrandsCtrl);
brandsRoute.get("/:id", isLoggedIn, getSingleBrandsCtrl);
brandsRoute.put("/:id", isLoggedIn, updateBrandCtrl);
brandsRoute.delete("/:id", isLoggedIn, deleteBrandCtrl);

export default brandsRoute;