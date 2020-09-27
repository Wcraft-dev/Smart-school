import { Router } from "express";
import {
  validRegiester,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
  accessByToken,
} from "../middlewares/auth.validator";
import {
  singUpControler,
  singInControler,
  activationController,
  forgetPassword,
  resetControler,
  getUserTesting,
  googleController,
  deleteUserController,
} from "../controllers/auth.controler";

const router = Router();

router.post("/singup", validRegiester, singUpControler);
router.post("/singin", validLogin, singInControler);
router.post("/forget", forgotPasswordValidator, forgetPassword);
router.put("/resetPassword", resetPasswordValidator, resetControler);

router.post("/googlelogin", googleController);

router.get("/users", accessByToken, getUserTesting);
router.delete("/users/:id", deleteUserController);
router.post("/activation", activationController);

export default router;
