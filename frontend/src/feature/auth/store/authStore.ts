import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "types/auth";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuth: false,
      name: null,

      setToken: (token, name) => set({ token, isAuth: true, name }),

      logout: () => set({ token: null, isAuth: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);
