"use client";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  console.log(user, token);
  const login = async (loginData) => {
    console.log(loginData);
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    console.log(data);
    // if (response.ok) {
    //   setUser(data.user);
    //   setToken(data.token);
    // } else {
    //   setUser(null);
    //   setToken(null);
    // }
  };

  const logout = async () => {
    setUser(null);
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
