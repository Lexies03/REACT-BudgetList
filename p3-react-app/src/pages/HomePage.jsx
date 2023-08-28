import Header from "../components/Header";
import Content from "../components/Content";
import { Outlet } from "react-router-dom";
import groceryImage from "../Assets/img-background.jpg";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Budget Your Grocery Today!</h1>
      <img src={groceryImage} alt="Home Image" className="groceryImage" />
    </div>
  );
};

export default HomePage;
