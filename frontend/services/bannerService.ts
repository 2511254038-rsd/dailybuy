import { api } from "./api";


export interface Banner {
  _id: string;
  image: string;
  title: string;
  link: string;
  isActive: boolean;
  order: number;
}

export const getAllBanners = () => 
    api.get<{ success: boolean; data: Banner[] }>("/banners/all");

export const createBanner = (data: Partial<Banner>) =>
     api.post("/banners", data);

export const updateBanner = (id: string, data: Partial<Banner>) =>
     api.patch(`/banners/${id}`, data);

export const deleteBanner = (id: string) => 
    api.delete(`/banners/${id}`);