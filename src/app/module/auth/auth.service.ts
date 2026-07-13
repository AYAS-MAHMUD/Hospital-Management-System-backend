import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma.js"
import  bcrypt  from 'bcrypt';



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

    


}


export const authService = {
    Login,

}