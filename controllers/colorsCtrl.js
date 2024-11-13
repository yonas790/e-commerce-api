import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

export const createColorCtrl = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const colorFound = await Color.findOne({name});
    if (colorFound) {
        throw new Error("Brand already exists");
    }

    const color = await Color.create({
        name: name,
        user:req.userAuthId
    });

    res.json({
        status: "success",
        message: "Color created successfully",
        color
    });
});

export const getAllColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find();

    res.json({
        status: "success",
        message: "color fetched successfully",
        colors
    })
})

export const getSingleColorCtrl = asyncHandler(async (req, res) => {
    const color = await Color.findById(req.params.id);

    res.json({
        status: "success",
        message: "Color fetched successfully",
        color
    });
});

export const updateColorCtrl = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const product = await Color.findByIdAndUpdate(req.params.id, {
        name
    }, {
        new: true
    });

    res.json({
        status: "success",
        message: "Color updated successfully",
        product
    })
});

export const deleteColorCtrl = asyncHandler(async (req, res) => {
    const product = await Color.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Color deleted successfully"
    });
});
