import React, { useState } from "react";
import { image } from "../../../assets/";
import "./Footer.scss";
import { Mapa } from "../Mapa";

export const Footer = () => {
  const [isCubeRotating, setIsCubeRotating] = useState(true);

  const handleCubeClick = () => {
    setIsCubeRotating(!isCubeRotating);
  };

  const handleMouseMove = () => {
    if (!isCubeRotating) {
      setIsCubeRotating(true);
    }
  };

  return (
    <>
      <h3>Cubo</h3>
      {/* cubo */}
      {/* <div
        className={`container-cubo ${isCubeRotating ? "rotate" : ""}`}
        onClick={handleCubeClick}
        onMouseMove={handleMouseMove}
      >
        <div className="cubo">
          <div className="cara superior">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen superior"
            />
          </div>
          <div className="cara frente">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen frente"
            />
          </div>
          <div className="cara derecha">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen derecha"
            />
          </div>
          <div className="cara izquierda">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen izquierda"
            />
          </div>
          <div className="cara atras">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen atrás"
            />
          </div>
          <div className="cara inferior">
            <img
              src={image.logo}
              style={{ width: "200px" }}
              alt="Imagen inferior"
            />
          </div>
        </div>
      </div> */}

      <div>
      </div>
    </>
  );
};
