import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Signin from "./pages/authen.jsx";
import Knowledge from "./pages/knowledge.jsx";
import Rules from "./pages/Rules.jsx";
import Editfact from "./components/Editfact.jsx";
import Addfact from "./pages/addfact.jsx";
import Inference from "./pages/Inference.jsx";
import CategoryPage from "./pages/Category.jsx";

// Check for authentication
const isAuthenticated = () => !!localStorage.getItem("token");

// Define a wrapper for your routes that requires authentication
const requireAuth = (element) => {
  if (!isAuthenticated()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inference />,
  },
  {
    path: "/data",
    element: requireAuth(<Knowledge />),
  },
  {
    path: "/editfact/:id",
    element: requireAuth(<Editfact />),
  },

  {
    path: "/rules",
    element: requireAuth(<Rules />),
  },

  {
    path: "/categorys",
    element: requireAuth(<CategoryPage />),
  },
  {
    path: "/login",
    element: <Signin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
