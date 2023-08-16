import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="main">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
