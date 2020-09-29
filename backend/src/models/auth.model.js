import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userScheama = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      match: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g,
    },
    accountGoogle:{
      type: Boolean,
      required:true
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    resetPassword: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userScheama.static("authenticate", async (password, receivedPassword) => {
  try {
    return await bcrypt.compare(password.toString(), receivedPassword);
  } catch (error) {
    return undefined
  }
});

userScheama.static("encryptPassword", async function (password) {
  if (!password) return "";
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password.toString(), salt);
});

export default model("User", userScheama);
