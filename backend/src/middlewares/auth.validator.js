import { check } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/auth.model";

export const singUp = [
  check("name", "Name is required")
    .not()
    .isEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 4 to 32 characters"),
  check("email").not().isEmpty().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password msut contain a number"),
];
export const singIn = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
];
export const forgotPassword = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
export const resetPassword = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({
      min: 6,
    })
    .withMessage("Password must be at least 6 characters long"),
];
export const accessByToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) throw "No token provided" + req.headers["x-access-token"]+ req;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) throw "no user found";
    next();
  } catch (error) {
    return res
      .status(403)
      .json({
        error: error ? (error.name ? "unauthorized" : error) : "unauthorized",
      });
  }
};
///implementa la validacion de el rol especifico
