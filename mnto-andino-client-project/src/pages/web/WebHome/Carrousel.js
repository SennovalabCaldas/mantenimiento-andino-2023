import React, { useEffect, useState } from "react";
import "./Carrousel.scss"; // Asegúrate de tener un archivo CSS para los estilos del carrusel
import { image } from "../../../assets";
import { Grid } from "@mui/material";
import { ENV } from "../../../utils";

const slidesData = [
  {
    titulo: "BIENVENIDO",
    subtitulo:
      "Conoce nuestros servicios excepcionales y lleva tu Negocio al próximo nivel.",
    image: image.post3,
  },
];

export const Carrousel = ({ posts }) => {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const baseApi = ENV.BASE_PATH;
  console.log("posts =>", posts);
  const allSlidesData = [
    ...slidesData.map((slide) => {
      return {
        titulo: slide.titulo,
        subtitulo: slide.subtitulo,
        image: slide.image,
      };
    }),
    ...posts.map((post) => {
      return {
        titulo: post.titulo,
        subtitulo: post.subtitulo,
        image: post.avatar.startsWith("uploads")
          ? `${baseApi}/${post.avatar}`
          : image.img6f,
      };
    }),
  ];

  const scrollToSection = () => {
    const section = document.getElementById("section7");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % allSlidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) =>
        (prevSlide - 1 + allSlidesData.length) % allSlidesData.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % allSlidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  console.log("selectedNews en Carrousel =>", selectedNews);
  return (
    <div className="carrousel-container">
      <div
        className="slide"
        style={{
          background:
            "linear-gradient(to right, rgb(240 240 240 / 0%), rgb(164 155 159 / 66%),rgba(22, 16, 19, 0.93)) center center / cover",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="img-slide">
          <img
            src={allSlidesData[currentSlide].image}
            alt="Logo de la Empresa"
            className="img-slide-test"
          />
        </div>
        <div className="slide-content">
          <Grid
            container
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
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
                  <h1>{allSlidesData[currentSlide].titulo}</h1>
                </div>
                <h2>{allSlidesData[currentSlide].subtitulo}</h2>
              </Grid>
              <Grid item xs={12}>
                <button
                  className="comic-button"
                  onClick={() => scrollToSection()}
                >
                  CONOCE MÁS
                </button>
              </Grid>
            </div>
          </Grid>
          <div className="indicators">
            {allSlidesData.map((_, index) => (
              <div
                key={index}
                className={`indicator ${
                  index === currentSlide ? "active" : ""
                }`}
              />
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
