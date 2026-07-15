import { apiClient } from "./client";
import { CompanyInfo } from "./types";

export function getCompanyInfo() {
  return apiClient.get<CompanyInfo>("/api/company-info");
}

export function updateCompanyInfo(data: Partial<CompanyInfo>) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info", data);
}

export function updateAboutImage(formData: FormData) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info/about-image", formData);
}

export function updatePopupBannerImage(formData: FormData) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info/popup-banner-image", formData);
}
