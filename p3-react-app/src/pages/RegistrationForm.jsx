import { useState } from "react";
import Logo from "../Assets/bg-logo.png";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [errorRegister, setErrorRegister] = useState({
    errorGeneral: false,
    errorUsername: false,
    errorPassword: false,
    errorConfirmPassword: false,
    errorMatch: false,
  });

  const [registerForm, setRegisteForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = () => {
    localStorage.setItem("username", registerForm.username);
    localStorage.setItem("password", registerForm.password);
    setRegisteForm({
      ...registerForm,
      username: "",
      password: "",
      confirmPassword: "",
    });
    alert(`You are registered ${localStorage.getItem("username")}`);
  };

  const handleRegChange = (event) => {
    switch (event.target.id) {
      case "username":
        return setRegisteForm({
          ...registerForm,
          username: event.target.value,
        });
      case "password":
        return setRegisteForm({
          ...registerForm,
          password: event.target.value,
        });
      case "Cpassword":
        return setRegisteForm({
          ...registerForm,
          confirmPassword: event.target.value,
        });
      default:
        return registerForm;
    }
  };

  const handleRegSubmit = (event) => {
    event.preventDefault();

    setErrorRegister({
      ...errorRegister,
      errorGeneral:
        !registerForm.username &&
        !registerForm.password &&
        !registerForm.confirmPassword,
      errorUsername:
        !registerForm.username &&
        (registerForm.password || registerForm.confirmPassword),
      errorPassword:
        !registerForm.password &&
        (registerForm.username || registerForm.confirmPassword),
      errorConfirmPassword:
        !registerForm.confirmPassword &&
        (registerForm.username || registerForm.password),
      errorMatch: registerForm.password !== registerForm.confirmPassword,
    });

    if (
      registerForm.username &&
      registerForm.password &&
      registerForm.confirmPassword &&
      registerForm.password === registerForm.confirmPassword
    ) {
      registerUser();
    }
  };

  return (
    <div className="register-container">
      <img src={Logo} alt="logo" style={{ width: "200px", height: "200px" }} />

      <h1 className="register-header">Please Register</h1>

      <form onSubmit={handleRegSubmit} className="register-form-container">
        <div className="register-form-username registration-form">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={handleRegChange}
            value={registerForm.username}
            placeholder="Enter username"
          />
        </div>
        {errorRegister.errorUsername && (
          <p className="registration-error-message">Username cannot be blank</p>
        )}
        <div className="register-form-password registration-form">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handleRegChange}
            value={registerForm.password}
            placeholder="Enter password"
          />
        </div>
        {errorRegister.errorPassword && (
          <p className="registration-error-message">Password cannot be blank</p>
        )}
        <div className="register-form-Cpassword registration-form">
          <label htmlFor="Cpassword">Confirm Password:</label>
          <input
            type="password"
            id="Cpassword"
            onChange={handleRegChange}
            value={registerForm.confirmPassword}
            placeholder="Confirm Password"
          />
        </div>
        {errorRegister.errorConfirmPassword && (
          <p className="registration-error-message">
            Confirm password cannot be blank
          </p>
        )}

        {errorRegister.errorMatch && (
          <p className="registration-error-message">Password do not match</p>
        )}

        <div className="btn-register-container">
          <button type="submit" className="input-register btn-register-input">
            Register
          </button>

          <Link to="/login">
            <button type="submit" className="input-back btn-register-input">
              Done
            </button>
          </Link>

          {errorRegister.errorGeneral && (
            <p className="registration-error-message">
              All fields cannot be blank
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
