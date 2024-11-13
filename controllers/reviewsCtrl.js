import Product from "../model/Product.js";
import Review from "../model/Review.js";
import asyncHandler from "express-async-handler";

export const createReviewCtrl = asyncHandler(async (req, res) => {
    const {message, rating} = req.body;
    //1.find the product
     const { productId } = req.params;
     const productFound = await Product.findOne({productId}).populate("reviews");
     if (!productFound) {
        throw new Error("Product not found");
     }

     //check if the user already reviewd this product 
     const hasReviewed= productFound?.reviews.find((review) => {
  
        return review?.user?.toString() === req.userAuthId?.toString();
     });

     if (hasReviewed) {
            throw new Error("You have already reviewed this product");
     }
     //create review
     const review = await Review.create({
        message,
        rating,
        product : productFound?._id,
        user: req.userAuthId
     });
     
     //push review
     productFound.reviews.push(review?.id)
     //resave
     await productFound.save();

    res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});