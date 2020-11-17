import { Router } from "express";
import * as validator from "../middlewares/auth.validator";
import * as controller from "../controllers/auth.controler";

const router = Router();

router.post("/",validator.accessByToken,controller.user)
router.post("/google", controller.google);
router.post("/singup", validator.singUp, controller.singUp);
router.post("/singin", validator.singIn, controller.singIn);
router.post("/forget", validator.forgotPassword, controller.forgetPassword);
router.put("/resetPassword", validator.resetPassword, controller.resetPassword);
router.post("/activation", controller.activation);
router.get("/users",  controller.getUserTesting);
router.delete("/users/:id",  controller.deleteUser);
router.post("/chageRole",controller.changeRole);

export default router;
