import React from "react";

import "./InfoBar.css";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img
          className="onlineIcon"
          src={require("../../Icons/onlineIcon.png")}
          alt="online image"
        />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={require("../../Icons/close.png")} alt="close" />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
