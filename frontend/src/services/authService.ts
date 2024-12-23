import { apiClient } from "../utils/api";


export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/api/login", { email, password }, { withCredentials: true });
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await apiClient.post("/api/register", { name, email, password }, { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/api/logout", {}, { withCredentials: true });
  return response.data;
};

export const authenticate = async () => {
  const response = await apiClient.get('/authenticate');
  return response.data;
};