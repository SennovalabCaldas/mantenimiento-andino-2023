import React, { useEffect, useState } from "react";
import "./Carrousel.scss"; // Asegúrate de tener un archivo CSS para los estilos del carrusel
import { image } from "../../../assets";
import { Grid } from "@mui/material";

const slidesData = [
  {
    titulo: "Título 1",
    subtitulo: "Subtítulo 1",
    image: image.post3,
  },
  {
    titulo: "Título 2",
    subtitulo: "Subtítulo 2",
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
    }, 5000); // Cambia 5000 por la cantidad de milisegundos que deseas para el intervalo entre slides

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carrousel-container">
      <div
        className="slide"
        style={{
          backgroundImage: `url(${slidesData[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)", 
        }}
      >
        <div className="slide-content">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <img
                      src={image.logomn}
                      alt="Logo de la Empresa"
                      className="logo-superpuesto"
                    />

                  </Grid>
                  <Grid item xs={8} className="title">
                    <div>
                      <h1>¡Bienvenido a</h1>
                      <h1>la Empresa!</h1>
                    </div>
                    <h2>{slidesData[currentSlide].titulo}</h2>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={4}>
              <h3>{slidesData[currentSlide].subtitulo}</h3>
            </Grid>
          </Grid>
        </div>
      </div>
      <button className="prev-button" onClick={prevSlide}>
        ‹
      </button>
      <button className="next-button" onClick={nextSlide}>
        ›
      </button>
      <div className="indicators">
        {slidesData.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};
