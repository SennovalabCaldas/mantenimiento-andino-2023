import React from "react";
import { WebMenu } from "../components/WebMenu";
import { CubeWithImages } from "../components/Client/CubeWithImages/CubeWithImages";

export const HomeLayout = (props) => {
  const { children } = props;

  return (
    <div>
      <WebMenu />
    </div>
  );
};
