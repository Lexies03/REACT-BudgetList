import { useState } from "react";
import Logo from "../Assets/bg-logo.png";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const user = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  const navigate = useNavigate();

  const [errorLogin, setErrorLogin] = useState({
    errorGeneral: false,
    errorUsername: false,
    errorPassword: false,
    errorMatch: false,
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleLogChange = (event) => {
    switch (event.target.id) {
      case "username":
        return setLoginForm({
          ...loginForm,
          username: event.target.value,
        });
      case "password":
        return setLoginForm({
          ...loginForm,
          password: event.target.value,
        });

      default:
        return loginForm;
    }
  };

  const handleLogSubmit = (event) => {
    event.preventDefault();

    setErrorLogin({
      ...errorLogin,
      errorGeneral: !loginForm.username && !loginForm.password,
      errorUsername: !loginForm.username && loginForm.password,
      errorPassword: loginForm.username && !loginForm.password,
      errorMatch:
        (loginForm.username !== user || loginForm.password !== password) &&
        loginForm.username &&
        loginForm.password,
    });

    if (
      user === loginForm.username &&
      password === loginForm.password &&
      loginForm.username &&
      loginForm.password
    ) {
      alert(`Welcome ${user}`);
      navigate("/home");
    }
  };

  return (
    <div className="login-main-container">
      <div className="login-logo">
        <img
          src={Logo}
          alt="logo"
          style={{ width: "400px", height: "400px" }}
        />
      </div>
      <div className="login-container">
        <h1 className="login-header-quote"> Budget Your Groceries Today!</h1>

        <br />
        <form onSubmit={handleLogSubmit} className="register-form-container">
          <h1 className="register-header">Please Login</h1>
          <div className="register-form-username registration-form">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              onChange={handleLogChange}
              placeholder="Enter username"
            />
          </div>
          {errorLogin.errorUsername && (
            <p className="registration-error-message">
              Username cannot be blank
            </p>
          )}

          <div className="register-form-password registration-form">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={handleLogChange}
              placeholder="Enter password"
            />
          </div>

          {errorLogin.errorPassword && (
            <p className="registration-error-message">
              Password cannot be blank
            </p>
          )}

          {errorLogin.errorMatch && (
            <p className="registration-error-message">
              Username and password did not match.
            </p>
          )}

          <div className="btn-login-container">
            <button
              className="btn-login btn-login-form"
              onClick={handleLogSubmit}
            >
              Login
            </button>

            <Link to="/register">
              <button className="btn-register btn-login-form">Sign Up</button>
            </Link>
          </div>
          {errorLogin.errorGeneral && (
            <p className="registration-error-message">
              All fields cannot be blank
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
