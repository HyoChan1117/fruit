import { apiClient } from "./client";
import { Notice, NoticeListResponse } from "./types";

export function getNotices(page = 1) {
  return apiClient.get<NoticeListResponse>(`/api/notices?page=${page}`);
}

export function getNotice(id: number) {
  return apiClient.get<Notice>(`/api/notices/${id}`);
}

export function createNotice(formData: FormData) {
  return apiClient.post<Notice>("/api/admin/notices", formData);
}

export function updateNotice(id: number, formData: FormData) {
  return apiClient.put<Notice>(`/api/admin/notices/${id}`, formData);
}

export function deleteNotice(id: number) {
  return apiClient.delete<void>(`/api/admin/notices/${id}`);
}
