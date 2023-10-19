import React, { useEffect, useState } from "react";
import "./Carrousel.scss"; // Asegúrate de tener un archivo CSS para los estilos del carrusel
import { image } from "../../../assets";
import { Grid } from "@mui/material";

const slidesData = [
  {
    titulo: "BIENVENIDO",
    subtitulo:
      "Conoce nuestros servicios excepcionales y lleva tu Negocio al próximo nivel.",
    image: image.post3,
  },
  {
    titulo: "Construimos Sueños",
    subtitulo: "Creamos Resultados",
    image: image.post2,
  },
  {
    titulo: "Únete a nuestro equipo",
    subtitulo: "Conoce los perfiles que buscamos",
    image: image.post2,
  },
  {
    titulo: "EMOCIONANTES NOVEDADES",
    subtitulo:
      "No te pierdas nuestras últimas noticias y mantente actualizado con nuestras actividades y proyectos",
    image: image.post2,
  },
  // Agrega más objetos para más slides
];

export const Carrousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slidesData.length) % slidesData.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carrousel-container">
      <div
        className="slide"
        style={{
          backgroundImage: `url(${image.authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%", // Asegura que el contenedor tenga el 100% del ancho

          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="img-slide">
          <img
            src={slidesData[currentSlide].image}
            alt="Logo de la Empresa"
            className="img-slide-test"
          />
        </div>
        <div className="slide-content">
          <Grid spacing={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px 2rem",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Grid item xs={12} className="title">
                <div>
                  <h1>{slidesData[currentSlide].titulo}</h1>
                </div>
                <h2>{slidesData[currentSlide].subtitulo}</h2>
              </Grid>
              <Grid item xs={12}></Grid>
            </div>
          </Grid>
          <div className="indicators">
            {slidesData.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentSlide ? "active" : ""
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <button className="prev-button" onClick={prevSlide}>
        ‹
      </button>
      <button className="next-button" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};
