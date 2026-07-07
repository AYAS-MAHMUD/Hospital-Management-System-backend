import { Router } from "express";
import { userController } from "./user.controller.js";
import validateRequest from "../../middleware/validationHandler.js";
import { createPatientValidation } from "./user.validation.js";
import { multerUpload } from "../../config/multer.config.js";


const router = Router()


router.post("/create",multerUpload.single("file"), userController.crateUser);

export const userRouter = router;