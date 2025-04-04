import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function LandingPage() {
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    console.log(token);
  }, [token]);
  return <></>;
}
