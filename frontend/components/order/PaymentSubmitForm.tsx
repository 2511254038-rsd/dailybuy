"use client";

import { useForm } from "react-hook-form";
import Button from "@/components/common/Button";

interface PaymentSubmitFormProps {
  onSubmit: (transactionId: string) => Promise<void>;
  submitting: boolean;
}

export default function PaymentSubmitForm({ onSubmit, submitting }: PaymentSubmitFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<{ transactionId: string }>();

  const submit = (data: { transactionId: string }) => onSubmit(data.transactionId);

  return (
    <form onSubmit={handleSubmit(submit)} className="border rounded-lg p-4 mt-4 space-y-2">
      <p className="text-sm text-gray-600">
        Complete the payment on your phone, then enter the transaction ID below so we can verify it.
      </p>
      <input
        {...register("transactionId", { required: "Transaction ID is required", minLength: 3 })}
        placeholder="Transaction ID"
        className="w-full border rounded px-3 py-2"
      />
      {errors.transactionId && <p className="text-red-500 text-sm">{errors.transactionId.message}</p>}
      <Button type="submit" loading={submitting}>Submit payment</Button>
    </form>
  );
}