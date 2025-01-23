import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First Name is required"),
    lastName: z
      .string()
      .nonempty("Last Name is required"),
    username: z
      .string()
      .nonempty("Username is required")
      .min(2, "Username must be at least 2 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(8, "Passwords must match"),
    description: z
      .string()
      .max(1000, "Description cannot be longer than 1000 characters")
      .optional(),
    country: z.enum(["USA", "Canada", "India", "Australia", "Germany", "UK"], {
      required_error: "Select a country from the dropdown",
    }),
    birthDate: z
      .date({
        required_error: "Please select a birth date",
        invalid_type_error: "Invalid date",
      })
      .refine(
        (date) => date < new Date(new Date().toDateString()),
        { message: "You cannot select a date in the future" }
      ),
    newsLetter: z
      .boolean()
      .default(true),
    agreeToTerms: z
      .boolean()
      .refine((value) => value === true, {
        message: "You need to agree to the terms and conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

