"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

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
import { twMerge } from "tailwind-merge";
import FormProgressBar from "@/components/FormProgressBar";

const steps = [
  {
    id: "Step 1",
    name: "Account Details",
    fields: ["username", "email", "password", "confirmPassword"],
  },
  {
    id: "Step 2",
    name: "Personal Information",
    fields: ["firstName", "lastName", "description", "country", "birthDate"],
  },
  {
    id: "Step 3",
    name: "Account Details",
    fields: ["newsLetter", "agreeToTerms"],
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors, isSubmitting },
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
    console.log("Form Submitted:", data);
    reset();
    setCurrentStep(0);
  };

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as (keyof TypeSignUpSchema)[], { shouldFocus: true });
    if (!output) return;

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
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
          </>
        );

      case 1:
        return (
          <>
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
          </>
        );

      case 2:
        return (
          <>
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
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow-md my-6">
      <h1 className="text-2xl font-bold text-center mb-6 text-zinc-900">
        Sign-Up Form
      </h1>

      <FormProgressBar
        steps={steps}
        currentStep={currentStep}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        {renderStep()}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          )}

          {currentStep < steps.length - 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          )}

          {currentStep === steps.length - 1 && (
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
