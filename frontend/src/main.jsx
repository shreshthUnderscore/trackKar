import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./signup";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
