import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { ja } from "zod/locales";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../shared/sendResponse.js";


const Login = catchAsync(
    async(req: Request , res : Response) =>{
        const body = req.body ;

         const result = await authService.Login(body);

         sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "User login Successfully",
            data : result
         })

    }
)



export const authController = {
    Login,

}