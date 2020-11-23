import SingUp from "../screens/auth/SignUp";
import SingIn from "../screens/auth/SignIn";
import SingOut from "../screens/auth/SignOut";
import Activate from "../screens/auth/Activate";
import Forget from "../screens/auth/Forgetpass";
import Reset from "../screens/auth/Reset";

const singup = {
  path: "/user/singup",
  hidden: false,
  login: false,
  name: "Sing Up",
  component: SingUp,
};
const singin = {
  path: "/user/singin",
  hidden: false,
  login: false,
  name: "Sing In",
  component: SingIn,
};
const singout = {
  path: "/user/singout",
  hidden: false,
  login: false,
  name: "Sing Out",
  component: SingOut,
};
const forget = {
  path: "/user/forget",
  hidden: true,
  login: false,
  name: "Recover Password",
  component: Forget,
};
const active = {
  path: "/user/activate/:token",
  hidden: true,
  login: false,
  name: "Acctivation your account",
  component: Activate,
};

const reset = {
  path: "/user/passwordReset/:token",
  hidden: true,
  login: false,
  name: "Reset your password",
  component: Reset,
};

export default [singin, singup, active, reset, forget, singout];
