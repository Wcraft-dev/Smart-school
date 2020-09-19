//validatios helpers
const { check } = require("express-validator");

exports.validRegiester = [
  check("name", "Name is required").not()
    .isEmpty()
    .isLength({
      min: 4,
      max: 32,
    })
    .withMessage("name must be between 4 to 32 characters"),
  check("username","Username").not().isEmpty().withMessage("Username is required"),
  check("email").not().isEmpty().withMessage("Must be a valid email address"),
  check("password", "password is required").notEmpty(),
  check("password")
    .isLength({
      min: 6,
    })
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password msut contain a number")
];
exports.validLogin = [
  check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
];
exports.forgotPasswordValidator = [
  check("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({
        min:6
    })
    .withMessage("Password must be at least 6 characters long"),
];
