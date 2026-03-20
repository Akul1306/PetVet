import express from "express";
import Pet from "../models/petModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const app = express();

export const getAllPets = catchAsync(async (req, res, next) => {
  const pets = await Pet.find();
  if (!pets || pets.length === 0) {
    return next(new AppError("No pets found", 404));
  }

  res.status(200).json({
    status: "success",
    result: pets.length,
    data: pets,
  });
});

export const addPet = catchAsync(async (req, res, next) => {
  if (!req.body.species) {
    return next(new AppError("Species is required", 400));
  }

  const pet = await Pet.create(req.body);

  res.status(201).json({
    status: "success",
    data: pet,
  });
});
