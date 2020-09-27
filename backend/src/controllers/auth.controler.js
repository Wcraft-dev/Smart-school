import User from "../models/auth.model";
import Role from "../models/role.model";
import { OAuth2Client } from "google-auth-library";
import { validationResult } from "express-validator";
import { errorHandler } from "../libs/dbErrorHandling";
import _ from "lodash";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import "../config/config";
import fetch from "node-fetch";
import experssJwt from "express-jwt";

sgMail.setApiKey(process.env.MAIL_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

export const singUpControler = async (req, res) => {
  const { name, email, username, password } = req.body;
  const errors = validationResult(req);
  //validation to req.body
  if (!errors.isEmpty()) {
    let getError = [];
    errors.array().map((errors) => {
      getError.push(errors.msg);
    });
    return res.status(422).json({
      error: getError,
    });
  } else {
    try {
      const user = await User.findOne({ email });
      //If user exist
      if (user) {
        return res.status(400).json({
          error: "Email is taken",
        });
      }
    } catch (error) {
      if (error) {
        return res.status(400).json({
          error: "Try again please",
        });
      }
    }
    //Generate token
    const token = jwt.sign(
      {
        name,
        email,
        username,
        password,
      },
      process.env.JWT_SECRET_ACTIVATION,
      {
        expiresIn: "15m",
      }
    );
    //Email data sending
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account activation",
      html: `
                <h1>Please click to link to activate</h1>
                <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
                <hr/>
                <p>This email contain sensitve info</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };
    try {
      const sent = await sgMail.send(emailData);
      return res.json({
        message: "Email has been sent to " + email,
      });
    } catch (errox) {
      return res.status(400).json({
        error: errorHandler(errox),
      });
    }
  }
};
//Activation and save to database
export const activationController = async (req, res) => {
  const { token } = req.body;
  if (token) {
    //verify the token is valid or not or expired
    try {
      jwt.verify(token, process.env.JWT_SECRET_ACTIVATION);
      const { name, username, email, password, roles } = jwt.decode(token);
      try {
        const newUser = new User({
          name,
          lastName: "apelli",
          username,
          email,
          password: await User.encryptPassword(password),
        });

        if (roles) {
          try {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((role) => role._id);
          } catch (error) {
            res.status(400).json({
              error: [error],
            });
          }
        } else {
          try {
            const re = await Role.findOne({ name: "student" });
            newUser.roles = [re._id];
          } catch (error) {
            res.status(400).json({ error: [error] });
          }
        }

        await newUser.save();

        return res.json({
          success: true,
          message: "Signup success",
          user: newUser,
        });
      } catch (error) {
        return res.status(401).json({
          error: errorHandler(error) + error,
        });
      }
    } catch (error) {
      return res.status(401).json({
        error: "Expired Token. Sign Up again",
      });
    }
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};
export const singInControler = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let getError = [];
    errors.array().map((errors) => {
      getError.push(errors.msg);
    });
    return res.status(422).json({
      error: getError,
    });
  } else {
    try {
      const userFound = await User.findOne({ email: email }).populate("roles");
      if (!userFound) throw "User not found";
      try {
        const matchPassword = await User.authenticate(
          password,
          userFound.password
        );
        if (!matchPassword) throw "invalid password";
      } catch (error) {
        return res.status(400).json({ token: null, error: error });
      }
      const token = jwt.sign(
        {
          id: userFound._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({ token, userFound });
    } catch (error) {
      return res.status(400).json({ token: null, error: error });
    }

    /* 
icluir los datos del usuario para el singin
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
        },
      }); */
  }
};
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let getError = [];
    errors.array().map((errors) => {
      getError.push(errors.msg);
    });
    return res.status(422).json({
      error: getError,
    });
  } else {
    try {
      const user = await User.findOne({ email });
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "10m",
        }
      );

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Password reset",
        html: `
        <h1>Please click to link to reset your password</h1>
        <p>${process.env.CLIENT_URL}/user/password/reset/${token}</p>
        `,
      };
      try {
        await user.updateOne({
          resetPassword: token,
        });
        try {
          const sent = await sgMail.send(emailData);
          return res.json({
            message: `Email has been sent to ${email}`,
          });
        } catch (e) {
          return res.json({ message: e.message });
        }
      } catch (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ error: ["user with email does not exist", err] });
    }
  }
};
export const resetControler = (req, res) => {
  const { newPassword, resetPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let getError = [];
    errors.array().map((errors) => {
      getError.push(errors.msg);
    });
    return res.status(422).json({
      error: getError,
    });
  } else {
    if (resetPassword) {
      try {
        jwt.verify(resetPassword, process.env.JWT_RESET_PASSWORD);
      } catch (error) {
        return res.status(400).json({
          error: ["Expired Link, Try again"],
        });
      }
      User.findOne({ resetPassword }, async (err, user) => {
        if (err) {
          return res
            .status(400)
            .json({ error: ["Something was wrong, try later"] });
        }
        user = _.extend(user, { password: newPassword, resetPassword: "" });
        try {
          await user.save();
          res.json({
            message: "Great! Now you can login with password ",
          });
        } catch (err) {
          return res.status(400).json({ error: ["Error reseting password"] });
        }
      });
    }
  }
};
export const getUserTesting = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.json({
      all: allUser,
    });
  } catch (e) {
    return res.status(401).json({
      error: e,
    });
  }
};
export const googleController = async (req, res) => {
  const { idToken } = req.body;
  try {
    const respueta = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
    });
    const { email_verified, name, email } = respueta.payload;
    if (email_verified) {
      User.findOne({ email }).exec(async (error, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          const { _id, email, name, role } = user;
          return res.json({
            token,
            user: { _id, email, name, role },
          });
        } else {
          let password = email + "9190E6A657EEF0F1587F6815EA3C0F0A3CB0403F";
          user = new User({
            name,
            email,
            username: name + "username",
            password,
          });

          try {
            const data = await user.save();
            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });

            const { _id, email, name, role } = data;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } catch (error) {
            return res.status(400).json({
              error: errorHandler(error),
            });
          }
        }
      });
    } else {
      return res.status(400).json({
        error: ["Google login failed, try again 1 "],
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: [`Google login failed, try again 2 ${error}`],
    });
  }
};
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.send("user delete success");
  } catch (err) {
    res.send("OPS!! worng ");
  }
};
