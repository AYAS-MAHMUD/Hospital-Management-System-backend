
import bcrypt from "bcrypt"
import { patientInputData } from "./user.validation.js";
import { prisma } from "../../shared/prisma.js";



// const createUser = async (payload : patientInputData) =>{

//     const hashPassword = await bcrypt.hash(payload.password , 10);
//     const result  = await prisma.$transaction(async(tnx)=>{
//         await tnx.user.create({
//             data : {
//                 email : payload.email,
//                 password : hashPassword
//             }
//         })
        
//         await tnx.patient.create({
//             data : {
//                 name : payload.name,
//                 email : payload.email
//             }
            
//         })

        
//     })
//     return result

// }

const createUser = async (payload: patientInputData) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.email,
        password: hashPassword,
      },
    });

    const patient = await tx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
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