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


export const scheduleController = {
    scheduleInsert,
    
}