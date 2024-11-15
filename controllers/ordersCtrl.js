import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js"
import Stripe from "stripe";

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async (req, res) => {
     //get the payload(customer, orderItems, shippingAddress, totalPrice)
     const {orderItems, shippingAddress, totalPrice} = req.body;
    //find the user
    const user = await User.findById(req.userAuthId);
    //Check if user have shipping address
    if(!user?.hasShippingAddress) {
        throw new Error("Please provide shipping address");
    }
    //Check if order is not empty
    if (orderItems?.length <= 0) {
        throw new Error("No Order Items");
    }
    //Place/create order -- save db

    const order = await Order.create({
        user: user?._id,
        orderItems,
        shippingAddress,
        totalPrice
    })
    //push order into user
    user.orders.push(order?._id);
    await user.save();
    //update the productQty
    const products = await Product.find({_id: {$in:orderItems}});

    orderItems?.map(async (order) => {
        const product = products?.find((product) => {
            return product?._id?.toString() === order?._id?.toString();
        });

        if (product) {
            product.totalSold += order.qty
        }
        await product.save();
    }); 

    //make payment
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "T-shirt",
                        description: "what a good T-shirt",
                    },
                    unit_amount: 95 * 100,
                },
                quantity: 2,
            }
        ],
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    
    res.send({url: session.url});
    
    //payment webhook
    //update the user order
    // res.json({
    //     success: true,
    //     message: "Order created",
    //     order,
    //     user
    // });

}) ; 