import { Router } from "express";
import { scheduleController } from "./schedule.controller.js";

const router  = Router()

router.post("/",scheduleController.scheduleInsert);

router.get("/",scheduleController.scheduleForDoctor);


export const scheduler = router;