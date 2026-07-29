"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Button from "@/components/common/Button";

interface ProductFormProps {
  initial?: Partial<Product>;
  onSubmit: (data: Partial<Product>) => Promise<void>;
}

type FormValues = {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  images: string; // comma-separated in the form, split before submit
  isActive: boolean;
};

export default function ProductForm({ initial, onSubmit }: ProductFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      title: initial?.title || "",
      description: initial?.description || "",
      price: initial?.price || 0,
      discountPrice: initial?.discountPrice,
      stock: initial?.stock || 0,
      category: initial?.category || "",
      images: initial?.images?.join(",") || "",
      isActive: initial?.isActive ?? true,
    },
  });

  const submit = async (data: FormValues) => {
    try {
      await onSubmit({
        ...data,
        images: data.images.split(",").map((s) => s.trim()).filter(Boolean),
      });
      toast.success(initial ? "Product updated" : "Product created");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save product"));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3 max-w-md">
      <input {...register("title", { required: true })} placeholder="Title" className="w-full border rounded px-3 py-2" />
      <textarea {...register("description")} placeholder="Description" className="w-full border rounded px-3 py-2" />
      <div className="grid grid-cols-2 gap-3">
        <input type="number" step="0.01" {...register("price", { required: true, valueAsNumber: true })} placeholder="Price" className="border rounded px-3 py-2" />
        <input type="number" step="0.01" {...register("discountPrice", { valueAsNumber: true })} placeholder="Discount price" className="border rounded px-3 py-2" />
        <input type="number" {...register("stock", { required: true, valueAsNumber: true })} placeholder="Stock" className="border rounded px-3 py-2" />
        <input {...register("category", { required: true })} placeholder="Category" className="border rounded px-3 py-2" />
      </div>
      <input {...register("images")} placeholder="Image URLs, comma-separated" className="w-full border rounded px-3 py-2" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isActive")} /> Active
      </label>
      <Button type="submit" loading={isSubmitting}>{initial ? "Save changes" : "Create product"}</Button>
    </form>
  );
}