import React from "react";
import "./WebHome.scss";


export const PrevArrow = (props) => (
  <button
    className="slick-prev"
    onClick={props.onClick}
    style={{ left: "-30px" }} // Personaliza la posición si es necesario
  >
    {"<"} {/* Puedes utilizar un ícono de flecha aquí */}
  </button>
);
