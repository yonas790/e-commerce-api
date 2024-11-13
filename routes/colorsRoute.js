import express from "express";
import { createColorCtrl,deleteColorCtrl, updateColorCtrl, getSingleColorCtrl, getAllColorsCtrl } from "../controllers/colorsCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js"

const colorsRoute = express.Router();

colorsRoute.post("/", isLoggedIn, createColorCtrl);
colorsRoute.get("/", isLoggedIn, getAllColorsCtrl);
colorsRoute.get("/:id", isLoggedIn, getSingleColorCtrl);
colorsRoute.put("/:id", isLoggedIn, updateColorCtrl);
colorsRoute.delete("/:id", isLoggedIn, deleteColorCtrl);

export default colorsRoute;