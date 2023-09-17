import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core"; // Importa library desde FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faGlobe,
  faTruck,
  faPhone,
  faCertificate,
  faHandshake,
  faHandHoldingHeart,
  faRocket,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import "../../../scss/index.scss";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";

library.add(
  faHome,
  faNewspaper,
  faGlobe,
  faTruck,
  faPhone,
  faCertificate,
  faHandshake,
  faHandHoldingHeart,
  faRocket,
  faFolderOpen
);

const menuItems = [
  // { path: "/", icon: "building", text: "Home", roles: ["admin"] },
  { path: "/admin", icon: faHome, text: "Home", roles: ["admin"] },
  {
    path: "/admin/home",
    icon: faHome,
    text: "Panel de control",
    roles: ["admin"],
  },
  {
    path: "/news",
    icon: faHome,
    text: "Actualidad",
    roles: ["user"],
  },
  { path: "/admin/users", icon: faHome, text: "Usuarios", roles: ["admin"] },
  { path: "/admin/sedes", icon: faHome, text: "Sedes", roles: ["admin"] },
  {
    path: "/admin/services",
    icon: faHome,
    text: "Servicios",
    roles: ["admin"],
  },
  {
    path: "/admin/news",
    icon: faHome,
    text: "Noticias",
    roles: ["admin"],
  },
  {
    path: "/admin/clients",
    icon: faHome,
    text: "Clientes",
    roles: ["admin"],
  },
  {
    path: "/admin/providers",
    icon: faHome,
    text: "Proveedores",
    roles: ["admin"],
  },
  {
    path: "/admin/suppliers",
    icon: faHome,
    text: "Aliados",
    roles: ["admin"],
  },
  {
    path: "/admin/projects",
    icon: faHome,
    text: "Proyectos",
    roles: ["admin"],
  },
  {
    path: "/admin/certifications",
    icon: faHome,
    text: "Certificaciones",
    roles: ["admin"],
  },
  {
    path: "/admin/reports",
    icon: faHome,
    text: "Reportes",
    roles: ["admin"],
  },
];

function SlideBarWebMenuPanel({ handleSetActiveSection }) {
  const [activeSection, setActiveSection] = useState("");

  const handleClick = (section) => {
    console.log("Se hizo clic en el elemento del menú:", section);
    setActiveSection(section);
    handleSetActiveSection(section);
  };

  useEffect(() => {
    console.log("activeSection actualizado:", activeSection);
  }, [activeSection]);

  return (
    <div className="slide-bar-panel">
      {menuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          onClick={() => handleClick(menuItem.path)}
          className={`icon-panel ${
            activeSection === menuItem.path ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={menuItem.icon} className="icon-panel" />
        </Link>
      ))}
    </div>
  );
}

export default SlideBarWebMenuPanel;
