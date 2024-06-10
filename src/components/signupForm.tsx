"use client";
import Link from "next/link";
import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateSignupForm } from "@/actions/validateSignupForm";
import { SignupFields, SignupSchema } from "../types/sigupSchema";
import { CREATE_USER } from "@/graphql/mutations";

interface Credentials {
  email: string;
  address?: string;
  password: string;
  lastName?: string;
  firstName?: string;
  confirmPassword: string;
}
const SignupForm = () => {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFields>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  const handleFormSubmit: SubmitHandler<SignupFields> = async (data) => {
    const result = await validateSignupForm(data);
    if (result?.success) {
      if (result.data) {
        console.log(result.data);
      }
    } else {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4 uppercase">SIGN UP</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-4 mb-4"
      >
        <div className="flex items-center space-x-3">
          <input
            {...register("firstName")}
            type="text"
            placeholder="First Name"
            autoComplete="false"
            className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
          />
          <input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            autoComplete="false"
            className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
          />
        </div>

        <input
          {...register("address")}
          type="text"
          placeholder="Address"
          autoComplete="false"
          className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
        />

        <div className="flex items-center space-x-3">
          <div>
            <input
              {...register("email")}
              type="text"
              placeholder="Email"
              autoComplete="false"
              className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
            />
            {errors.email && (
              <p className="text-sm text-red-500 italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register("phoneNumber")}
              type="text"
              placeholder="Phone Number"
              autoComplete="false"
              className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col">
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

        <div className="flex flex-col">
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
            autoComplete="false"
            className="bg-gray border border-gray-300 p-2 rounded-lg text-gray-600 focus:border-2 focus:border-gray-300 focus:outline-transparent"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="bg-[#8313DD] w-fit mx-auto rounded uppercase px-3 py-2 text-sm text-white hover:text-[#8313DD] hover:bg-white hover:border hover:border-[#8313DD]"
        >
          {isSubmitting ? "Registering User" : "Register"}
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link href="/">
          <span className="italic text-blue-500">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
