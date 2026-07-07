import { Request, Response, NextFunction } from "express";
import { ZodError, ZodTypeAny } from "zod";
import { StatusCodes } from "http-status-codes";

const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let parsedBody = req.body;

      if (req.body?.data) {
        try {
          parsedBody = JSON.parse(req.body.data);
        } catch {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Invalid JSON format",
          });
        }
      }

      await schema.parseAsync({
        body: parsedBody,
        params: req.params,
        query: req.query,
      });


      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Validation Error",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(error);
    }
  };
};

export default validateRequest;