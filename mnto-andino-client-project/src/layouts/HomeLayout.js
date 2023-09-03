import React from "react";
import { WebMenu } from "../components/WebMenu";
import { CubeWithImages } from "../components/Client/CubeWithImages/CubeWithImages";

export const HomeLayout = (props) => {
  const { children } = props;

  return (
    <div>
      {/* Menu superior - header */}
      <div className="topbar-wrapper">
        <WebMenu />
      </div>
      {/* Contenido de la página */}
      <div>{children}</div>
      <div className="cube-container">
        <CubeWithImages />
      </div>
      <div className="footer">
        <div className="footer__content">
          <p>© 2023 - SENNOVALAB</p>
        </div>
      </div>
    </div>
  );
};
