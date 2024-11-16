import express from "express";
import { createCouponCtrl, getAllCouponsCtrl, getCouponCtrl ,updateCouponCtrl, deleteCouponCtrl } from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const couponsRoute = express.Router();

couponsRoute.post('/', isLoggedIn, createCouponCtrl);
couponsRoute.get('/', isLoggedIn, getAllCouponsCtrl);
couponsRoute.get('/:id', isLoggedIn, getCouponCtrl);
couponsRoute.put('/update/:id', isLoggedIn, updateCouponCtrl);
couponsRoute.delete('/delete/:id', isLoggedIn, deleteCouponCtrl);

export default couponsRoute;