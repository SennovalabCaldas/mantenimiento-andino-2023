import React, { useEffect, useRef, useState } from "react";
import "./WebHome.scss";
import { useSelector } from "react-redux";
import { ENV } from "../../../utils/constants";
import Slider from "react-slick";
import { image } from "../../../assets";

const basePath = ENV.BASE_PATH;

const NextArrow = (props) => (
  <button
    className="slick-next"
    onClick={props.onClick}
    style={{ right: "10px" }}
  >
    {">"}
  </button>
);
const PrevArrow = (props) => (
  <button
    className="slick-prev"
    onClick={props.onClick}
    style={{ left: "10px", zIndex:1 }}
  >
    {"<"}
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />, // Componente de flecha anterior
  nextArrow: <NextArrow />, // Componente de flecha siguiente
  autoplay: true, // Reproducción automática
  autoplaySpeed: 5000, // Velocidad de reproducción automática en milisegundos (opcional)
};

export const WebHome = ({ posts }) => {
  console.log("posts", posts);
  if (!posts || posts.length === 0) {
    return (
      <div className="section-bg news">
        <div className="video-container">
          <video autoPlay controls width="100%" height="auto">
            <source src={image.video1} type="video/mp4" />
          </video>
          <div className="video-overlay">
            <img
              src={image.logomnbg}
              alt="Logo de la Empresa"
              className="logo-superpuesto"
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div class="section-bg news">
      <Slider {...settings} className="sliderStyle slider">
        {posts.map((post, index) => (
          <div className="slide" key={index}>
            <div className="slide-content">
              <div>
                <img
                  src={`${basePath}/${post.avatar}`}
                  alt={post.fecha_creacion}
                />
              </div>
              <div className="slide-text">
                <h2> {post.titulo}</h2>
                <div className="slide-subtitle">{post.subtitulo}</div>
                <div dangerouslySetInnerHTML={{ __html: post?.descripcion }} />
              </div>

              <div className="slide-logo">
                <img
                  src={image.logoH}
                  alt="Imagen 1"
                  style={{ height: "70px" }}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
