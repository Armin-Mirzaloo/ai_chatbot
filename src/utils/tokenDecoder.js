"use server"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "./config"

export const tokenDecoder = async (token) => {

        const decode = jwt.verify(token, SECRET_KEY)

        return decode;
    
    
}