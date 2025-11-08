"use server";

import z from "zod";

const loginValidationSchema = z.object({
    email : z.email({error :"Email is required"}),
       password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
})

export const loginUser = async(_currentState :any, formData :any) : Promise<any> =>{

    try {

        const loginData = {
            email : formData.get('email'),
            password : formData.get('password')
        }

        const validatedFields = loginValidationSchema.safeParse(loginData);

        if(!validatedFields.success){
            return {
                success : false,
                errors : validatedFields.error.issues.map(issue =>{
                    return {
                        field : issue.path[0],
                        message : issue.message
                    }
                })
            }
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
            method : "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(loginData)
        }).then(res => res.json())

        return res;
        
    } catch (error) {
        console.log(error);
        return {error : "login failed"}
    }

}