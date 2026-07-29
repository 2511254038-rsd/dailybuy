"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success("Logged in");
      router.push("/profile");
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input name="email" type="email" label="Email" register={register} error={errors.email} />
      <Input name="password" type="password" label="Password" register={register} error={errors.password} />
      <Button type="submit" loading={isSubmitting}>Log in</Button>
    </form>
  );
}