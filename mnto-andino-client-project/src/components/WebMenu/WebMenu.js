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
import { getAllTestimonies } from "../../actions/testimonieActions";

import Flags from "react-flags-select";
import { CubeWithImages } from "../Client";
import { image } from "../../assets";
import SlideBarWebMenu from "./SlideBarWebMenu";
import { SocialSlideBar } from "./SocialSlideBar";
import Footer from "../Shared/Footer/Footer";
import "./WebMenu.scss";
import { Link } from "react-router-dom";
import { getAllProfiles } from "../../actions/profileActions";
import { getAllSedes } from "../../actions/sedesActions";

export const WebMenu = () => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("services");
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userCountryCode, setUserCountryCode] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("Colombia");

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllCategoriesService());
    dispatch(getServices());
    dispatch(getAllClients());
    dispatch(getAllTestimonies());
    dispatch(getAllAllies());
    dispatch(getAllCertifications());
    dispatch(getAllProjects());
    dispatch(getAllFoundationsNews());
    dispatch(getAllProfiles());
    dispatch(getAllSedes());
  }, [dispatch]);

  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setShowToggleButton(section !== "home");
    console.log("activeSection", activeSection);
    if (section !== "home") {
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
      {activeSection !== "home" || (
        <>
          <SlideBarWebMenu />
          <SocialSlideBar />
        </>
      )}

      <div className="header">
        <div id="topbarMenu" className="topbarMenu">
          <Link to="/sedes">SEDES</Link>
          <a href="#contact" onClick={() => scrollToSection("section8")}>
            SOLICITA NUESTROS SERVICIO
          </a>
          <Link to="/pqrs">PQRS</Link>
          {userCountryCode && (
            <div className="user-country-flag">
              <Flags
                selected={selectedCountry}
                onSelect={handleCountrySelect}
                className="user-flag"
              />
            </div>
          )}
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
                Actualidad
              </a>
              <a href="#contact" onClick={() => scrollToSection("section8")}>
                Contacto
              </a>
              <Link to="/login">Iniciar sesión</Link>
            </div>
          </nav>
        </div>
      </div>
      <CubeWithImages />
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
  return (
    <div className="section web-section" id="section2">
      <WebServices categoryServices={categoryServices} services={services} />
    </div>
  );
}

function Section3() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllTestimonies());
  }, [dispatch]);
  const clients = useSelector((state) => state.client.clients);
  const testimonies = useSelector((state) => state.testimonie.testimonies);
  console.log("testimonies =>", testimonies);
  return (
    <div className="section web-section" id="section3">
      <WebClients clients={clients} testimonies={testimonies} />
    </div>
  );
}

function Section4() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAllies());
    dispatch(getAllCertifications());
  }, [dispatch]);
  const allies = useSelector((state) => state.ally.allAllies);
  const certifications = useSelector(
    (state) => state.certification.allCertification
  );

  return (
    <div className="section web-section" id="section4">
      <WebAliados allies={allies} certifications={certifications} />
    </div>
  );
}

function Section5() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFoundationsNews());
    dispatch(getAllAllies());
    dispatch(getAllClients());
  }, [dispatch]);

  const foundations = useSelector((state) => state.foundation.allFoundations);

  const allies = useSelector((state) => state.ally.allAllies);

  const clients = useSelector((state) => state.client.clients);
  return (
    <div className="section web-section" id="section5">
      <WebCertifications
        foundations={foundations}
        allies={allies}
        clients={clients}
      />
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
    <div className="section web-section" id="section6">
      <WebProjects projects={projects} />
    </div>
  );
}

function Section7() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
    dispatch(getAllFoundationsNews());
  }, [dispatch]);
  const profiles = useSelector((state) => state.profile.allProfiles);
  const foundations = useSelector((state) => state.foundation.allFoundations);
  console.log("profiles =>", profiles);
  return (
    <div className="section web-section" id="section7">
      <WebFundation profiles={profiles} foundations={foundations} />
    </div>
  );
}

function Section8() {
  return (
    <div className="section  web-final-section" id="section8">
      <WebContactUs />
    </div>
  );
}
