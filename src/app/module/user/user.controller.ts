import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";
import { sendResponse } from "../../shared/sendResponse.js";




const crateUser = catchAsync(
    async(req : Request , res : Response) =>{
        const data = JSON.parse(req.body.data);
        const file = req.file;

        // console.log("pass : ",data.password);
        // console.log("image : ", file?.path)
        
        const result = await userService.createUser(data,file);
        // console.log(data)
        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User created successfully",
            data : result
        })
    }
)


export const userController = {
    crateUser,

}