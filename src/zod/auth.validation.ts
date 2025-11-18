import z from "zod";

export const registerValidationZodSchema = z.object({
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


export const loginValidationSchema = z.object({
    email: z.email({ error: "Email is required" }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
})