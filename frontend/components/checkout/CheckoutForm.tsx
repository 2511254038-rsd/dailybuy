"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { ShippingAddress, PlaceOrderPayload } from "@/services/orderService";
import Button from "@/components/common/Button";

interface CheckoutFormProps {
  onSubmit: (payload: PlaceOrderPayload) => Promise<void>;
  submitting: boolean;
}

type FormValues = ShippingAddress & { paymentMethod: "cod" | "bkash" | "nagad" };

export default function CheckoutForm({ onSubmit, submitting }: CheckoutFormProps) {
  const { user } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      line1: user?.address?.line1 || "",
      city: user?.address?.city || "",
      district: user?.address?.district || "",
      zip: user?.address?.zip || "",
      paymentMethod: "cod",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const submit = (data: FormValues) => {
    const { paymentMethod, ...shippingAddress } = data;
    return onSubmit({ shippingAddress, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <div>
        <h2 className="font-semibold mb-2">Shipping address</h2>
        <div className="grid grid-cols-2 gap-3">
          <input {...register("name", { required: true })} placeholder="Full name" className="border rounded px-3 py-2 col-span-2" />
          <input {...register("phone", { required: true })} placeholder="Phone" className="border rounded px-3 py-2 col-span-2" />
          <input {...register("line1", { required: true })} placeholder="Address line" className="border rounded px-3 py-2 col-span-2" />
          <input {...register("city", { required: true })} placeholder="City" className="border rounded px-3 py-2" />
          <input {...register("district", { required: true })} placeholder="District" className="border rounded px-3 py-2" />
          <input {...register("zip", { required: true })} placeholder="ZIP" className="border rounded px-3 py-2 col-span-2" />
        </div>
        {(errors.name || errors.phone || errors.line1 || errors.city || errors.district || errors.zip) && (
          <p className="text-red-500 text-sm mt-1">Please fill in all address fields</p>
        )}
      </div>

      <div>
        <h2 className="font-semibold mb-2">Payment method</h2>
        <div className="space-y-2">
          {[
            { value: "cod", label: "Cash on delivery" },
            { value: "bkash", label: "bKash" },
            { value: "nagad", label: "Nagad" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
              <input type="radio" value={option.value} {...register("paymentMethod")} />
              {option.label}
            </label>
          ))}
        </div>
        {paymentMethod !== "cod" && (
          <p className="text-sm text-gray-500 mt-2">
            You'll submit your transaction ID after placing the order, once you complete the {paymentMethod} payment.
          </p>
        )}
      </div>

      <Button type="submit" loading={submitting}>Place order</Button>
    </form>
  );
}