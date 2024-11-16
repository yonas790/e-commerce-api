import dotenv from "dotenv";
dotenv.config();
import Order from "../model/Order.js";
import Coupon from "../model/Coupon.js";
import asyncHandler from "express-async-handler";
import User from "../model/User.js";
import Product from "../model/Product.js"
import Stripe from "stripe";

//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrderCtrl = asyncHandler(async (req, res) => {
  //get cooupon
  const { coupon } = req?.query;
    const couponFound = await Coupon.findOne({ code: coupon?.toUpperCase() });
  if (couponFound?.isExpired) {
    throw new Error("Coupon has expired");
  }
  if (!couponFound) {
    throw new Error("coupon does not exists")
  }

  //get discount
  const discount = couponFound?.discount / 100;
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
        totalPrice : couponFound ? totalPrice - totalPrice * discount : totalPrice,
    });
  

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
      //convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
    const session = await stripe.checkout.sessions.create({
        line_items: convertedOrders,
        metadata: {
            orderId: JSON.stringify(order?._id)
        },
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });
    console.log(order)
    res.send({url: session.url}); 
    


}) ; 

export const getAllordersCtrl = asyncHandler(async (req, res) => {
  // find all orders
  const orders = await Order.find();
  res.json({
    success: true,
    message: "All orders",
    orders
  })
});

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
  //get the id from prams
  const id = req.params.id;
  const order = await Order.findById(id);

  //send response 
  res.status(200).json({
    success: true,
    message: "Single order",
    order
  })
});

export const updateOrderCtrl = asyncHandler(async (req, res) => {
  const id = req.params.id;

  //update
  const updatedOrder = await Order.findByIdAndUpdate(id, {
    status: req.body.status
  }, {
    new: true
  });

  res.status(200).json({
    suscess: true,
    message: "Order updated",
    updatedOrder
  })
});