import { Router } from "express";
import { userRouter } from "../module/user/user.route.js";


const router = Router();


const moduleRoutes = [
    {
        path : "/user",
        route : userRouter
    },
    
]

moduleRoutes.forEach(route=>router.use(route.path,route.route));

// router.use("/path",route);



export default router;