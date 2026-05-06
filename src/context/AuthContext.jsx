import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("prepai_token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await getCurrentUser();
      setUser(res.data.data);
    } catch (error) {
      console.error(error);
      localStorage.removeItem("prepai_token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("prepai_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};