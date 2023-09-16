import React, { useState } from "react";
import "./SliderMenuServices.scss";

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
            <span className="icon-menu-services">{item.icon}</span>
            <span className="text-menu-services">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SliderMenuServices;
