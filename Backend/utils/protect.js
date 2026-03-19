// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";
// import config from "../config.js";

// export const protect = async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: "You are not logged in!" });
//   }

//   const decoded = jwt.verify(token, config.JWT_SECRET);

//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return res.status(401).json({ message: "The user no longer exists." });
//   }

//   req.user = currentUser; // attach logged-in user to request
//   next();
// };

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import config from "../config.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Get token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in!", 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, config.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }

  // 4) Check if user changed password after token was issued
  if (
    currentUser.passwordChangedAt &&
    currentUser.passwordChangedAt.getTime() / 1000 > decoded.iat
  ) {
    return next(
      new AppError("User recently changed password. Please log in again.", 401),
    );
  }

  // 5) Grant access
  req.user = currentUser;
  next();
});
