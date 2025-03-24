import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./LandingPage/LandingPage";

import SignUpForm from "./SignUp/SignUpForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [{ path: "sign-up", element: <SignUpForm /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
