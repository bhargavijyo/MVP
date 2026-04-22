import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you'd verify the token with the backend here
      // For now, we'll just assume it's valid if present
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (form) => {
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const signup = async (form) => {
    const res = await API.post("/auth/signup", form);
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
