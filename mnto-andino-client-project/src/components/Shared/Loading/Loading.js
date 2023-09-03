import React from "react";
import { Loader } from "semantic-ui-react";
import { image } from "../../../assets";
import "./Loading.scss";

export const Loading = () => {
  return (
    <>
      <div className="auth">
        <img src={image.logo} alt="" className="logo" />
        <Loader active inline="centered" />
      </div>
    </>
  );
};
