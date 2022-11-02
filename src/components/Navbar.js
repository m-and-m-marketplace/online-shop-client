import { NavLink, Link } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context"; 


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
          <NavLink to="/products/create">
            <button>Add Product</button>
          </NavLink>}

          <NavLink to="/account">
            <button>{user && user.name}'s Account</button>
          </NavLink>

          <button onClick={logOutUser}>Logout</button>

          <NavLink to="/orders/checkout">
            <button>Cart</button>
          </NavLink>

          <br/>
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
