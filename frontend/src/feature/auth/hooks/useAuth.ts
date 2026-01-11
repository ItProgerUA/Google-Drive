import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { isAuth, setToken, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await authApi.login({ email, password });

      setToken(data.token, data.name);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await authApi.register({ email, password, name });
      setToken(data.token, data.name);
      navigate("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Registration failed";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return {
    isAuth,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
  };
};
