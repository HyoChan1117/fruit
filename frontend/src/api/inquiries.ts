import { apiClient } from "./client";
import { Inquiry } from "./types";

export function createInquiry(data: { name: string; contact: string; message: string }) {
  return apiClient.post<Inquiry>("/api/inquiries", data);
}

export function getInquiries() {
  return apiClient.get<Inquiry[]>("/api/admin/inquiries");
}

export function markInquiryRead(id: number) {
  return apiClient.put<Inquiry>(`/api/admin/inquiries/${id}/read`);
}

export function deleteInquiry(id: number) {
  return apiClient.delete<void>(`/api/admin/inquiries/${id}`);
}
