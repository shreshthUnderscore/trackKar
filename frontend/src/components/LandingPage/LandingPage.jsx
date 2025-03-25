import { React } from "react";
import SignUpForm from "../SignUp/SignUpForm";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default LandingPage;
