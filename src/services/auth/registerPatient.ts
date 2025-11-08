"use server";
import z from "zod";

const registerValidationZodSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().optional(),
  email: z.string().email({ message: "Valid email is required" }),
  password: z.string()
    .min(6, { message: "Password is required and must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
  confirmPassword: z.string()
    .min(6, { message: "Confirm Password is required and must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const registerPatient = async(_currentState :any, formData :any) : Promise<any> =>{

    try {

        const validationData = {
            name: formData.get('name'),
            address: formData.get('address'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        }

        const validatedFields = registerValidationZodSchema.safeParse(validationData);

        // console.log(validatedFields, "val");

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                }
                )
            }
        }


        const registerData = {
            password : formData.get('password'),
            patient :{
                name : formData.get('name'),
                email : formData.get('email'),
                address : formData.get('address'),
            }
        }

        const newFormData = new FormData();

        newFormData.append("data", JSON.stringify(registerData));


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create-patient`,{
            method : "POST",
            body: newFormData
        }).then(res => res.json());

        console.log(res, "res");

        return res;
        
    } catch (error) {
        console.log(error);
        return {error : "registration failed"}
    }

}

