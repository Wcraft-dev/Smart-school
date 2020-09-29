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

export const singUp = async (req, res) => {
  const { name, email, password } = req.body;
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
        error: errox,
      });
    }
  }
};
//Activation and save to database
export const activation = async (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET_ACTIVATION);
      const { name, email, password, roles } = jwt.decode(token);
      try {
        const exist = await User.findOne({ email });
        if (exist) {
          return res.status(400).json({ error: ["already activated account"] });
        } else {
          const newUser = new User({
            name,
            lastName: "apelli",
            accountGoogle: false,
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
              return res
                .status(400)
                .json({
                  error: ["we coudn't validated your account try again"],
                });
            }
          }

          await newUser.save();

          const token = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          return res.json({
            success: true,
            message: "Signup success",
            token: token,
            user: {
              name,
              email,
              picture: null,
            },
          });
        }
      } catch (error) {
        return res
          .status(400)
          .json({ error: ["we coudn't validated your account try again"] });
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
export const singIn = async (req, res) => {
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
      const userFound = await User.findOne({ email }).populate("roles");
      if (!userFound) throw "User not found";
      try {
        const matchPassword = await User.authenticate(
          password,
          userFound.password
        );
        if (!matchPassword) throw "invalid password";
      } catch (error) {
        return res.status(400).json({ token: null, error: ["we coudn't validated your account"] });
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
      const { name } = userFound;
      return res.json({
        token,
        user: {
          name,
          email,
          picture: null,
        },
      });
    } catch (error) {
      return res.status(400).json({ token: null, error: ["we coudn't validated your account"] });
    }
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
      if (!user.accountGoogle) {
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
        <p>${process.env.CLIENT_URL}/user/passwordReset/${token}</p>
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
            return res.json({ error: ["we coudn't send email, try again please"] });
          }
        } catch (err) {
          return res.status(400).json({
            error: ["we coudn't validated your information"]
          });
        }
      } else {
        return res.status(401).json({error:["it's account created with google try sing in google"]});
      }
    } catch (err) {
      return res.status(400).json({ error: ["email does not exist"] });
    }
  }
};
export const resetPassword = async (req, res) => {
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
          error: ["Expired Link"],
        });
      }

      try {
        await User.findOneAndUpdate(
          { resetPassword },
          {
            password: await User.encryptPassword(newPassword),
            resetPassword: "",
          }
        );
        res.json({
          message: "Great! Now you can login with password",
        });
      } catch (error) {
        return res
          .status(400)
          .json({ error: ["Something was wrong, try again please"] });
      }
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
export const google = async (req, res) => {
  const { idToken } = req.body;
  try {
    const respueta = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
    });
    const { email_verified, name, email, picture } = respueta.payload;

    if (!email_verified) throw "email google not verificated";

    try {
      const user = await User.findOne({ email }).populate("roles");
      if (!user) {
        try {
          const newUser = new User({
            name,
            lastName: "apelli",
            accountGoogle: true,
            email,
            password: await User.encryptPassword(
              "You shouldn't see this " + email
            ),
          });

          try {
            const roles = await Role.findOne({ name: "student" });
            newUser.roles = [roles._id];
          } catch (error) {
            return res.status(400).json({ error: ["it wasn't possible to login with google"] });
          }

          await newUser.save();
          const token = jwt.sign(
            {
              id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          );
          return res.json({
            success: true,
            message: "Signup success",
            token: token,
            user: {
              name,
              email,
              picture,
            },
          });
        } catch (error) {
          return res.status(401).json({
            error: errorHandler(error) + error,
          });
        }
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res.json({
        token,
        user: {
          name,
          email,
          picture,
        },
      });
    } catch (error) {
      return res.status(400).json({ token: null, error: ["it wasn't possible to login with google"] });
    }
   
  } catch (error) {
    return res.status(400).json({
      error: [`Google sing up failed`],
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.send("user delete success");
  } catch (err) {
    res.send("OPS!! worng ");
  }
};
