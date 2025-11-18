"use server";

import { serverFetch } from "@/lib/server-fatch";
import { zodValidator } from "@/lib/zodValidator";
import { createSpecialityZodSchema } from "@/zod/specialities.validation";

export async function createSpecialities(_prevState:any, formData : FormData) {

   try {
     const payload = {
        title : formData.get("title") as string
    }

    if (zodValidator(payload, createSpecialityZodSchema).success === false) {
            return zodValidator(payload, createSpecialityZodSchema);
        }

        const validatedPayload = zodValidator(payload, createSpecialityZodSchema).data;

        const newFormData = new FormData()
        newFormData.append("data", JSON.stringify(validatedPayload))

        const response = await serverFetch.post("/specialties",{
            body : formData
        })

        const result = await response.json();

        return result;



   } catch (error : any) {
     console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}` }
   }

    
}


export async function getSpecialities() {
       try {
        const response = await serverFetch.get("/specialties")
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
    
}


export async function deleteSpecialities(id: string) {
      try {
        const response = await serverFetch.delete(`/specialties/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
    
}