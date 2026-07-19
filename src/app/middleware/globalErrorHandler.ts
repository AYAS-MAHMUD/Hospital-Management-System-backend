import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";




import { config } from "../config/index.js";
import { AppError } from "../errors/AppError.js";
import handleZodError from "../errors/HandleZodError.js";
import handlePrismaError from "../errors/HandlePrismaError.js";


const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  // Zod Validation Error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Prisma Error
  else if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    const simplifiedError = handlePrismaError(error);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // Custom Error
  else if (error instanceof AppError) {
    statusCode = error.statusCode;

    message = error.message;

    errorSources = [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ];
  }
  else if (error instanceof Prisma.PrismaClientValidationError){
    statusCode = 400;
    message = "Validation Error";
    errorSources = [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ];
  }
  // JWT Error
  else if (error instanceof jwt.JsonWebTokenError) {
    statusCode = 401;

    message = "Invalid Token";

    errorSources = [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ];
  }

  // Generic Error
  else if (error instanceof Error) {
    message = error.message;

    errorSources = [
      {
        path: req.originalUrl,
        message: error.message,
      },
    ];
  }

  if (config.node_env === "development") {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:
      config.node_env === "development"
        ? error instanceof Error
          ? error.stack
          : undefined
        : undefined,
  });
};

export default globalErrorHandler;