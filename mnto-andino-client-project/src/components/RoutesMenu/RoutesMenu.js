import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./RoutesMenu.scss";
import { image } from "../../assets";

const menuItems = [
  {
    path: "/admin/dashboard",
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
    path: "/admin/departments-clients",
    icon: "handshake",
    text: "Departamentos clientes",
    roles: ["admin"],
  },
  {
    path: "/admin/testimonies",
    icon: "handshake",
    text: "Testimonios",
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
    icon: "sitemap",
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
    icon: "university",
    text: "Fundación",
    roles: ["admin"],
  },
  {
    path: "/admin/makinandina",
    icon: "university",
    text: "Makina Andina",
    roles: ["admin"],
  },
  {
    path: "/admin/makinandinamiami",
    icon: "university",
    text: "Makina Andina Miami",
    roles: ["admin"],
  },
  {
    path: "/admin/glamping",
    icon: "university",
    text: "Glamping",
    roles: ["admin"],
  },
];

export const RoutesMenu = ({ menuVisible, activeMenuItem }) => {
  const user = useSelector((state) => state.auth.user);
  const [activeSection, setActiveSection] = useState("");

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.roles.length === 0 || (user && item.roles.includes(user.role))
  );

  return (
    <div className="admin-menu-container">
      <div className="admin-menu-header">
        <img src={image.logomn} alt="logo" />
      </div>
      <Menu
        fluid
        vertical
        icon
        className={`admin-menu ${!menuVisible ? "hidden" : ""}`}
      >
        {filteredMenuItems.map((item) => (
          <Menu.Item
            as={Link}
            to={item.path}
            active={activeMenuItem === item.path}
            key={item.path}
            className={activeSection === item.path ? "active" : ""}
          >
            <Icon name={item.icon} />
            {menuVisible && item.text}{" "}
          </Menu.Item>
        ))}
      </Menu>
      <div>
        <div className="admin-menu-footer">
          <img src={image.logoSennovalabNoC} alt="logo" />
          <p>
            <strong>© 2023 SENNOVALAB</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
