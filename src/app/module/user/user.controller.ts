import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";




const crateUser = catchAsync(
    async(req : Request , res : Response) =>{
        const body = req.body;
        const result = await userService.createUser(body);

        res.status(200).json({
            success : true,
            message : "Done",
            data : result
        })
    }
)


export const userController = {
    crateUser,

}