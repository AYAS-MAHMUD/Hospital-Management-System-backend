import { Router } from "express";
import { userController } from "./user.controller.js";


const router = Router()


router.post("/create", userController.crateUser);

export const userRouter = router;