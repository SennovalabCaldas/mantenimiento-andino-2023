import React from 'react'

export const NextArrow = (props) => (
    <button
      className="slick-next"
      onClick={props.onClick}
      style={{ right: "-30px" }} // Personaliza la posición si es necesario
    >
      {">"} {/* Puedes utilizar un ícono de flecha aquí */}
    </button>
  );