import Register from "../screens/auth/Register";
import Login from "../screens/auth/Login";
import Activate from "../screens/auth/Activate";
import Forget from "../screens/auth/Forgetpass";
import Reset from "../screens/auth/Reset";

const singup = {
  path: "/user/singup",
  hidden: false,
  private: false,
  name: "Sing Up",
  component: Register,
};
const singin = {
  path: "/user/singin",
  hidden: false,
  private: false,
  name: "Sing In",
  component: Login,
};

const forget = {
  path: "/user/forget",
  hidden: true,
  private: false,
  name: "Recover Password",
  component: Forget,
};
const active = {
  path: "/user/activate/:token",
  hidden: true,
  private: false,
  name: "Acctivation your account",
  component: Activate,
};

const reset = {
  path: "/user/passwordReset/:token",
  hidden: true,
  private: false,
  name: "Reset your password",
  component: Reset,
};

export default [singin, singup, active, reset, forget];
