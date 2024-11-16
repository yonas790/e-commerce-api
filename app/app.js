import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import dbConnect from '../config/db.Config.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import Stripe from "stripe";
import usersRoute from '../routes/usersRoute.js';
import productsRoute from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRoute.js';
import brandsRoute from '../routes/brandsRoute.js';
import colorsRoute from '../routes/colorsRoute.js';
import reviewsRoute from '../routes/reviewsRoute.js';
import ordersRoute from '../routes/ordersRoute.js';
import Order from "../model/Order.js"
import couponsRoute from '../routes/couponsRoute.js';


dbConnect();
const app = express();

//Stripe webhook
//stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);
const endpointSecret = process.env.ENDPOINT_SECRET_KEY;

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
if (event.type === 'checkout.session.completed') {
    // update the order
    const session = event.data.object; // the response of webhood
    const {orderId} = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
   // find the order and update the status
    const order = await Order.findByIdAndUpdate(JSON.parse(orderId), {
        totalPrice: totalAmount / 100,
        currency,
        paymentStatus,
        paymentMethod,
    
    }, {
        new: true
    });

    
} else {
    return false
}

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

app.use(express.json());

//routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/brands', brandsRoute);
app.use('/api/v1/colors', colorsRoute);
app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/coupons', couponsRoute);



//middlewares
app.use(notFound);
app.use(globalErrorHandler);

export default app;

