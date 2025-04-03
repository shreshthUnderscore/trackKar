import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Transactions from "./pages/transactions";
import { AuthProvider } from "./components/AuthProvider/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>404 Page not found</div>,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
