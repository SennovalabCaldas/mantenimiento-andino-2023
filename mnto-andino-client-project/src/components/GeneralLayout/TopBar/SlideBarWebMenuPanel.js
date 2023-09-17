import React, { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core"; // Importa library desde FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faCalendar,
  faCubes,
  faTruck,
  faHandshake,
  faCertificate,
  faHandHoldingHeart,
  faRocket,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
// import "../../../scss/index.scss";
import { Icon } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

library.add(
  faBuilding,
  faCalendar,
  faCubes,
  faTruck,
  faCertificate,
  faHandshake,
  faHandHoldingHeart,
  faRocket,
  faFolderOpen
);

const menuItems = [
  // { path: "/", icon: faBuilding, text: "Home", roles: ["admin"] },
  // { path: "/admin", icon: faBuilding, text: "Home", roles: ["admin"] },
  {
    path: "/admin/home",
    icon: faBuilding,
    roles: ["admin"],
  },
  {
    path: "/news",
    icon: faHome,
    roles: ["user"],
  },
  { path: "/admin/users", icon: faHome,  roles: ["admin"] },
  { path: "/admin/sedes", icon: faHome, roles: ["admin"] },
  {
    path: "/admin/services",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/news",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/clients",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/providers",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/allies",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/projects",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/certifications",
    icon: faHome,
    roles: ["admin"],
  },
  {
    path: "/admin/foundation",
    icon: faHome,
    roles: ["admin"],
  },
];

function SlideBarWebMenuPanel({ handleSetActiveSection, show }) {
  const [activeSection, setActiveSection] = useState("");
  const user = useSelector((state) => state.auth.user);


  const handleClick = (section) => {
    console.log("Se hizo clic en el elemento del menú:", section);
    setActiveSection(section);
    handleSetActiveSection(section);
  };

  useEffect(() => {
    console.log("activeSection actualizado:", activeSection);
  }, [activeSection]);

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.roles.length === 0 || (user && item.roles.includes(user.role))
  );

  return (
    <div className={` slide-bar-panel ${show ? "" :"show"}`}>
      {filteredMenuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          onClick={() => handleClick(menuItem.path)}
          className={`icon-panel ${
            activeSection === menuItem.path ? "active" : ""
          }`}
        >
          <FontAwesomeIcon icon={menuItem.icon} className="icon-panel" title="test" />
        </Link>
      ))}
    </div>
  );
}

export default SlideBarWebMenuPanel;
