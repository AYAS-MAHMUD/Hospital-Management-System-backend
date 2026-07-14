import { Router } from "express";
import { userController } from "./user.controller.js";
import validateRequest from "../../middleware/validationHandler.js";
import { createAdminValidationSchema, createDoctorValidationSchema, createPatientValidation } from "./user.validation.js";
import { multerUpload } from "../../config/multer.config.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "@prisma/client";


const router = Router()


router.post("/create-patient",multerUpload.single("file"), validateRequest(createPatientValidation), userController.createPatient);

router.post("/create-doctor",multerUpload.single("file"),validateRequest(createDoctorValidationSchema), userController.createDoctor);

router.post("/create-admin",multerUpload.single("file"), validateRequest(createAdminValidationSchema), userController.createAdmin);

router.get("/allUser",checkAuth(UserRole.ADMIN), userController.getAllUser);

export const userRouter = router;