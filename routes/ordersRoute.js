import express from "express";
import { createOrderCtrl, getAllordersCtrl, getOrderStatsCtrl, getSingleOrderCtrl, updateOrderCtrl } from "../controllers/ordersCtrl.js";
import {isLoggedIn} from "../middlewares/isLoggedIn.js";
const ordersRoute = express.Router();

ordersRoute.post("/", isLoggedIn, createOrderCtrl);
ordersRoute.get("/", isLoggedIn, getAllordersCtrl);
ordersRoute.get("/:id", isLoggedIn, getSingleOrderCtrl);
ordersRoute.put("/update/:id", isLoggedIn, updateOrderCtrl);
ordersRoute.get("/sales/stats", isLoggedIn, getOrderStatsCtrl);

export default ordersRoute;