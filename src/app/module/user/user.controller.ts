import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { userService } from "./user.service.js";
import { sendResponse } from "../../shared/sendResponse.js";




const createPatient = catchAsync(
    async(req : Request , res : Response) =>{
        const data = JSON.parse(req.body.data);
        const file = req.file;
        const result = await userService.createPatient(data,file);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User created successfully",
            data : result
        })
    }
)

const createDoctor = catchAsync(
    async(req : Request , res : Response) =>{
        const data = JSON.parse(req.body.data);
        const file = req.file;
        // console.log(data,file)
        const result = await userService.createDoctor(data,file);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User created successfully",
            data : result
        })
    }
)


const createAdmin = catchAsync(
    async(req : Request , res : Response) =>{
        const data = JSON.parse(req.body.data);
        const file = req.file;

        // console.log(data,file)
        const result = await userService.createAdmin(data,file);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "User created successfully",
            data : result
        })
    }
)


const getAllUser = catchAsync(
    async(req : Request , res : Response) =>{

        const result = await userService.getAllUser(req.query);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "All User Retrive successfully",
            data : result
        })
    }
)


export const userController = {
    createPatient,
    createDoctor,
    createAdmin,
    getAllUser,
}