"use server";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole, UserRole } from "@/lib/auth-utils";
import { setCookie } from "./tokenHandlers";
import { loginValidationSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fatch";



export const loginUser = async (_currentState: any, formData: any): Promise<any> => {

    try {

        const redirectTo = formData.get("redirect") || null;

        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const payload = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        

          if (zodValidator(payload, loginValidationSchema).success === false) {
            return zodValidator(payload, loginValidationSchema);
        }

        const validatedPayload = zodValidator(payload, loginValidationSchema).data;

        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        });


        const result = await res.json();

       

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {

            setCookieHeaders.forEach((cookie: string) => {
                // console.log(cookie, "for each cookie");
                const parsedCookie = parse(cookie)
                // console.log(parsedCookie, "parsed cookie");

                if (parsedCookie["accessToken"]) {
                    accessTokenObject = parsedCookie;
                }

                if (parsedCookie["refreshToken"]) {
                    refreshTokenObject = parsedCookie;
                }
            })

        } else {
            throw new Error("no set-cookie headers found")
        }


        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies");
        }

        // seting cookies in cookies(cookies comes from next/headers)
       

        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });

        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });


        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string)


        if (typeof verifiedToken === "string") {
            throw new Error("invalid token")
        }

        const userRole: UserRole = verifiedToken.role;


        if(!result.success){
            throw new Error(result.message || "login failed")
        }


       if(redirectTo){
        const requestedPath = redirectTo.toString();
        if(isValidRedirectForRole(requestedPath,userRole)){
            redirect(`${requestedPath}?loggedIn=true`);
        }else{
             redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
       }else{
         redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
       }

    } catch (error : any) {

        if(error?.digest?.startsWith('NEXT_REDIRECT')){
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    
    }

}