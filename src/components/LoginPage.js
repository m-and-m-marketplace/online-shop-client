import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

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
        <Form onSubmit={handleLoginSubmit}>
          <img
            className="mb-4"
            src="../../images/logo2.png"
            alt="logo"
            width="66px"
          />
          <h1 className="h3 mb-3 fw-normal">Please Login</h1>

          <Form.Group>
            <FloatingLabel
              controlId="floatingInput"
              label="Email Address"
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
              controlId="floatingInput"
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
            Login
          </Button>
        </Form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <br />
        <p>Don't have an account yet?</p>
        <Link className="text-decoration-none" to={"/signup"}>
          {" "}
          Sign Up
        </Link>
      </main>
    </div>
  );
}

export default LoginPage;
