"use client";

import { LockIcon, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required"),
});

type TypeLoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TypeLoginSchema) => {
    try {
      await login(
        data.email,
        data.password
      );
    } catch (error) {
      console.error("Login failed:", error instanceof Error ? error.message : "Unknown error");
    }
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md my-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900">
        Login Form
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
        <Button type="submit" variant="primary" size="md">
          {isSubmitting ? "Logging you in" : "Login"}
        </Button>

        <p className="text-sm text-zinc-700 font-medium">
          Dont&apos; have an account ?{" "}
          <Link href={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}