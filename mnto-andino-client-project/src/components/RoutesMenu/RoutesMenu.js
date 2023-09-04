import React, { useState } from "react";
import { Menu, Icon, Popup } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./RoutesMenu.scss";

const menuItems = [
  // { path: "/", icon: "building", text: "Home", roles: ["admin"] },
  { path: "/admin", icon: "building", text: "Dashboard", roles: ["admin"] },
  { path: "/admin/home", icon: "building", text: "Dashboard", roles: ["admin"] },
  {
    path: "/news",
    icon: "calendar alternate",
    text: "Actualidad",
    roles: ["user"],
  },
  { path: "/admin/sedes", icon: "building", text: "Sedes", roles: ["admin"] },
  { path: "/admin/users", icon: "user", text: "Técnicos", roles: ["admin"] },
  {
    path: "/admin/projects",
    icon: "cogs",
    text: "Proyectos",
    roles: ["admin"],
  },
  {
    path: "/admin/certifications",
    icon: "cogs",
    text: "Certificaciones",
    roles: ["admin"],
  },
  { path: "/admin/menu", icon: "cogs", text: "Menu", roles: ["admin"] },
  {
    path: "/admin/services",
    icon: "calendar alternate",
    text: "Servicios",
    roles: ["admin"],
  },
  {
    path: "/admin/clients",
    icon: "handshake",
    text: "Clientes",
    roles: ["admin"],
  },
  {
    path: "/admin/news",
    icon: "cubes",
    text: "Noticias",
    roles: ["admin"],
  },
  {
    path: "/admin/providers",
    icon: "shipping fast",
    text: "Proveedores",
    roles: ["admin"],
  },
  {
    path: "/admin/reports",
    icon: "shipping fast",
    text: "Reportes",
    roles: ["admin"],
  },
];

export const RoutesMenu = ({ menuVisible, activeMenuItem }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isCurrentPath = (path) => {
    const { pathname } = location;
    return path === pathname;
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.roles.length === 0 || (user && item.roles.includes(user.role))
  );

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({});
  const [popupContent, setPopupContent] = useState("");

  const handleMouseEnter = (event, itemText) => {
    const itemRect = event.target.getBoundingClientRect();
    const position = {
      top: itemRect.top,
      left: itemRect.right + 10, // Ajusta el desplazamiento según sea necesario
    };
    setPopupPosition(position);
    setPopupContent(itemText);
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };
  return (
    <div
      className={`${
        menuVisible ? "left-panel" : "left-panel-small"
      } admin-menu-container ${menuVisible ? "menu-visible" : "menu-hidden"}`}
    >
      <Menu
        fluid
        vertical
        icon
        className={`ui menu admin-menu ${menuVisible ? "" : "hidden"}`}
      >
        {filteredMenuItems.map((item) => (
          <Menu.Item
            as={Link}
            to={item.path}
            active={activeMenuItem === item.path} // Utiliza activeMenuItem para determinar el elemento activo
            key={item.path}
            className={activeMenuItem === item.path ? "active" : ""}
            onMouseEnter={(event) => handleMouseEnter(event, item.text)}
            onMouseLeave={handleMouseLeave}
          >
            <Icon name={item.icon} />
            {menuVisible && item.text}{" "}
            {/* Mostrar el texto solo si el menú está visible */}
          </Menu.Item>
        ))}
      </Menu>

      {popupVisible && (
        <Popup
          content={popupContent}
          position="top center" // Cambiar el valor de posición a uno válido, por ejemplo, "top center"
          style={popupPosition}
          onMouseEnter={(event) => handleMouseEnter(event, popupContent)}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};
