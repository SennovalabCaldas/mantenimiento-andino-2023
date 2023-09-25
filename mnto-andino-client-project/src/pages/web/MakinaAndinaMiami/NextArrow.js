import React from 'react'

export const NextArrow = (props) => (
    <button
      className="slick-next"
      onClick={props.onClick}
      style={{ right: "-30px" }}
    >
      {">"} 
    </button>
  );