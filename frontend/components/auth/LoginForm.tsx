"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";
import GoogleButton from "@/components/auth/GoogleButton";

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
      toast.success("Welcome back!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err, "Login failed"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email or Phone"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div className="text-right">
        <Link href="/forgot-password" className="text-xs text-gray-500 underline">Forgot password?</Link>
      </div>

      <Button type="submit" loading={isSubmitting}>Sign In</Button>

      <div className="relative text-center my-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
        <span className="relative bg-white px-2 text-xs text-gray-400">or</span>
      </div>

      <GoogleButton label="Sign in with Google" />
    </form>
  );
}