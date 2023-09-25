import React, { useEffect, useRef, useState } from "react";
import "./WebHome.scss";
import { useSelector } from "react-redux";
import { ENV } from "../../../utils/constants";
const basePath = ENV.BASE_PATH;

const Slide = ({ post, isActive }) => {
  console.log(`${basePath}/${post.avatar}`);

  return (
    <div className={`fnc-slider__slides ${isActive ? "m--active-slide" : ""}`}>
      <div className="fnc-slide m--blend-green">
        <div className="fnc-slide__inner">
          <div className="fnc-slide__mask">
            <div className="fnc-slide__mask-inner"></div>
          </div>
          <div className="fnc-slide__content">
            <h2 className="fnc-slide__heading">
              <div className="fnc-slide__heading-line">
                <span> {post.titulo}</span>
              </div>
              <div className="fnc-slide__heading-line">
                <span> {post.subtitulo}</span>
              </div>
              <div>
                <p>{post.descripcion}</p>
              </div>
              <div>
                <img
                  src={`${basePath}/${post.avatar}`}
                  alt={post.fecha_creacion}
                />
              </div>
            </h2>
            <button type="button" className="fnc-slide__action-btn">
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WebHome = () => {
  const news = useSelector((state) => state.post.allPosts);
  console.log(news);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isAutoPlay) {
      timeoutRef.current = setTimeout(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentSlide, isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % news.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? news.length - 1 : prevSlide - 1
    );
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div>
      <div className="demo-cont">
        <div className="fnc-slider example-slider">
          {news.map((post, index) => (
            <Slide key={index} post={post} isActive={index === currentSlide} />
          ))}
        </div>
      </div>
      <div className="slider-controls">
        <button onClick={prevSlide}>Anterior</button>
        <button onClick={nextSlide}>Siguiente</button>
        <button onClick={toggleAutoPlay}>
          {isAutoPlay ? "Pausar" : "Reproducir"}
        </button>
      </div>
    </div>
  );
};
