import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import "./RoutesMenu.scss";
import SlideBarWebMenuPanel from "../GeneralLayout/TopBar/SlideBarWebMenuPanel";

const menuItems = [
  {
    path: "/admin/home",
    icon: "building",
    text: "Panel de control",
    roles: ["admin"],
  },
  {
    path: "/news",
    icon: "calendar alternate",
    text: "Actualidad",
    roles: ["user"],
  },
  { path: "/admin/users", icon: "user", text: "Usuarios", roles: ["admin"] },
  { path: "/admin/sedes", icon: "building", text: "Sedes", roles: ["admin"] },
  {
    path: "/admin/services",
    icon: "calendar alternate",
    text: "Servicios",
    roles: ["admin"],
  },
  {
    path: "/admin/news",
    icon: "cubes",
    text: "Noticias",
    roles: ["admin"],
  },
  {
    path: "/admin/clients",
    icon: "handshake",
    text: "Clientes",
    roles: ["admin"],
  },

  {
    path: "/admin/providers",
    icon: "shipping fast",
    text: "Proveedores",
    roles: ["admin"],
  },
  {
    path: "/admin/allies",
    icon: "shipping fast",
    text: "Aliados",
    roles: ["admin"],
  },
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
  {
    path: "/admin/foundation",
    icon: "shipping fast",
    text: "Fundación",
    roles: ["admin"],
  },
];

export const RoutesMenu = ({ menuVisible, activeMenuItem }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState("");
  const isCurrentPath = (path) => {
    const { pathname } = location;
    return path === pathname;
  };

  const handleSetActiveSection = (section) => {
    console.log("Sección activa", section);
    setActiveSection(section);
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.roles.length === 0 || (user && item.roles.includes(user.role))
  );

  return (
    <div className="admin-menu-container">
        <Menu fluid vertical icon className={`admin-menu ${!menuVisible ? "hidden" :""}`}>
          {filteredMenuItems.map((item) => (
            <Menu.Item
              as={Link}
              to={item.path}
              active={activeSection === item.path} // Utiliza activeSection para determinar el elemento activo
              key={item.path}
              className={activeSection === item.path ? "active" : ""}
            >
              <Icon name={item.icon} />
              {menuVisible && item.text}{" "}
              {/* Mostrar el texto solo si el menú está visible */}
            </Menu.Item>
          ))}
        </Menu>
 
        <SlideBarWebMenuPanel handleSetActiveSection={handleSetActiveSection} className="admin-menu"  show={ menuVisible } />
    
    </div>
  );
};
