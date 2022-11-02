// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [admin, setAdmin] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

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
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage text-center">
      <main className="form-signin w-100 m-auto"> 

        <form onSubmit={handleSignupSubmit}>
          <img className="mb-4" src="../images/navbar-brand.png" alt="navbar-brand" width="220" height="57" />
          <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>
          <div className="form-floating">
            <input
              required
              type="text"
              className="form-control"
              id="floatingName"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleName}
            />
            <label for="floatingName">Name</label>
          </div>
          <div className="form-floating">
            <input
              required
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            <label for="floatingInput">Email address</label>
          </div>
          {/* <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmail} /> */}
          {/* <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          /> */}
          {/* <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} /> */}
          <div className="form-floating">
            <input
              required
              type="text"
              className="form-control"
              id="floatingAddress"
              placeholder="Address"
              name="address"
              value={address}
              onChange={handleAddress}
            />
            <label for="floatingAddress">Address</label>
          </div>
          <div className="form-floating">
            <input
              required
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
            <label for="floatingPassword">Password</label>
          </div>
          {/* <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddress}
          /> */}

          {/* <button type="submit">Sign Up</button> */}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign Up
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />

        <p>Already have an account?</p>
      <Link to={"/login"}> Login</Link>
      </main>
    </div>
  );
}

export default SignupPage;
