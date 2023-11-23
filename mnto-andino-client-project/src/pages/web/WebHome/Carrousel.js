import React, { useEffect, useState } from "react";
import "./Carrousel.scss"; // Make sure to have a CSS file for carousel styles
import { image } from "../../../assets";
import { Grid } from "@mui/material";
import { ENV } from "../../../utils";

const slidesData = [
  {
    title: "WELCOME",
    subtitle:
      "Discover our exceptional services and take your business to the next level.",
    image: image.post3,
  },
  {
    title: "BIENVENIDO",
    subtitle:
      "Descubre todo lo que tenemos para ofrecerte.",
    image: image.service1,
  },
];

export const Carrousel = ({ posts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const baseApi = ENV.BASE_PATH;

  const allSlidesData = [
    ...slidesData,
    ...posts.map((post) => ({
      title: post.titulo,
      subtitle: post.subtitulo,
      image: post.avatar.startsWith("uploads")
        ? `${baseApi}/${post.avatar}`
        : image.img6f,
    })),
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

  return (
    <div className="carrousel-container">
      <div
        className="slide"
        style={{
          backgroundImage: image.mapa2,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.9)",
        }}
      >
        <div className="img-slide">
          <img
            src={allSlidesData[currentSlide].image}
            alt="Company Logo"
            className="img-slide-test"
          />
        </div>
        <div
          className="slide-content"
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="1" d="M0,32L40,53.3C80,75,160,117,240,144C320,171,400,181,480,160C560,139,640,85,720,58.7C800,32,880,32,960,32C1040,32,1120,32,1200,53.3C1280,75,1360,117,1400,138.7L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>'
            )}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid container className="slide-container">
            <div
              className="title"
              style={{
                display: "flex",
                padding: "30px 0 0 70px",
                flexDirection: "column",
                alignContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <h1>{allSlidesData[currentSlide].title}</h1>
              <div className="decoration-line-slide"></div>

              <h2>{allSlidesData[currentSlide].subtitle}</h2>
            </div>
            <button className="comic-button" onClick={() => scrollToSection()}>
             VER MÁS
            </button>
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
