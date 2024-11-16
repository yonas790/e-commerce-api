import express from "express";
import { createColorCtrl,deleteColorCtrl, updateColorCtrl, getSingleColorCtrl, getAllColorsCtrl } from "../controllers/colorsCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const colorsRoute = express.Router();

colorsRoute.post("/", isLoggedIn, isAdmin, createColorCtrl);
colorsRoute.get("/", isLoggedIn, getAllColorsCtrl);
colorsRoute.get("/:id", isLoggedIn, getSingleColorCtrl);
colorsRoute.put("/:id", isLoggedIn, isAdmin, updateColorCtrl);
colorsRoute.delete("/:id", isLoggedIn, isAdmin, deleteColorCtrl);

export default colorsRoute;