import React from 'react'

export const PrevArrow = (props) => (
    <button
      className="slick-prev"
      onClick={props.onClick}
      style={{ left: "-30px" }} 
    >
      {"<"} 
    </button>
  );
  