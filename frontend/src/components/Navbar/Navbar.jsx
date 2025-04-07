import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { isSignedIn } = useContext(AuthContext);
  return (
    <>
      <ul>
        <li>
          <Link to="/sign-up">Sign In</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/transactions">Transactions</Link>
        </li>
        {isSignedIn && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
      <Outlet />
    </>
  );
}
