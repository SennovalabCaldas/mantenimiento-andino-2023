import React, { useState } from "react";
import "./AdminLayout.scss";
import TopBar from "../components/GeneralLayout/TopBar";
import { useLocation } from "react-router-dom";
import { RoutesMenu } from "../components/RoutesMenu/RoutesMenu";

export const AdminLayout = (props) => {
  const { children } = props;
  const [menuVisible, setMenuVisible] = useState(true);
  const location = useLocation();
  const activeMenuItem = location.pathname;

  return (
    <div>
      {/* Menu superior - header */}
      <div className="topbar-wrapper">
        <TopBar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
      </div>
      {/* Contenido de la página */}
      <div className="flex-dashboard">
        <RoutesMenu menuVisible={menuVisible} activeMenuItem={activeMenuItem}/>
        <div className="right-panel">
          <div className="admin-layout__right-content">{children}</div>
        </div>
      </div>
    </div>
  );
};
