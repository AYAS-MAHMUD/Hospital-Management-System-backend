import { config } from "../config/index.js"
import { generateToken } from "./jwt.js"


export const createUserToken = (payload) =>{
    const jwtpayload = {
        id : payload.id,
        email : payload.email,
        role : payload.role
    }
    const accessToken = generateToken(
        jwtpayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string
    )
    const refreshToken = generateToken(
        jwtpayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string
    )
    return { accessToken, refreshToken }
}