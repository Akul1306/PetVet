import express from "express";
import * as authController from "./../controllers/authController.js";
// import {
//   getAllUsers,
//   createUser,
//   getUser,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";
// import {  getLoggedInStudent } from "../controllers/studentController.js";
// import { protect } from "../utils/protect.js";
// import { restrictTo } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

export default router;
