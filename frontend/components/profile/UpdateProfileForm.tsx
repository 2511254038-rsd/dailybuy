"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@/types";
import * as authService from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";

interface UpdateProfileFormProps {
  user: User;
  onUpdated: (user: User) => void;
}

type FormValues = {
  name: string;
  phone: string;
  avatar: string;
  line1: string;
  city: string;
  district: string;
  zip: string;
};

export default function UpdateProfileForm({ user, onUpdated }: UpdateProfileFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
      avatar: user.avatar || "",
      line1: user.address?.line1 || "",
      city: user.address?.city || "",
      district: user.address?.district || "",
      zip: user.address?.zip || "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { line1, city, district, zip, ...rest } = data;
      const res = await authService.updateProfile({
        ...rest,
        address: { line1, city, district, zip },
      });
      onUpdated(res.data.data);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update profile"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register("name")} placeholder="Full name" className="w-full border rounded px-3 py-2" />
      <input {...register("phone")} placeholder="Phone" className="w-full border rounded px-3 py-2" />
      <input {...register("avatar")} placeholder="Avatar image URL" className="w-full border rounded px-3 py-2" />

      <div className="grid grid-cols-2 gap-3">
        <input {...register("line1")} placeholder="Address line" className="border rounded px-3 py-2 col-span-2" />
        <input {...register("city")} placeholder="City" className="border rounded px-3 py-2" />
        <input {...register("district")} placeholder="District" className="border rounded px-3 py-2" />
        <input {...register("zip")} placeholder="ZIP" className="border rounded px-3 py-2 col-span-2" />
      </div>

      <Button type="submit" loading={isSubmitting}>Save changes</Button>
    </form>
  );
}