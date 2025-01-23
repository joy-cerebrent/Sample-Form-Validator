"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flag, LockIcon, Mail, UserIcon } from "lucide-react";

import { signUpSchema } from "@/lib/signUpValidator";
import { TypeSignUpSchema } from "@/types";

import PasswordStrengthComponent from "@/components/PasswordStrengthComponent";
import ConfirmPasswordMatch from "@/components/ConfirmPasswordMatch";
import DatePicker from "@/components/DatePicker";
import Textarea from "@/components/Textarea";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";

export default function Home() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {
      errors,
      isSubmitting
    },
    reset,
  } = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      newsLetter: true,
      agreeToTerms: false,
    },
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = async (data: TypeSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    reset();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md my-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900">Sign-Up Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex gap-2">
          <Input
            label="First Name"
            type="text"
            placeholder="John"
            error={errors.firstName?.message}
            registration={register("firstName")}
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Doe"
            error={errors.lastName?.message}
            registration={register("lastName")}
          />
        </div>

        <Input
          label="Username"
          type="text"
          placeholder="johndoe123"
          leftIcon={UserIcon}
          error={errors.username?.message}
          registration={register("username")}
        />

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
          rightIcon={LockIcon}
          error={errors.password?.message}
          registration={register("password")}
        />

        <PasswordStrengthComponent password={password} />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="password@123"
          error={errors.confirmPassword?.message}
          registration={register("confirmPassword")}
        />

        <ConfirmPasswordMatch password={password} confirmPassword={confirmPassword} />

        <Textarea
          label="Description"
          placeholder="Tell us more about yourself..."
          rows={5}
          error={errors.description?.message}
          registration={register("description")}
        />

        <Controller
          name="country"
          control={control}
          // defaultValue=""
          render={({ field }) => (
            <Dropdown
              label="Select Country"
              options={["USA", "Canada", "India", "Australia", "Germany", "UK"]}
              value={field.value}
              leftIcon={Flag}
              enableSearch={true}
              error={errors.country?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Birth Date"
              value={field.value}
              onChange={field.onChange}
              error={errors.birthDate?.message}
            />
          )}
        />

        <Controller
          name="newsLetter"
          control={control}
          render={({ field }) => (
            <Checkbox
              title="Subscribe to Newsletter"
              description="Get all the latest updates, features, beta versions, and sneak peeks before everyone else."
              checked={field.value}
              error={errors.newsLetter?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="agreeToTerms"
          control={control}
          render={({ field }) => (
            <Checkbox
              title="Agree to Terms"
              description="You must agree to the terms and conditions to proceed."
              checked={field.value}
              error={errors.agreeToTerms?.message}
              onChange={field.onChange}
            />
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
