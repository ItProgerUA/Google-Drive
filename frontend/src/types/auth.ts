export interface AuthRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  name: string;
}
export interface AuthState {
  token: string | null;
  isAuth: boolean;
  name: string | null;
  setToken: (token: string, name: string) => void;
  logout: () => void;
}
