import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpForm from "./components/SignUp/SignUpForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      { path: "sign-up", element: <SignUpForm /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
