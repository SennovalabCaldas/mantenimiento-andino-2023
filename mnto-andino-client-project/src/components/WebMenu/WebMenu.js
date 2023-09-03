import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  WebClients,
  WebHome,
  WebNewsletter,
  WebSedes,
} from "../../pages/web";
import WebSuppliers from "../../pages/web/WebSuppliers/WebSuppliers";
import WebContactUs from "../../pages/web/WebContactUs/WebContactUs";
import "./WebMenu.scss";
import { CubeWithImages } from "../Client";
import { image } from "../../assets";
import { Auth } from "../../pages/admin";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../actions/postActions";
import WebServices from "../../pages/web/WebServices/WebServices";

export const WebMenu = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const noticias = useSelector((state) => state.post.allPosts);
  console.log(noticias);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sectionActive, setSectionActive] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllPosts());
      } catch (error) {
        console.error("Error al obtener las sedes:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  console.log(posts);
  return (
    <>
      <div className="web-page">
        <div className={`web-menu ${isMenuOpen ? "menu-open" : ""}`}>
          <div className="navbar">
            <div className="logo-container">
              <img
                src={image.logo}
                alt="Company Logo"
                className="company-logo"
              />
            </div>
            <nav className="navigation">
              <a
                className="selected"
                href="#section-home"
                onClick={() => setSectionActive("home")}
              >
                Inicio
              </a>
              <a
                className="selected"
                href="#section-newsletter"
                onClick={() => setSectionActive("newsletter")}
              >
                Noticias
              </a>
              <a
                className="selected"
                href="#section-sedes"
                onClick={() => setSectionActive("sedes")}
              >
                Sedes
              </a>
              <a
                className="selected"
                href="#section-clients"
                onClick={() => setSectionActive("clients")}
              >
                Clientes
              </a>
              <a
                className="selected"
                href="#section-suppliers"
                onClick={() => setSectionActive("suppliers")}
              >
                Proveedores
              </a>
              <a
                className="selected"
                href="#section-services"
                onClick={() => setSectionActive("services")}
              >
                Servicios
              </a>
              <a
                className="selected"
                href="#section-contact"
                onClick={() => setSectionActive("contact")}
              >
                Contactanos
              </a>
            </nav>
            <div className="login">
              <Routes>
                <Route path="/login" element={<Auth />} />
              </Routes>
              <Link to="/login" className="nav-link">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
        <div className="sections">
          {sectionActive === "home" && (
            <div className="section">
              <WebHome posts={posts}></WebHome>
            </div>
          )}

          {sectionActive === "newsletter" && (
            <div className="section">
              <WebNewsletter></WebNewsletter>
            </div>
          )}
          {sectionActive === "sedes" && (
            <div className="section">
              <WebSedes></WebSedes>
            </div>
          )}
          {sectionActive === "clients" && (
            <div className="section">
              <WebClients></WebClients>
            </div>
          )}
          {sectionActive === "suppliers" && (
            <div className="section">
              <WebSuppliers></WebSuppliers>
            </div>
          )}
          {sectionActive === "services" && (
            <div className="section">
             <WebServices></WebServices>
            </div>
          )}
          {sectionActive === "contact" && (
            <div className="section">
              <WebContactUs></WebContactUs>
            </div>
          )}
        </div>
        <CubeWithImages></CubeWithImages>
      </div>
    </>
  );
};
