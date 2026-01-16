import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <div className="bg-shapes">
      <div className="shape one"></div>
      <div className="shape two"></div>
      <div className="shape three"></div>
    </div>
    <App />
  </>
);
