import { apiClient } from "./client";
import { GalleryImage } from "./types";

export function getGalleryImages() {
  return apiClient.get<GalleryImage[]>("/api/gallery");
}

export function createGalleryImage(formData: FormData) {
  return apiClient.post<GalleryImage>("/api/admin/gallery", formData);
}

export function deleteGalleryImage(id: number) {
  return apiClient.delete<void>(`/api/admin/gallery/${id}`);
}
