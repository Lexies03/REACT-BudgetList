import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

function App() {
  return (
    <div className="main">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-outlet">
        {/* {username && password ? <Outlet /> : <HomePage />} */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
