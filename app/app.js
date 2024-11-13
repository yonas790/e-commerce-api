import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import dbConnect from '../config/db.Config.js';
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js';
import usersRoute from '../routes/usersRoute.js';
import productsRoute from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRoute.js';
import brandsRoute from '../routes/brandsRoute.js';
import colorsRoute from '../routes/colorsRoute.js';
import reviewsRoute from '../routes/reviewsRoute.js';
import ordersRoute from '../routes/ordersRoute.js';


dbConnect();
const app = express();

app.use(express.json());

//routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/products', productsRoute);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/brands', brandsRoute);
app.use('/api/v1/colors', colorsRoute);
app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/orders', ordersRoute);

//middlewares
app.use(notFound);
app.use(globalErrorHandler);

export default app;

