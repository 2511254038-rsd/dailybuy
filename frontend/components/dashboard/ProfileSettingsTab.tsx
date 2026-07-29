"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@/types";
import * as authService from "@/services/authService";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";

interface ProfileSettingsTabProps {
  user: User;
  onUpdated: (user: User) => void;
}

type FormValues = {
  name: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  dateOfBirth: string;
};

export default function ProfileSettingsTab({ user, onUpdated }: ProfileSettingsTabProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      name: user.name,
      phone: user.phone,
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await authService.updateProfile({
        name: data.name,
        phone: data.phone,
        gender: data.gender || undefined,
        dateOfBirth: data.dateOfBirth || undefined,
      });
      onUpdated(res.data.data);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update profile"));
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="text-xs text-gray-500">Full Name</label>
          <input {...register("name")} className="w-full border rounded-lg px-3 py-2 text-sm mt-1" />
        </div>

        <div>
          <label className="text-xs text-gray-500">Phone</label>
          <input {...register("phone")} className="w-full border rounded-lg px-3 py-2 text-sm mt-1" />
        </div>

        <div>
          <label className="text-xs text-gray-500">Email</label>
          <input value={user.email} readOnly disabled className="w-full border rounded-lg px-3 py-2 text-sm mt-1 bg-gray-50 text-gray-500" />
        </div>

        <div>
          <label className="text-xs text-gray-500">Gender (optional)</label>
          <select {...register("gender")} className="w-full border rounded-lg px-3 py-2 text-sm mt-1">
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Birthday — unlock lucky offers 🎁</label>
          <input {...register("dateOfBirth")} type="date" className="w-full border rounded-lg px-3 py-2 text-sm mt-1" />
        </div>

        <Button type="submit" loading={isSubmitting} className="w-auto px-6">Save Changes</Button>
      </form>

      <div className="border rounded-lg p-4 bg-orange-50">
        <p className="text-sm font-medium">Reward Points</p>
        <p className="text-2xl font-bold mt-1" style={{ color: "var(--color-brand)" }}>
          {user.rewardPoints ?? 0} pts
        </p>
        <p className="text-xs text-gray-500 mt-1">Earn points on every order — redeem at checkout (coming soon).</p>
      </div>
    </div>
  );
}