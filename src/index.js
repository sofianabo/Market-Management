import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./Components/Bars/Bars.css";
import UserProvider from "./Context/UserContext";
import "./style.css";
import "./all.min.css";
import "./Screens/Auth/Auth.css"

/***************************Main*******************/
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
