import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BudgetGroceryPage from "./pages/BudgetGroceryPage";
import Content from "./components/Content";
import ListGroceryPage from "./pages/ListGroceryPage";
import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import PrivateRouter from "./ProtectPages/PrivateRouter";
import Blog from "./pages/Blog";
import Instruction from "./pages/Instruction";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <PrivateRouter>
            <Content />
          </PrivateRouter>
        ),
      },
      {
        path: "blog",
        element: (
          <PrivateRouter>
            <Blog />
          </PrivateRouter>
        ),
      },
    ],
  },

  {
    path: "budget",
    element: (
      <PrivateRouter>
        <BudgetGroceryPage />
      </PrivateRouter>
    ),
  },
  {
    path: "instruction",
    element: (
      <PrivateRouter>
        <Instruction />
      </PrivateRouter>
    ),
  },
  {
    path: "list",
    element: (
      <PrivateRouter>
        <ListGroceryPage />
      </PrivateRouter>
    ),
  },
  {
    path: "register",
    element: <RegistrationForm />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },

  // {
  //   path: "/login",
  //   element: <LoginForm />,
  // },
  // {
  //   path: "/",
  //   element: <App />,
  //   children: [
  //     {
  //       path: "home",
  //       element: (
  //         <PrivateRouter>
  //           <Content />
  //         </PrivateRouter>
  //       ),
  //     },
  //     {
  //       path: "blog",
  //       element: (
  //         <PrivateRouter>
  //           <Blog />
  //         </PrivateRouter>
  //       ),
  //     },
  //   ],
  // },

  // {
  //   path: "budget",
  //   element: (
  //     <PrivateRouter>
  //       <BudgetGroceryPage />
  //     </PrivateRouter>
  //   ),
  // },
  // {
  //   path: "instruction",
  //   element: (
  //     <PrivateRouter>
  //       <Instruction />
  //     </PrivateRouter>
  //   ),
  // },
  // {
  //   path: "list",
  //   element: (
  //     <PrivateRouter>
  //       <ListGroceryPage />
  //     </PrivateRouter>
  //   ),
  // },
  // {
  //   path: "register",
  //   element: <RegistrationForm />,
  // },
  // {
  //   path: "login",
  //   element: <LoginForm />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
