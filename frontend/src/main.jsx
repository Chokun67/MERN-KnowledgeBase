import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/authen.jsx";
import Knowledge from "./pages/knowledge.jsx";
import Rules from "./pages/Rules.jsx";
import Editfact from "./components/Editfact.jsx";
import Addfact from "./pages/addfact.jsx";
import Inference from "./pages/Inference.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
  },
  {
    path: "/data",
    element: <Knowledge />,
  },

  {
    path: "/editfact/:id",
    element: <Editfact />,
  },
  {
    path: "/createfact",
    element: <Addfact />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/rules/addrules",
    element: <Addfact />,
  },
  {
    path: "/inference",
    element: <Inference />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
