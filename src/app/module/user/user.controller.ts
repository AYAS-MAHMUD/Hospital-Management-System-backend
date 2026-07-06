import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";
import { sendResponse } from "../../shared/sendResponse.js";




const crateUser = catchAsync(
    async(req : Request , res : Response) =>{
        const body = req.body;
        const data = await userService.createUser(body);
        console.log(data)
        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User created successfully",
            data : data
        })
    }
)


export const userController = {
    crateUser,

}