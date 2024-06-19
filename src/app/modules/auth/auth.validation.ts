import { z } from "zod";

export const signUpValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).min(8, {
      message: "Password must be at least 8 characters long",
    }),
    phone: z.string({ required_error: "Phone is required" }),
    address: z.string({ required_error: "Address is required" }),
    role: z.string({ required_error: "Role is required" }).optional(),
  }),
});

export const signInValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }),
  }),
});
