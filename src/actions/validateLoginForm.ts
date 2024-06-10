"use server";

import { LoginFields, LoginSchema } from "@/types/loginSchema";

export async function validateLoginForm(data: LoginFields) {
  const result = LoginSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
