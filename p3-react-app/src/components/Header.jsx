import { Link, Outlet } from "react-router-dom";
import LogoBlack from "../Assets/bg-Logo-black.png";
import Content from "./Content";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = localStorage.getItem("username"); //USE USECONTEXT FOR THIS!!
  const [selectionOption, setSelectionOption] = useState("");
  const navigate = useNavigate();

  const handleSelectionChange = (event) => {
    setSelectionOption(event.target.value);

    if (event.target.value === "Logout") {
      navigate("/login");
      //I removed the registered user here temporarily for my presentation later.
      localStorage.removeItem("username");  
      localStorage.removeItem("password");
    }
  };
  console.log(selectionOption);

  return (
    <div className="header-container">
      <nav className="header-nav">
        <div className="header-logo">
          <img
            src={LogoBlack}
            alt="logo"
            style={{ width: "50px", height: "50px" }}
          />
          <h2 className="logo">Budget Grocery App</h2>
        </div>
        <ul className="header-ul">
          <li>
            <Link className="link" to="home">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="blog">
              Blog
            </Link>
          </li>
          <li>
            {user ? (
              <select
                onChange={handleSelectionChange}
                value={selectionOption}
                className="link-selection"
              >
                <option className="link-option">{user}</option>
                <option className="link-option">Logout</option>
              </select>
            ) : (
              <Link className="link" to="login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <div className="app-content">{/* <Outlet /> */}</div>
    </div>
  );
};

export default Header;
