import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl, updateShippingAddressCtr } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const usersRoute = express.Router();

usersRoute.post('/register', registerUserCtrl);
usersRoute.post('/login', loginUserCtrl);
usersRoute.get('/profile',isLoggedIn, getUserProfileCtrl);
usersRoute.put('/update/shipping',isLoggedIn, updateShippingAddressCtr);

export default usersRoute;
