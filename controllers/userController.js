import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";



export const registerUserCtrl = asyncHandler(async (req, res) => {
   const {fullname, email, password} = req.body;
   const userExists =  await User.findOne({email});
   if (userExists) {
     throw new Error("User already exists")
   }

   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt);

   const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword
   })

   res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: newUser
   })
});

export const loginUserCtrl = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const userFound = await User.findOne({email});

    if (userFound && await bcrypt.compare(password, userFound?.password)) {
        return res.json({
            status: "success",
            message: "logged in successfully",
            userFound,
            token: generateToken(userFound?._id)
        })
    } else {
        throw new Error('Invalid login credentials');
    }
});

export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    //find user
    const user = await User.findById(req.userAuthId).populate("orders");

    res.status(200).json({
        status: "success",
        message: "User profile fetched successfully",
        user
    })

});

export const updateShippingAddressCtr = asyncHandler(async (req, res) => {
    const {firsName, lastName, address, city, postalCode, province, phone} = req.body;

    const user = await User.findByIdAndUpdate(req.userAuthId, {
        shippingAddress: {
            firsName,
            lastName,
            address,
            city,
            postalCode,
            province,
            phone
        },
        hasShippingAddress: true
    }, {
        new: true
    });

    res.json({
        status: "success",
        message: "User shipping address updated successfully",
        user
    })
});