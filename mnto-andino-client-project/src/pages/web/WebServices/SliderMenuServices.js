import React, { useState } from "react";
import "./SliderMenuServices.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons"; // Reemplaza "faIconName" por el nombre del icono que deseas utilizar

const SliderMenuServices = ({ menuItems, setSelectedCategory }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setSelectedCategory(index); // Establece la categoría seleccionada en WebServices
  };

  return (
    <div className="slider-menu-services">
      <ul className="ul-menu-services">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === selectedItem ? "selected" : ""}
            onClick={() => handleItemClick(index)}
          >
            <span className="icon-menu-services">
            </span>{" "}
            <span className="text-menu-services">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderMenuServices;
