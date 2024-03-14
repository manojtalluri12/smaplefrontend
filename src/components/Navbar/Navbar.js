import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../../App";

const Navbar = () => {
  const [token, setToken] = useContext(store);
  return (
    <div>
      {!token && (
        <ul>
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
