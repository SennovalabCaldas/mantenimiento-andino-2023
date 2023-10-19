import React from "react";
import "./WebFundation.scss";
import { image } from "../../../assets";

const imagesScroll = [
  image.service1,
  image.service2,
  image.service3,
  image.service4,
  image.service5,
  image.service6,
];

export const WebFundation = () => {
  const imageStyles = {
    backgroundImage: `url(${image.service1})`, // Coloca aquí la URL de la imagen que desees mostrar inicialmente
  };

  return (
    <div className="fundation-section">
      <div className="contenedor">
        <div className="carrusel">
          {imagesScroll.map((imageUrl, index) => (
            <div key={index} className="imagenes-transformables" style={{ backgroundImage: `url(${imageUrl})` }}>
              {index === 1 || index === 2 ? (
                <div className="fade">
                  <a href="http://google.cl" target="_blank" className="border-text">
                    Haz click para ver este post
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
