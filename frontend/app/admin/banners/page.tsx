"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as bannerService from "@/services/bannerService";
import { Banner } from "@/services/bannerService";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";
import { getErrorMessage } from "@/utils/getErrorMessage";

type FormValues = { image: string; title: string; link: string; order: number };

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<FormValues>();

  const fetchBanners = async () => {
    const res = await bannerService.getAllBanners();
    setBanners(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      await bannerService.createBanner(data);
      toast.success("Banner created");
      reset();
      fetchBanners();
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not create banner"));
    }
  };

  const toggleActive = async (banner: Banner) => {
    await bannerService.updateBanner(banner._id, { isActive: !banner.isActive });
    fetchBanners();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    await bannerService.deleteBanner(id);
    fetchBanners();
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="text-lg font-semibold mb-4">Banners</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6 max-w-2xl">
        <input {...register("image", { required: true })} placeholder="Image URL" className="border rounded px-3 py-2 flex-1" />
        <input {...register("title")} placeholder="Title" className="border rounded px-3 py-2 w-32" />
        <input {...register("link")} placeholder="Link" className="border rounded px-3 py-2 w-32" />
        <input type="number" {...register("order", { valueAsNumber: true })} placeholder="Order" className="border rounded px-3 py-2 w-20" />
        <Button type="submit" loading={isSubmitting} className="w-auto px-4">Add</Button>
      </form>

      <div className="space-y-2">
        {banners.map((b) => (
          <div key={b._id} className="flex items-center gap-4 border rounded px-4 py-2">
            <img src={b.image} alt={b.title} className="w-20 h-12 object-cover rounded" />
            <span className="flex-1 text-sm">{b.title || "(untitled)"}</span>
            <button onClick={() => toggleActive(b)} className="text-sm">
              {b.isActive ? "Active" : "Inactive"}
            </button>
            <button onClick={() => handleDelete(b._id)} className="text-red-500 text-sm">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}