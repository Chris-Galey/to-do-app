"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header/header.js";
import { AuthProvider } from "./context/AuthContext.js";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo List",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
