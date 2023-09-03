import React, { useState } from "react";
import "./AdminLayout.scss";
import { WebMenu } from "../components/WebMenu";
import { CubeWithImages } from "../components/Client/CubeWithImages/CubeWithImages";

export const ClientLayout = (props) => {
  const { children } = props;
  const [activeSection, setActiveSection] = useState("home");
  return (
    <div>
      {/* Menu superior - header */}
      <div className="topbar-wrapper">
        <WebMenu/>
      </div>
      {/* Contenido de la página */}
      <div className="flex">
        <div className="right-panel">
          <div className="admin-layout__right-content">{children}</div>
        </div>
      </div>
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
