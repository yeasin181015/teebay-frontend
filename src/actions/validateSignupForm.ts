"use server";

import { SignupFields, SignupSchema } from "@/types/sigupSchema";

export async function validateSignupForm(data: SignupFields) {
  const result = SignupSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
