
import { Router } from "express"
import { doctorScheduleController } from "./doctorSchedule.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/",checkAuth(UserRole.DOCTOR),doctorScheduleController.createDoctorSchedule)


export const doctorScheduleRoute = router;