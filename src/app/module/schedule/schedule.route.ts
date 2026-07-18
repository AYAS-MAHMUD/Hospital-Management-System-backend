import { Router } from "express";
import { scheduleController } from "./schedule.controller.js";
import { checkAuth } from "../../middleware/checkAuth.js";
import { UserRole } from "@prisma/client";

const router  = Router()

router.post("/",scheduleController.scheduleInsert);

router.get("/",checkAuth(UserRole.DOCTOR),scheduleController.scheduleForDoctor);
router.delete("/:id",scheduleController.deleteSchedule)

export const scheduler = router;