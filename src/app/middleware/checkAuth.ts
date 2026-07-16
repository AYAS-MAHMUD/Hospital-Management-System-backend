import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { StatusCodes } from "http-status-codes";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { config } from "../config/index.js";



export const checkAuth = (...roles : string[]) =>
    async (req : Request, res : Response, next : NextFunction)=>{
        try {
            // token get from cookie 
            const accessToken = req.cookies.accessToken;

            if(!accessToken){
                throw new AppError(StatusCodes.UNAUTHORIZED,"No token found")
            }
            
            // token verify
            const verifyToken = jwt.verify(accessToken,config.jwt_access_secret as string)

            
            if(!roles.includes((verifyToken as JwtPayload).role)){
                throw new AppError(StatusCodes.UNAUTHORIZED,"Unauthorize Access")
            }

            req.user = verifyToken as JwtPayload;


            next()

        } catch (error) {
            next(error)
        }
}