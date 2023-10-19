import React, { useEffect, useState } from "react";
import {
  WebAliados,
  WebClients,
  WebFundation,
  WebHome,
  WebProjects,
  WebSedes,
  WebServices,
} from "../../pages/web";
import { WebCertifications } from "../../pages/web/WebCertifications/WebCertifications";
import { WebContactUs } from "../../pages/web/WebContactUs/WebContactUs";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import { getAllCategoriesService } from "../../actions/categoryServiceActions";
import { getServices } from "../../actions/serviceActions";
import { getAllClients } from "../../actions/clientActions";
import { getAllAllies } from "../../actions/allyActions";
import { getAllCertifications } from "../../actions/certificationActions";
import { getAllProjects } from "../../actions/projectActions";
import { getAllFoundationsNews } from "../../actions/foundationNewsActions";

import { CubeWithImages } from "../Client";
import { image } from "../../assets";
import SlideBarWebMenu from "./SlideBarWebMenu";
import { SocialSlideBar } from "./SocialSlideBar";
import Footer from "../Shared/Footer/Footer";
import "./WebMenu.scss";
import { Link } from "react-router-dom";

export const WebMenu = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("section1");
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllCategoriesService());
    dispatch(getServices());
    dispatch(getAllClients());
    dispatch(getAllAllies());
    dispatch(getAllCertifications());
    dispatch(getAllProjects());
    dispatch(getAllFoundationsNews());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setShowToggleButton(section !== "section1");

    // Renderizar los componentes SlideBarWebMenu y SocialSlideBar
    if (section !== "section1") {
      return (
        <>
          <SlideBarWebMenu />
          <SocialSlideBar />
        </>
      );
    } else {
      return null; // Si la sección es "section1", no renderizar los componentes
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const services = useSelector((state) => state.service.services);
  const categoryServices = useSelector(
    (state) => state.categoryService.allCategoriesService
  );

  const filteredServices = services.filter((service) =>
    service.nameService.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false); // Cierra el menú después de hacer clic en un enlace
  };

  return (
    <div className="webmenu-page">
      <div className="header">
        <div id="topbarMenu" className="topbarMenu">
          <div className="social-icons">
            <img src={image.linkedin} alt="facebook" />
            <img src={image.whatsApp} alt="facebook" />
            <img src={image.location} alt="facebook" />
            <img src={image.email} alt="facebook" />
          </div>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Buscar..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div id="menuBar" className="menuBar">
          <div className="logo">
            <img src={image.logomnbg} alt="logo" />
          </div>
          <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
            <div className="navbar-toggle" onClick={toggleMenu}>
              ☰
            </div>
            <div className="navbar-options">
              <a href="#home" onClick={() => scrollToSection("section1")}>
                Inicio
              </a>
              <a href="#services" onClick={() => scrollToSection("section2")}>
                Servicios
              </a>
              <a href="#clients" onClick={() => scrollToSection("section3")}>
                Clientes
              </a>
              <a href="#projects" onClick={() => scrollToSection("section4")}>
                Aliados
              </a>
              <a href="#allies" onClick={() => scrollToSection("section5")}>
                Proyectos
              </a>
              <a
                href="#foundations"
                onClick={() => scrollToSection("section7")}
              >
                Fundaciones
              </a>
              <a href="#contact" onClick={() => scrollToSection("section8")}>
                Contacto
              </a>
              {/* INiciar sesión */}
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </nav>
        </div>
      </div>

      <div className="home">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
      </div>
      <SocialSlideBar />
      <SlideBarWebMenu
        activeSection={activeSection}
        handleSetActiveSection={handleSetActiveSection}
      />
      <CubeWithImages />
      <Footer />
    </div>
  );
};

function Section1() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  const posts = useSelector((state) => state.post.allPosts);
  return (
    <div className="section" id="section1">
      <WebHome posts={posts} />
    </div>
  );
}
function Section2() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategoriesService());
    dispatch(getServices());
  }, [dispatch]);

  const categoryServices = useSelector(
    (state) => state.categoryService.allCategoriesService
  );

  const services = useSelector((state) => state.service.services);
  const filteredServices = services.filter((service) => {
    if (searchTerm === "") {
      return service;
    } else if (
      service.nameService.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return service;
    }
  });

  return (
    <div className="section" id="section2">
      <WebServices
        categoryServices={categoryServices}
        services={filteredServices}
      />
    </div>
  );
}

function Section3() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);
  const clients = useSelector((state) => state.client.clients);
  return (
    <div className="section" id="section3">
      <WebClients clients={clients} />
    </div>
  );
}

function Section4() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAllies());
  }, [dispatch]);
  const allies = useSelector((state) => state.ally.allAllies);

  return (
    <div className="section" id="section4">
      <WebAliados allies={allies} />
    </div>
  );
}

function Section5() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCertifications());
  }, [dispatch]);
  const certifications = useSelector(
    (state) => state.certification.allCertification
  );
  return (
    <div className="section" id="section5">
      <WebCertifications certifications={certifications} />
    </div>
  );
}

function Section6() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);
  const projects = useSelector((state) => state.project.allProjects);
  return (
    <div className="section" id="section6">
      <WebProjects projects={projects} />
    </div>
  );
}

function Section7() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFoundationsNews());
  }, [dispatch]);
  const foundation = useSelector((state) => state.foundation.allFoundations);
  return (
    <div className="section" id="section7">
      <WebFundation foundation={foundation} />
    </div>
  );
}

function Section8() {
  return (
    <div className="section" id="section8">
      <WebContactUs />
    </div>
  );
}
