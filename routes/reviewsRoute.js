import express from "express";
import { createReviewCtrl } from "../controllers/reviewsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewsRoute = express.Router();

reviewsRoute.post('/:productID',isLoggedIn, createReviewCtrl)



export default reviewsRoute;