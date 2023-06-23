"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  function loginHandler(event) {
    event.preventDefault();
    const loginData = { email, password };
    login(loginData);
  }

  return (
    <form onSubmit={loginHandler}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
