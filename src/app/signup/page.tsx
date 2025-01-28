"use client";

import { LockIcon, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import PasswordStrengthComponent from "@/components/PasswordStrengthComponent";
import ConfirmPasswordMatch from "@/components/ConfirmPasswordMatch";
import Link from "next/link";

const signupSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .nonempty("Confirm Password is required")
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type TypeSignupSchema = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    },
  } = useForm<TypeSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = async (data: TypeSignupSchema) => {
    try {
      await signup(
        data.email,
        data.password
      );
    } catch (error) {
      console.error("Signup failed:", error instanceof Error ? error.message : "Unknown error");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md my-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900">
        Signup Form
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="johndoe@mail.com"
          leftIcon={Mail}
          error={errors.email?.message}
          registration={register("email")}
        />

        <Input
          label="Password"
          type="password"
          placeholder="password@123"
          leftIcon={LockIcon}
          error={errors.password?.message}
          registration={register("password")}
        />
        <PasswordStrengthComponent password={password} />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="password@123"
          leftIcon={LockIcon}
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword")}
        />
        <ConfirmPasswordMatch password={password} confirmPassword={confirmPassword} />

        <Button type="submit" variant="primary" size="md">
          {isSubmitting ? "Signing you up" : "Signup"}
        </Button>

        <p className="text-sm text-zinc-700 font-medium">
          Already have an account ?{" "}
          <Link href={"/login"} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
