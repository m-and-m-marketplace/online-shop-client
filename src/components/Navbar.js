import { NavLink, Link } from "react-router-dom";
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context"; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationSystem({admin}) {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  return (
    <Navbar bg="light" expand="lg">
      {/* <Container> */}
      <Navbar.Brand><img className="" src="../images/navbar-logo.png" alt="logo"/>boolean balloons</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="me-auto justify-content-end">
          <Nav className="">       
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
          </Nav>
            {/*    UPDATE     */}
            {isLoggedIn && (
              <>
              {admin &&
                <Nav.Link href="/products/create">Add New Product</Nav.Link>}

          <Nav>
          <Nav.Link href="/account"><img className="" src="../images/profile.png" alt="profile"/>
          </Nav.Link>


          <Nav.Link href="/orders/checkout"><img className="" src="../images/cart.png" alt="cart"/>
          </Nav.Link>
          </Nav>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </>
      )}
          </Nav>
        </Navbar.Collapse> 
      {/* </Container> */}
    </Navbar>
  );
}

export default NavigationSystem;
