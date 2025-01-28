import { z } from "zod";
import { useForm } from "react-hook-form";
import { basicDetailsSchema } from "@/lib/basicDetailsValidator";
import { LucideIcon } from "lucide-react";

export type TypeBasicDetailsSchema = z.infer<typeof basicDetailsSchema>;

export type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<TypeBasicDetailsSchema>>["register"]>;
};

export type TextareaProps = {
  label: string;
  placeholder: string;
  rows?: number;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm<TypeBasicDetailsSchema>>["register"]>;
};

export type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  leftIcon?: LucideIcon;
  enableSearch?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export type DatePickerProps = {
  label: string;
  error?: string;
  onChange: (date: Date | undefined) => void;
  value?: Date;
};

export type CheckboxProps = {
  title: string;
  description?: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
};