import React from "react";
import Slider from "react-slick";
import { Grid, Typography, Paper } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";
import Footer from "../../../components/Shared/Footer/Footer";
import { PrevArrow } from "./PrevArrow";
import { NextArrow } from "./NextArrow";

export const MakinaAndina = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Componente de flecha anterior
    nextArrow: <NextArrow />, // Componente de flecha siguiente
    autoplay: true, // Reproducción automática
    autoplaySpeed: 2000, // Velocidad de reproducción automática en milisegundos (opcional)
  };

  const images = [image.video1, image.video1, image.video1];

  return (
    <>
      <div className="container">
        <Slider {...settings} className="sliderStyle">
          {images.map((item, index) => (
            <div key={index}>
              {item.endsWith(".mp4") ? (
                // Si el elemento es un video
                <video controls width="100%" height="auto">
                  <source src={item} type="video/mp4" />
                  {/* Agrega más fuentes de video si es necesario */}
                </video>
              ) : (
                // Si el elemento es una imagen
                <img src={item} alt={`Slide ${index}`} />
              )}
            </div>
          ))}
        </Slider>

        <div className="content">
          <Grid container spacing={3} style={{ padding: "20px" }}>
            <Typography variant="h4">
              ¡CONÓCE ESTE ESPACIO DE CONFORT EN LA NATURALEZA!
            </Typography>
            {/* Columna izquierda */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4">Ubicación</Typography>

                <Typography>
                  Ubicada en Palestina.
                  <br />
                  En un área de hermosos paisajes y naturaleza pura que rodea la
                  elegancia y confort de su construcción, la finca La Martina
                  aguarda por ti y tu seres queridos, para que vivas una
                  experiencia única.
                </Typography>
              </Paper>
            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4">Caracteristicas</Typography>
                <ul>
                  <li>16 camas disponibles</li>
                  <li>3 baños</li>
                  <li>6 cuartos</li>
                  <li>Piscina</li>
                  <li>Zonas verdes</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ padding: "20px" }}>
            <Grid item xs={12} md={12}>
              <Paper elevation={3} style={{ padding: "20px 20px 20px 50px" }}>
                <Typography variant="h4">Disponible para</Typography>
                <ul>
                  <li>Eventos de todo tipo</li>
                  <li>Reuniones familiares</li>
                  <li>Fiestas Recreación</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className="back-to-mnto">
          <BackToMntoAndino
            thumbnailSrc={image.logo} // Ruta de la miniatura de la imagen
            fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
          />
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};
