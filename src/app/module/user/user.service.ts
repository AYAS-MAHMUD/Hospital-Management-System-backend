
import bcrypt from "bcrypt"
import { patientInputData } from "./user.validation.js";
import { prisma } from "../../shared/prisma.js";


const createUser = async (data: patientInputData , file : any) => {
  const hashPassword = await bcrypt.hash(data.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        password: hashPassword,
      },
    });

    const patient = await tx.patient.create({
      data: {
        name: data.name,
        email: data.email,
        profilePhoto : file?.path
      },
    });

    return {
      user,
      patient,
    };
  });

  return result;
};


export const userService = {
    createUser,

}




