import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Transactions() {
  const { isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isSignedIn === false) {
      navigate("/sign-up", { replace: true });
    }
  }, [navigate, isSignedIn]);
  return (
    <>
      <h1>This is a protected route</h1>
    </>
  );
}
