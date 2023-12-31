import React, { useState } from "react";
import { Link } from "react-scroll";
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
import "./SlideBarWebMenu.scss";

function SlideBarWebMenu({ activeSection, handleSetActiveSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSlideBar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="slide-bar">
      {/* INICIO */}
      <Link
        to="section1"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section1")}
      >
        <div className={`icon ${activeSection === "section1" && "active"}`}>
          <FontAwesomeIcon icon={faHome} />
        </div>
      </Link>
      {/* SERVICIOS */}
      <Link
        to="section2"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section2")}
      >
        <div className={`icon ${activeSection === "section2" && "active"}`}>
          <FontAwesomeIcon icon={faFolderOpen} />
        </div>
      </Link>
      {/* CLIENTES */}
      <Link
        to="section3"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section3")}
      >
        <div className={`icon ${activeSection === "section3" && "active"}`}>
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </Link>
      {/* ALIADOS */}
      <Link
        to="section4"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section4")}
      >
        <div className={`icon ${activeSection === "section4" && "active"}`}>
          <FontAwesomeIcon icon={faTruck} />
        </div>
      </Link>
      {/* PROYECTOS */}
      <Link
        to="section5"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section5")}
      >
        <div className={`icon ${activeSection === "section5" && "active"}`}>
          <FontAwesomeIcon icon={faRocket} />
        </div>
      </Link>

      {/* FUNDACIONES */}
      <Link
        to="section6"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section6")}
      >
        <div className={`icon ${activeSection === "section6" && "active"}`}>
          <FontAwesomeIcon icon={faHandHoldingHeart} />
        </div>
      </Link>
      {/* CONTACTO */}
      <Link
        to="section7"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={() => handleSetActiveSection("section7")}
      >
        <div className={`icon ${activeSection === "section7" && "active"}`}>
          <FontAwesomeIcon icon={faPhone} />
        </div>
      </Link>
      <div className="toggle-button" onClick={toggleSlideBar}>
        Menú
      </div>
    </div>
  );
}

export default SlideBarWebMenu;
