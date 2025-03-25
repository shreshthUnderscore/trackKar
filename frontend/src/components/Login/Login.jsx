import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.target);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: formData.get("username"),
            password: formData.get("password"),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Network error. Please try again.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input name="username" />
      </label>
      <label>
        Password:
        <input name="password" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
