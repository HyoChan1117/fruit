import { apiClient } from "./client";
import { CompanyInfo } from "./types";

let cachedCompanyInfo: CompanyInfo | null = null;

export function getCompanyInfo() {
  return apiClient.get<CompanyInfo>("/api/company-info").then((info) => {
    cachedCompanyInfo = info;
    return info;
  });
}

export function getCachedCompanyInfo() {
  return cachedCompanyInfo;
}

export function updateCompanyInfo(data: Partial<CompanyInfo>) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info", data);
}

export function updateAboutImage(formData: FormData) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info/about-image", formData);
}

export function updatePageBannerImage(formData: FormData) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info/page-banner-image", formData);
}

export function updatePopupBannerImage(formData: FormData) {
  return apiClient.put<CompanyInfo>("/api/admin/company-info/popup-banner-image", formData);
}
