import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export function AuthProvider({ children }) {
  const token = window.localStorage.getItem("token");
  const [isSignedIn, setIsSignedIn] = useState(token ? true : false);

  useEffect(() => {
    console.log("value of sign state", isSignedIn);
    console.log("value of token", token);
  }, [token, isSignedIn]);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
