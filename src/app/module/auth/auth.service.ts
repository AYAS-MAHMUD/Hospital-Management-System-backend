import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma.js"
import  bcrypt  from 'bcrypt';
import { AppError } from "../../errors/AppError.js";
import { createUserToken } from "../../shared/userToken.js";



const Login = async(payload : any) =>{
    const email = payload.email as string;
    const password = payload.password;
    // email ase kina check korte hobe .
    // password correct kina check korte hobe.
    // then accesstoken and refresh token create korte hobe . 
    // and token cookies e set korte hobe 

    const isExitUser = await prisma.user.findUnique({
        where : {
            email,
            status : UserStatus.ACTIVE
        }
    })

    const isPasswordCorrect = await bcrypt.compare(password,isExitUser?.password as string);
    if(!isPasswordCorrect){
        throw new AppError(400, "Password is incorrect");
    }
     console.log(isExitUser)
    const userToken = createUserToken(isExitUser);
    return userToken;
}


export const authService = {
    Login,

}