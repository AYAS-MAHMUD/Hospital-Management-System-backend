import { Router } from "express";
import { userRouter } from "../module/user/user.route.js";
import { authRouter } from "../module/auth/auth.route.js";
import { scheduler } from "../module/schedule/schedule.route.js";
import { doctorScheduleRoute } from "../module/doctorSchedule/doctorSchedule.route.js";



const router = Router();


const moduleRoutes = [
    {
        path : "/user",
        route : userRouter
    },
    {
        path : "/auth",
        route : authRouter
    },
    {
        path : "/schedule",
        route : scheduler
    },
    {
        path: "/doctor-schedule",
        route : doctorScheduleRoute
    }
    
]

moduleRoutes.forEach(route=>router.use(route.path,route.route));

// router.use("/path",route);



export default router;