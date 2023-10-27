import React, { useState } from "react";
import { image } from "../../../assets";
import "./WebFundation.scss";
import Swiper from "swiper";

export const WebFundation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const slidesData = [
    {
      titulo: "BIENVENIDO",
      subtitulo:
        "Conoce nuestros servicios excepcionales y lleva tu Negocio al próximo nivel.",
      image: image.post3,
      descripcion: "...",
    },
    {
      titulo: "Construimos Sueños",
      subtitulo: "Creamos Resultados",
      image: image.post2,
      descripcion: "...",
    },
    {
      titulo: "Únete a nuestro equipo",
      subtitulo: "Conoce los perfiles que buscamos",
      image: image.post2,
      descripcion: "...",
    },
    {
      titulo: "EMOCIONANTES NOVEDADES",
      subtitulo:
        "No te pierdas nuestras últimas noticias y mantente actualizado con nuestras actividades y proyectos",
      image: image.post2,
      descripcion: "...",
    },
    // Agrega más objetos para más slides
  ];
  const handleTabChange = (index) => {
    setActiveTab(index);
  };



  const [selectedNews, setSelectedNews] = useState(0);

  return (
    <div className="web-fundations">
      <div className="landing-page">
        <header>
          <div className="container">
            <ul className="news-list">
              {slidesData.map((slide, index) => (
                <li
                  key={index}
                  className={selectedNews === index ? "active" : ""}
                  onClick={() => setSelectedNews(index)}
                >
                  {slide.titulo}
                </li>
              ))}
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>{slidesData[selectedNews].titulo}</h1>
              <p>
                {slidesData[selectedNews].subtitulo}
                <br />
                {slidesData[selectedNews].descripcion}
              </p>
              <button>Button name</button>
            </div>
            <div className="image">
              <img src={slidesData[selectedNews].image} alt="News" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};