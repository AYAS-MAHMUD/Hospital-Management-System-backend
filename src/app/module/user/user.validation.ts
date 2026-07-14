import { Gender, UserRole, UserStatus } from "@prisma/client";
import { email, z } from "zod";

export interface patientInputData {
  name: string;
  email: string;
  password: string;
}

export interface IUserQuery {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  role?: UserRole;
  status ?: UserStatus
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


export const createDoctorValidationSchema = z.object({
  body: z.object({
    password : z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32,"Password connot exceed 32 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]+$/,"Password must contain uppercase, lowercase, number and special character"),
    name: z.string().optional(),

      email: z.string().email(),

      profilePhoto: z.string().optional(),

      contactNumber: z.string(),

      address: z.string(),

      registrationNumber: z.string(),

      experience: z.number().optional(),

      gender: z.nativeEnum(Gender),

      appointmentFee: z.number(),

      qualification: z.string(),

      currentWorkingPlace: z.string(),

      designation: z.string(),
  }),
});



export const createAdminValidationSchema = z.object({
  body : z.object({
    name : z.string().optional(),
    password : z.string()
    .min(8,"Password must be at least 8 characters")
    .max(32,"Password connot exceed 32 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]+$/,"Password must contain uppercase, lowercase, number and special character"),

    email : z.string().email(),
    profilePhoto: z.string().optional(),
    contactNumber : z.string()

  })
})