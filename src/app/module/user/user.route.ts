import { Router } from "express";
import { userController } from "./user.controller.js";
import validateRequest from "../../middleware/validationHandler.js";
import { createDoctorValidationSchema, createPatientValidation } from "./user.validation.js";
import { multerUpload } from "../../config/multer.config.js";


const router = Router()


router.post("/create-patient",multerUpload.single("file"), validateRequest(createPatientValidation), userController.createPatient);

router.post("/create-doctor",multerUpload.single("file"), userController.createDoctor);

// router.post("/create-patient",multerUpload.single("file"), userController.createPatient);

router.get("/allUser", userController.getAllUser);

export const userRouter = router;