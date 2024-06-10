import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password must be atleast 5 characters" }),
});

export type LoginFields = z.infer<typeof LoginSchema>;
