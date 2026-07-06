import { Prisma } from "@prisma/client";
import { TGenericErrorResponse } from "../interface/error.types.js";


const handlePrismaError = (
  error: Prisma.PrismaClientKnownRequestError
): TGenericErrorResponse => {
  let message = "Database Error";

  switch (error.code) {
    case "P2002":
      message = "Duplicate value found.";
      break;

    case "P2025":
      message = "Requested resource not found.";
      break;

    default:
      message = error.message;
  }

  return {
    statusCode: 400,
    message,
    errorSources: [
      {
        path: "",
        message,
      },
    ],
  };
};

export default handlePrismaError;