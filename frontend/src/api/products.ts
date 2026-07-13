import { apiClient } from "./client";
import { Product } from "./types";

export function getProducts(name?: string) {
  const query = name ? `?name=${encodeURIComponent(name)}` : "";
  return apiClient.get<Product[]>(`/api/products${query}`);
}

export function getProduct(id: number) {
  return apiClient.get<Product>(`/api/products/${id}`);
}

export function createProduct(formData: FormData) {
  return apiClient.post<Product>("/api/admin/products", formData);
}

export function updateProduct(id: number, formData: FormData) {
  return apiClient.put<Product>(`/api/admin/products/${id}`, formData);
}

export function deleteProduct(id: number) {
  return apiClient.delete<void>(`/api/admin/products/${id}`);
}
