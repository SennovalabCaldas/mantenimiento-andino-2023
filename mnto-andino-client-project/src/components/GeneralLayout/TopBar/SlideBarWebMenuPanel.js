import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core"; // Importa library desde FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faBuilding,
  faCalendar,
  faTruck,
  faTruckFast,
  faHandshake,
  faCertificate,
  faFolderOpen,
  faUser,
  faCogs,
  faInstitution,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
// import "../../../scss/index.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

library.add(
  faBuilding,
  faNewspaper,
  faCalendar,
  faTruck,
  faTruckFast,
  faCertificate,
  faHandshake,
  faFolderOpen, 
  faUser,
  faCogs,
  faInstitution,
  faSitemap,
);

const menuItems = [
  {
    path: "/admin/home",
    icon: faBuilding,
    roles: ["admin"],
  },
  {
    path: "/news",
    icon: faNewspaper,
    roles: ["user"],
  },
  { path: "/admin/users", icon: faUser, roles: ["admin"] },
  { path: "/admin/sedes", icon: faBuilding, roles: ["admin"] },
  {
    path: "/admin/services",
    icon: faCalendar,
    roles: ["admin"],
  },
  {
    path: "/admin/news",
    icon: faNewspaper,
    roles: ["admin"],
  },
  {
    path: "/admin/clients",
    icon: faHandshake,
    roles: ["admin"],
  },
  {
    path: "/admin/providers",
    icon: faTruckFast,
    roles: ["admin"],
  },
  {
    path: "/admin/allies",
    icon: faTruck,
    roles: ["admin"],
  },
  {
    path: "/admin/projects",
    icon: faSitemap,
    roles: ["admin"],
  },
  {
    path: "/admin/certifications",
    icon: faCertificate,
    roles: ["admin"],
  },
  {
    path: "/admin/foundation",
    icon: faInstitution,
    roles: ["admin"],
  },
];

function SlideBarWebMenuPanel({
  handleSetActiveSection,
  show,
  activeMenuItem,
}) {
  const [activeSection, setActiveSection] = useState("");
  const user = useSelector((state) => state.auth.user);

  const handleClick = (section) => {
      
    setActiveSection(section);
    handleSetActiveSection(section);
  };

  useEffect(() => {
      
  }, [activeSection]);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.roles.length === 0 || (user && item.roles.includes(user.role))
  );

  return (
    <div className={` slide-bar-panel ${show ? "" : "show"}`}>
      {filteredMenuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          onClick={() => handleClick(menuItem.path)}
          className={`icon-panel ${
            activeMenuItem === menuItem.path ? "active" : ""
          }`}
          key={menuItem.path}
        >
          <FontAwesomeIcon
            icon={menuItem.icon}
            className="icon-panel"
            title="test"
          />
        </Link>
      ))}
    </div>
  );
}

export default SlideBarWebMenuPanel;
