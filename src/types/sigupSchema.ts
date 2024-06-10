import { z } from "zod";

export const SignupSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password must be atleast 5 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export type SignupFields = z.infer<typeof SignupSchema>;
