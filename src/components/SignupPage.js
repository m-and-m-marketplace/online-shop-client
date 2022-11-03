// src/pages/SignupPage.js

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [admin, setAdmin] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleAdmin = (e) => setAdmin(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, address, admin };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        handleLoginSubmit(e);
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage text-center">
      <main className="form-signin w-100 m-auto">
        <Form onSubmit={handleSignupSubmit}>
          <img
            className="mb-4"
            src="../images/navbar-logo.png"
            alt="logo"
            width="50"
            height="50"
          />
          <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
          <Form.Group>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleName}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email Adress"
              className="mb-3"
            >
              <Form.Control
                required
                type="email"
                className="form-control mb-3"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              controlId="floatingAddress"
              label="Adress"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                className="form-control mb-3"
                id="floatingAddress"
                placeholder="Address"
                name="address"
                value={address}
                onChange={handleAddress}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                required
                type="password"
                className="form-control mb-3"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handlePassword}
              />
            </FloatingLabel>
          </Form.Group>

          <Button className="mb-3 btn-lg w-100" variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />

        <p>Already have an account?</p>
        <Link className="text-decoration-none" to={"/login"}>
          {" "}
          Login
        </Link>
      </main>
    </div>
  );
}

export default SignupPage;
