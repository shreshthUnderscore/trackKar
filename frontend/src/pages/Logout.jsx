import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSignedIn) {
      setIsSignedIn(false);
      window.localStorage.removeItem("token");
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  });
}
