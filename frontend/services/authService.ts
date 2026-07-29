
import { User } from "@/types";
import { api } from "./api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Customer extends User {
  isDisabled: boolean;
}

export const getCustomers = () =>
   api.get<{ success: boolean; data: Customer[] }>("/users/admin/customers");

export const setCustomerDisabled = (id: string, disabled: boolean) =>
  api.patch<{ success: boolean; data: Customer }>(`/users/admin/customers/${id}/disable`, { disabled });

export const registerUser = (data: RegisterPayload) =>
   api.post("/users/register", data);

export const verifyEmail = (token: string) => 
  api.get(`/users/verify-email?token=${token}`);

export const loginUser = (data: LoginPayload) =>
  api.post<{ success: boolean; data: User }>("/users/login", data);

export const logoutUser = () => 
  api.post("/users/logout");

export const getProfile = () => 
  api.get<{ success: boolean; data: User }>("/users/profile");

export const updateProfile = (data: Partial<User>) => 
  api.patch("/users/profile", data);