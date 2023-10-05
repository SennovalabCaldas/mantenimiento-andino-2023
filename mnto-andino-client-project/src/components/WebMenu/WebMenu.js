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
import WebSuppliers from "../../pages/web/WebSuppliers/WebSuppliers";
import {WebContactUs} from "../../pages/web/WebContactUs/WebContactUs";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";
import "./WebMenu.scss";
import SlideBarWebMenu from "./SlideBarWebMenu";
import { CubeWithImages } from "../Client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import { SocialSlideBar } from "./SocialSlideBar";
import { useDispatch } from "react-redux";
import { getAllAllies } from "../../actions/allyActions";
import { getAllFoundationsNews } from "../../actions/foundationNewsActions";
import { getAllCertifications } from "../../actions/certificationActions";
import { getAllClients } from "../../actions/clientActions";
import { getAllProjects } from "../../actions/projectActions";
import { getAllSuppliers } from "../../actions/providerActions";
import { getServices } from "../../actions/serviceActions";
import { getAllCategoriesService } from "../../actions/categoryServiceActions";
import { getAllPosts } from "../../actions/postActions";
import { image } from "../../assets";
export function WebMenu() {
  const [activeSection, setActiveSection] = useState("section1");
  const [showToggleButton, setShowToggleButton] = useState(false); // Inicializar en falso
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuIcon = isMenuOpen ? faTimes : faBars;

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    if (section !== "section1") {
      setShowToggleButton(true); // Mostrar el botón de menú cuando no está en la sección 1
    } else {
      setShowToggleButton(false); // Ocultar el botón de menú cuando está en la sección 1
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const showSlideBar = activeSection !== "section1";
  console.log(activeSection);
  return (
    <div className="webmenu-page">
      {showToggleButton && (
        <SlideBarWebMenu
          activeSection={activeSection}
          handleSetActiveSection={handleSetActiveSection}
        />
      )}
      <nav className="mask">
        <a className="title-mnto-andino" href="#">
          <span className="smaller-text">Mantenimiento</span> Andino
        </a>
        <ul onClick={closeMenu} className="list">
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section2"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section2")}
            >
              SERVICIOS
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section3"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section3")}
            >
              CLIENTES
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section4"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section4")}
            >
              PROVEEDORES Y ALIADOS
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section5"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section5")}
            >
              CERTIFICACIONES
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section6"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section6")}
            >
              PROYECTOS
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section7"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section7")}
            >
              FUNDACIÓN
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              className="a-scrollink"
              to="section8"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              onSetActive={() => handleSetActiveSection("section8")}
            >
              CONTÁCTANOS
            </ScrollLink>
          </li>

          <li className="li-login-anchor">
            <Link to="/login" className="btn">
              <span>INGRESAR</span>
            </Link>
          </li>
        </ul>
        <button class="menu">Menu</button>
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
      </div>
      <CubeWithImages></CubeWithImages>
      <SocialSlideBar></SocialSlideBar>
      <Footer />
    </div>
  );
}

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
  console.log(categoryServices);
  const services = useSelector((state) => state.service.services);
  console.log(services);
  return (
    <div className="section" id="section2">
      <WebServices categoryServices={categoryServices} services={services} />
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
    dispatch(getAllSuppliers());
    dispatch(getAllAllies());
  }, [dispatch]);
  const suppliers = useSelector((state) => state.supplier.allSuppliers);
  const allies = useSelector((state) => state.ally.allAllies);

  return (
    <div className="section" id="section4">
      <WebSuppliers suppliers={suppliers} allies={allies} />
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
