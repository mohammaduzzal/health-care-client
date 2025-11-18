"use server";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";
import { zodValidator } from "@/lib/zodValidator";
import { serverFetch } from "@/lib/server-fatch";



export const registerPatient = async(_currentState :any, formData :any) : Promise<any> =>{

    try {

        const payload = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

       if (zodValidator(payload, registerValidationZodSchema).success === false) {
            return zodValidator(payload, registerValidationZodSchema);
        }

       const validatedPayload: any = zodValidator(payload, registerValidationZodSchema).data;

  


        const registerData = {
            password : validatedPayload.password,
            patient :{
                name : validatedPayload.name,
                email : validatedPayload.email,
                address :validatedPayload.address,
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));

        
        if (formData.get("file")) {
            newFormData.append("file", formData.get("file") as Blob);
        }


          const res = await serverFetch.post("/user/create-patient", {
            body: newFormData,
        })
        
        const result =await res.json();

        // console.log(res, "res");


        if(result.success){
            await loginUser(_currentState, formData)
        }

        return result;
        
    } catch (error : any) {
         if(error?.digest?.startsWith('NEXT_REDIRECT')){
            throw error;
        }


        console.log(error);
         return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. You might have entered incorrect email or password."}` };
    
    }

}

