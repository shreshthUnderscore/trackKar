import React, { useEffect, useState } from "react";

export default function Login() {
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
