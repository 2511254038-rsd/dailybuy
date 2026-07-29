"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as authService from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";
import GoogleButton from "@/components/auth/GoogleButton";

interface FormData {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const router = useRouter();
  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    try {
      await authService.registerUser(data);
      router.push(`/verify-sent?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      throw err; // handled below via onError toast pattern — see note
    }
  };

  const submitWithToast = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (err) {
      const toast = (await import("react-hot-toast")).default;
      toast.error(getErrorMessage(err, "Registration failed"));
    }
  });

  return (
    <form onSubmit={submitWithToast} className="space-y-3">
      <div>
        <input
          {...register("name", { required: "Full name is required" })}
          placeholder="Full Name"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register("phone", { required: "Phone number is required", minLength: { value: 6, message: "Enter a valid phone number" } })}
          placeholder="Phone Number"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address" },
          })}
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "At least 6 characters" } })}
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-lg px-3 py-2.5 text-sm"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" loading={isSubmitting}>Sign Up</Button>

      <div className="relative text-center my-2">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
        <span className="relative bg-white px-2 text-xs text-gray-400">or</span>
      </div>

      <GoogleButton label="Sign up with Google" />
    </form>
  );
}