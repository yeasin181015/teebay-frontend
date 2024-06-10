"use client";

import Link from "next/link";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFields, LoginSchema } from "@/types/loginSchema";
import { validateLoginForm } from "@/actions/validateLoginForm";

interface Credentials {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginCredentials, setLoginCredentials] = useState<Credentials>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const [loginUser, { data: loggedInUserData, called }] = useLazyQuery(
    LOGIN_USER,
    {
      variables: {
        email: loginCredentials?.email,
        password: loginCredentials?.password,
      },
    }
  );

  const handleFormSubmit: SubmitHandler<LoginFields> = async (data) => {
    const result = await validateLoginForm(data);
    if (result?.success) {
      if (result.data) {
        setLoginCredentials(result.data);
        loginUser();
      }
    } else {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4">SIGN IN</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-4 mb-4"
      >
        <div>
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            autoComplete="false"
            className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
          />
          {errors.email && (
            <p className="text-xs text-red-500 italic">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="false"
            className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
          />
          {errors.password && (
            <p className="text-sm text-red-500 italic">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="bg-[#8313DD] w-fit mx-auto rounded uppercase px-3 py-2 text-sm text-white hover:text-[#8313DD] hover:bg-white hover:border hover:border-[#8313DD]"
        >
          {isSubmitting ? "Logging in" : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link href="/signup">
          <span className="italic text-blue-500">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
