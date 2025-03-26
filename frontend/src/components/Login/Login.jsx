import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setError(data.message);
        // navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error); // Add this line
      setError(`Network error: ${error.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <label>
        Username:
        <input name="username" type="text" required />
      </label>
      <label>
        Password:
        <input name="password" type="password" required />
      </label>
      <button type="submit">Login </button>
    </form>
  );
}

export default Login;
