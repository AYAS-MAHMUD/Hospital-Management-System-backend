import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync.js";
import { scheduleService } from "./schedule.service.js";
import { sendResponse } from "../../shared/sendResponse.js";
import httpStatusCode from "http-status-codes";


const scheduleInsert = catchAsync(
    async(req : Request, res : Response) =>{
        const body = req.body;
        const result = await scheduleService.scheduleInsert(body);


        sendResponse(res,{
            statusCode : httpStatusCode.CREATED,
            success : true,
            message : "Schedule created successfully",
            data : result
        })
    }
)




const scheduleForDoctor = catchAsync(
    async(req : Request, res : Response) =>{

        const result = await scheduleService.scheduleForDoctor(req.query);


        sendResponse(res,{
            statusCode : httpStatusCode.OK,
            success : true,
            message : "Schedule retrieved successfully",
            data : result
        })
    }
)




export const scheduleController = {
    scheduleInsert,
    scheduleForDoctor
    
}