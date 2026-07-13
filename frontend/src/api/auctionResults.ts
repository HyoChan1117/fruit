import { apiClient } from "./client";
import { AuctionResult, AuctionResultListResponse } from "./types";

export function getAuctionResults(page = 1, date?: string, searchField?: string, search?: string) {
  const dateQuery = date ? `&date=${date}` : "";
  const searchQuery =
    search && searchField ? `&searchField=${searchField}&search=${encodeURIComponent(search)}` : "";
  return apiClient.get<AuctionResultListResponse>(`/api/auction-results?page=${page}${dateQuery}${searchQuery}`);
}

export function getRecentAuctionResults(limit = 5) {
  return apiClient.get<AuctionResult[]>(`/api/auction-results/recent?limit=${limit}`);
}

export function createAuctionResult(data: {
  auctionDate: string;
  ownerName: string;
  productName: string;
  variety: string;
  grade: string;
  weight: number;
  quantity: number;
  unitPrice: number;
}) {
  return apiClient.post<AuctionResult>("/api/admin/auction-results", data);
}

export function updateAuctionResult(
  id: number,
  data: {
    auctionDate: string;
    ownerName: string;
    productName: string;
    variety: string;
    grade: string;
    weight: number;
    quantity: number;
    unitPrice: number;
  }
) {
  return apiClient.put<AuctionResult>(`/api/admin/auction-results/${id}`, data);
}

export function deleteAuctionResult(id: number) {
  return apiClient.delete<void>(`/api/admin/auction-results/${id}`);
}
