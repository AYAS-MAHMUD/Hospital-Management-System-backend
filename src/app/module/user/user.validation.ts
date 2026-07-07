import { z } from "zod";


export interface patientInputData{
    name : string;
    email : string;
    password : string
}



export const createPatientValidation = z.object({
    name : z.string(),
    email : z.string(),
    password : z.string

})