import React from "react";
import "./BackToMntoAndino.scss";
import { image } from "../../../assets";
import { Link } from "react-router-dom";

export const BackToMntoAndino = () => {
  return (
    <div className="back-to">
      <Link to="/">
        <img src={image.logomn}></img>
      </Link>
      <Link to="/">
        <button className="btn-back-to"><strong>IR ATRÁS</strong></button>
      </Link>
    </div>
  );
};
