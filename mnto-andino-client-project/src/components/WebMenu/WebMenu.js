import React, { useState } from "react";
import {
  WebAliados,
  WebClients,
  WebFundation,
  WebHome,
  WebProjects,
  WebSedes,
} from "../../pages/web";
import { WebCertifications } from "../../pages/web/WebCertifications/WebCertifications";
import WebSuppliers from "../../pages/web/WebSuppliers/WebSuppliers";
import WebContactUs from "../../pages/web/WebContactUs/WebContactUs";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";
import "./WebMenu.scss";
import SlideBarWebMenu from "./SlideBarWebMenu";
import { CubeWithImages } from "../Client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { image } from "../../assets";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import { SocialSlideBar } from "./SocialSlideBar";
import WebServices from "../../pages/web/WebServices/WebServices";

export function WebMenu() {
  const [activeSection, setActiveSection] = useState("section1");
  const [showToggleButton, setShowToggleButton] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIcon = isMenuOpen ? faTimes : faBars;

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    if (section !== "section1") {
      setShowToggleButton(false);
    } else {
      setShowToggleButton(true);
    }
  };

  const toggleMenu = () => {
      
    setIsMenuOpen((prevState) => !prevState);
      
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const showSlideBar = activeSection !== "section1";
    

  return (
    <div className="webmenu-page">
      {showSlideBar && (
        <SlideBarWebMenu
          activeSection={activeSection}
          handleSetActiveSection={handleSetActiveSection}
        />
      )}
      {showToggleButton && (
        <button
          className={`menu-toggle ${isMenuOpen ? "menu-open" : "menu-closed"}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleMenu();
          }}
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={menuIcon} />
        </button>
      )}

      <nav
        className={`webmenu-page__navbar ${
          isMenuOpen ? "menu-open" : "menu-closed"
        }`}
      >
        <div className="webmenu-page__navbar__logo">
          <Link to="/login">
            <img src={image.logomn} alt="Logo" />
          </Link>
        </div>
        <ul onClick={closeMenu} className={isMenuOpen ? "horizontal" : ""}>
          <li>
            <ScrollLink
              to="section1"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section1")}
            >
              Actualidad
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section2")}
            >
              Servicios
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section3")}
            >
              Clientes
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section4"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section4")}
            >
              Proveedores
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section5"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section5")}
            >
              Aliados
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section6"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section6")}
            >
              Certificaciones
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section7"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section7")}
            >
              Proyectos
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section8"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section8")}
            >
              Fundación
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="section9"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section9")}
            >
              Contactanos
            </ScrollLink>
          </li>
          <li className="li-login-anchor">
            <Link to="/login" className="btn">
              <span>INGRESAR</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="home">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Section9 />
      </div>
      <CubeWithImages></CubeWithImages>
      <SocialSlideBar></SocialSlideBar>
      <Footer />
    </div>
  );
}

function Section1() {
  const posts = useSelector((state) => state.post.allPosts);
  return (
    <div className="section" id="section1">
      <WebHome posts={posts} />
    </div>
  );
}

function Section2() {
  return (
    <div className="section" id="section2">
      <WebServices />
    </div>
  );
}

function Section3() {
  const clients = useSelector((state) => state.client.clients);
  
  return (
    <div className="section" id="section3">
      <WebClients clients={clients} />
    </div>
  );
}
function Section4() {
  return (
    <div className="section" id="section4">
      <WebSuppliers />
    </div>
  );
}
function Section5() {
  return (
    <div className="section" id="section5">
      <WebAliados />
    </div>
  );
}
function Section6() {
  return (
    <div className="section" id="section6">
      <WebCertifications />
    </div>
  );
}
function Section7() {
  return (
    <div className="section" id="section7">
      <WebProjects />
    </div>
  );
}
function Section8() {
  return (
    <div className="section" id="section8">
      <WebFundation />
    </div>
  );
}
function Section9() {
  return (
    <div className="section" id="section9">
      <WebContactUs />
    </div>
  );
}
