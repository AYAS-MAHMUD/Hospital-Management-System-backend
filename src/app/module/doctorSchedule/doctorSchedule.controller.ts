import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { doctorScheduleService } from "./doctorSchedule.service.js";



const createDoctorSchedule = catchAsync(
    async(req : Request , res : Response) =>{
        const user = req.user;

        const result = await doctorScheduleService.doctorScheduleInsert(user, req.body);

        sendResponse(res,{
            statusCode : 201,
            success : true,
            message : "Doctor schedule created successfully",
            data : result
        })
    }
)

export const doctorScheduleController = {
    createDoctorSchedule
}