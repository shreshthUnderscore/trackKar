import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
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
    </ul>
  );
}
