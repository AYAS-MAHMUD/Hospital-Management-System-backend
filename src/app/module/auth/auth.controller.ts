import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { ja } from "zod/locales";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../shared/sendResponse.js";


const Login = catchAsync(
    async(req: Request , res : Response) =>{
        const body = req.body ;

         const result = await authService.Login(body);
        
         res.cookie("accessToken",result.accessToken,{
            httpOnly : true,
            secure : true,
            sameSite : "none",
            maxAge : 1000 * 60 * 60 
         })
         res.cookie("refreshToken",result.refreshToken,{
            httpOnly : true,
            secure : true,
            sameSite : "none",
            maxAge : 1000 * 60 * 60 * 24 * 7
         })
         sendResponse(res,{
            statusCode : 200,
            success : true,
            message : "User login Successfully",
            data : {
                accessToken : result.accessToken,
                refreshToken : result.refreshToken,

            }
         })

    }
)



export const authController = {
    Login,

}