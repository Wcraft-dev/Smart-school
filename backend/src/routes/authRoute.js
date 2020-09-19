const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const {
  validRegiester,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid.js");

//Load Controlers
const {
  registerControler,
  activationController,
  loginControler,
  forgetPassword,
  resetControler,
  getUserTesting,
  googleController
} = require("../controllers/auth.controler.js");

router.post(
  "/register",
  validRegiester,
  registerControler
);
router.post(
  "/login",
  validLogin,
  loginControler
);
router.post(
  "/forget",
  forgotPasswordValidator,
  forgetPassword
);
router.put(
  "/resetPassword",
  resetPasswordValidator,
  resetControler
);
router.post('/googlelogin',googleController)



router.post(
  "/users",
  getUserTesting
);
router.post("/activation", activationController);

module.exports = router;
