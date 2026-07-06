
import bcrypt from "bcrypt"
import { patientInputData } from "./user.validation.js";



const createUser = async (payload : patientInputData) =>{

    const hashPassword = await bcrypt.hash(payload.password , 10);
    return hashPassword

}



export const userService = {
    createUser,

}