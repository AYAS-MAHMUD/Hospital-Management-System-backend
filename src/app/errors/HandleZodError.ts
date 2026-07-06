import { ZodError } from "zod";
import { TGenericErrorResponse } from "../interface/error.types.js";


const handleZodError = (
  error: ZodError
): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
};

export default handleZodError;