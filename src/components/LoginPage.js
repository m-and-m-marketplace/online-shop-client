import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

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
    <div className="LoginPage text-center">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleLoginSubmit}>
          <img className="mb-4" src="./images/navbar-logo.png" alt="navbar-brand" width="50" height="50" />
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>
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
          <button className="w-100 btn btn-lg btn-primary" type="submit">
          Login
          </button>

          {/* <label></label>
          <input
            // type="email"
            // name="email"
            value={email}
            onChange={handleEmail}
          /> */}

          {/* <label>Password:</label>
          <input
            // type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          /> */}

          {/* <button type="submit">Login</button> */}
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <p>Don't have an account yet?</p>
        <Link to={"/signup"}> Sign Up</Link>
      </main>
    </div>
  );
}

export default LoginPage;

