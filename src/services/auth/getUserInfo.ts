"use server";

import { userInterface } from "@/types/userTypes";
import { getCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";


export const getUserInfo = async() : Promise<userInterface | null> =>{

    try {

        const accessToken = await getCookie("accessToken");

        if(!accessToken){
            return null
        }

        const verifiedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;

        if(!verifiedToken){
            return null;
        }

        const userInfo : userInterface = {
            name : verifiedToken.name,
            email:verifiedToken.email,
            role : verifiedToken.role,

        } 

        return userInfo;
        
    } catch (error :any) {
        console.log(error);
        return null;
        
    }

}