import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/transactions", { replace: true });
    }
  }, [navigate, isSignedIn]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
          }),
        }
      );
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setIsSignedIn(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input name="username" type="text" required />
        </label>
        <label>
          Password:
          <input name="password" type="password" required />
        </label>

        <button>Login</button>
      </form>
    </>
  );
}
