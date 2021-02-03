import React from "react";
import logo from "./wsbgif.gif";
import "./loading.css";

function Loading() {
  return (
    <div className="wsb-div">
      <img src={logo} alt="loading..." />
    </div>
  );
}

export default Loading;
