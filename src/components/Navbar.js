import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT
import axios from "axios";

const API_URL = "http://localhost:5006";

function Navbar({admin}) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  return (
    <nav>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          <NavLink to="/products">
            <button>Products</button>
          </NavLink>
          
          {admin &&
          <NavLink to="/products">
            <button>Add Product</button>
          </NavLink>}

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
