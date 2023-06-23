"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const login = async (loginData) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        setLoggedIn(true);
        setUser(loginData.email);
        setToken(data.token);
      } else {
        setUser(null);
        setToken(null);
      }

      // Store the token in session storage
      sessionStorage.setItem("jwtToken", data.token);
      router.push("http://localhost:3001/");
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);
    setToken(null);

    // Clear the token from session storage
    sessionStorage.removeItem("jwtToken");
    router.push("/login");
    console.log("logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
