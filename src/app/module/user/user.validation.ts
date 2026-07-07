import { z } from "zod";

export interface patientInputData {
  name: string;
  email: string;
  password: string;
}

export const createPatientValidation = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(100, "Name cannot exceed 100 characters"),

    email: z.string().trim().email("Invalid email address").toLowerCase(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]+$/,
        "Password must contain uppercase, lowercase, number and special character",
      ),
  }),
});
