"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as authService from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await authService.registerUser(data);
      toast.success("Check your email to verify your account");
      router.push("/login");
    } catch (err) {
      toast.error(getErrorMessage(err, "Registration failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input name="name" label="Full name" register={register} error={errors.name} />
      <Input name="email" type="email" label="Email" register={register} error={errors.email} />
      <Input name="password" type="password" label="Password" register={register} error={errors.password} />
      <Button type="submit" loading={isSubmitting}>Register</Button>
    </form>
  );
}