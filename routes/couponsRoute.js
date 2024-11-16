import express from "express";
import { createCouponCtrl, getAllCouponsCtrl, getCouponCtrl ,updateCouponCtrl, deleteCouponCtrl } from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const couponsRoute = express.Router();

couponsRoute.post('/', isLoggedIn, isAdmin, createCouponCtrl);
couponsRoute.get('/', getAllCouponsCtrl);
couponsRoute.get('/:id', getCouponCtrl);
couponsRoute.put('/update/:id', isLoggedIn, isAdmin, updateCouponCtrl);
couponsRoute.delete('/delete/:id', isLoggedIn, isAdmin, deleteCouponCtrl);

export default couponsRoute;