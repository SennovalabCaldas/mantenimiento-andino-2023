import React, { useState } from "react";
import "./SocialSlideBar.scss"; // Importa los estilos CSS
import { image } from "../../assets";

export const SocialSlideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const codigoPais = "57";
  const numeroDeTelefono = "3103833591"; // Reemplaza esto con el número de teléfono deseado
  const enlaceWhatsApp = `https://wa.me/${codigoPais}${numeroDeTelefono}`;

  const toggleSlideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`social-slide-bar ${isOpen ? "open" : ""}`}>
      <div className="social-icons">
        <a
          href={enlaceWhatsApp}
          rel="noreferrer"
          target="_blank"
          className="transition text-grey hover:hover:text-blue-500"
        >
          <img
            src={image.whatsApp}
            alt="WhatsApp"
            className="footer__icon-img-large-whatsapp"
          />
        </a>
        <a
          href="https://web.facebook.com/people/Mantenimiento-Andino/100085894758272/?mibextid=LQQJ4d"
          rel="noreferrer"
          target="_blank"
          className="transition text-grey hover:hover:text-blue-500"
        >
          <img src={image.facebook} className="footer__icon-img-large" />
        </a>
        <a
          href="https://www.instagram.com/mntoandino/"
          rel="noreferrer"
          target="_blank"
          className="transition text-grey hover:hover:text-blue-500"
        >
          {/* <span className="sr-only">Instagram</span> */}
          <img
            src={image.instagram}
            className="footer__icon-img-large-whatsapp"
          />
        </a>
        <a
          href="https://www.linkedin.com/"
          rel="noreferrer"
          target="_blank"
          className="transition text-grey hover:hover:text-blue-500"
        >
          {/* <span className="sr-only">Instagram</span> */}
          <img
            src={image.linkedin}
            className="footer__icon-img-large-whatsapp"
          />
        </a>
 
      </div>
      <div className="toggle-button" onClick={toggleSlideBar}>
        <strong>Ir</strong>{" "}
      </div>
    </div>
  );
};
