import { api } from "api/baseApi";
import { AuthRequest, AuthResponse } from "types/auth";

export const authApi = {
  login: (data: AuthRequest) => api.post<AuthResponse>("/api/auth/login", data),

  register: (data: AuthRequest) =>
    api.post<AuthResponse>("/api/auth/registration", data),
};
