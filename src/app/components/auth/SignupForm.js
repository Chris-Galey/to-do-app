"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const signupHandler = async (event) => {
    event.preventDefault();
    const signupData = { email, password };
    console.log(signupData);
    try {
      await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: JSON.stringify(signupData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("http://localhost:3001/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={signupHandler}>
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
      <label htmlFor="password">Confirm Password</label>
      <input
        type="password"
        id="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button type="submit">Signup</button>
    </form>
  );
}
