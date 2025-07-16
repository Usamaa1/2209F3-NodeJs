import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/profile');
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

const login = async (credentials) => {
  try {
    const res = await axios.post("/login", credentials);
    await fetchProfile();
    return { success: true, message: res.data.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.errorMessage || "Login failed",
    };
  }
};


  const register = async (data) => {
    const res = await axios.post("/register", data);
    return res.data;
  };

  const logout = async () => {
    await axios.get("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
