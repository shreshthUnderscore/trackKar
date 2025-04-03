import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    // console.log("token", token);
    // console.log("isSignedIn", isSignedIn);
  }, []);
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
