const User = require("../models/auth.model.js");
const experssJwt = require("express-jwt");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
//Custom error handler to get uselful error from database errors
const { errorHandler } = require("../helpers/dbErrorHandling");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerControler = async (req, res) => {
  const { name, email, username, password } = req.body;
  console.log(req.body ? "recibido" : "no se recibio nada o esta vacio");
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
exports.activationController = async (req, res) => {
  const { token } = req.body;
  if (token) {
    //verify the token is valid or not or expired
    try {
      await jwt.verify(token, process.env.JWT_SECRET_ACTIVATION);

      const { name, username, email, password } = jwt.decode(token);

      try {
        const user = new User({
          name,
          lastName: "apelli",
          username,
          email,
          password,
        });

        await user.save();

        return res.json({
          success: true,
          message: "Signup success",
          user: user,
        });
      } catch (error) {
        return res.status(401).json({
          error: errorHandler(error),
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
exports.loginControler = async (req, res) => {
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
    // check if user exist
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: ["User with that email does not exist. Please signup"],
        });
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          error: ["Email and password do not match"],
        });
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const { _id, name, email, role } = user;

      return res.json({
        token,
        user: {
          _id,
          name,
          email,
          role,
        },
      });
    });
  }
};
exports.forgetPassword = async (req, res) => {
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
exports.resetControler = (req, res) => {
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
exports.getUserTesting = async (req, res) => {
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

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
exports.googleController = async (req, res) => {
  const { idToken } = req.body;
  try {
    const respueta = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT,
    });
    const { email_verified, name, email } = respueta.payload;
    if (email_verified) {
      User.findOne({ email }).exec( async (error, user) => {
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
          user = new User({ name, email, username:name+'username', password });

          try {
            const data = await user.save()
            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
  
            const {_id,email, name , role } = data 
            return res.json({
              token,
              user:{_id,email,name ,role}
            })
          } catch (error) {
            return res.status(400).json({
              error: errorHandler(error)
            });
          }  
        }
      });
    }else{
      return res.status(400).json({
        error:['Google login failed, try again 1 ']
      })
    }
  } catch (error) {
    return res.status(400).json({
      error:[`Google login failed, try again 2 ${error}`]
    })
  }
};
