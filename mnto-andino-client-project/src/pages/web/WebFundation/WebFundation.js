import React, { useState } from "react";
import { image } from "../../../assets";
import "./WebFundation.scss";
import Slider from "react-slick";

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

  const [selectedNews, setSelectedNews] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Muestra un slide a la vez
    slidesToScroll: 1, // Desplázate un slide a la vez
  };
  return (
    <div className="web-fundations">
      <div className="landing-page">
        <div className="landing-page__content">
          <div className="landing-page__content__text">
            <h1 className="landing-page__content__text__title">
              {slidesData[selectedNews].titulo}
            </h1>
            <p className="landing-page__content__text__subtitle">
              {slidesData[selectedNews].subtitulo}
            </p>
            <p className="landing-page__content__text__description">
              {slidesData[selectedNews].descripcion}
            </p>
            <button
              className="landing-page__content__text__button"
              onClick={() => {
                window.location.href = "/servicios";
              }}
            >
              Conoce más
            </button>
          </div>
          <div className="landing-page__content__image">
            <img src={slidesData[selectedNews].image} alt="Imagen" />
          </div>
        </div>
      </div>
    </div>
  );
};
