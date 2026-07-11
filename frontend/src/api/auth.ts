import { apiClient } from "./client";

export interface AuthUser {
  username: string;
}

export function login(username: string, password: string) {
  return apiClient.post<AuthUser>("/api/auth/login", { username, password });
}

export function logout() {
  return apiClient.post<void>("/api/auth/logout");
}

export function fetchMe() {
  return apiClient.get<AuthUser>("/api/auth/me");
}
