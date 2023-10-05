import React, { useEffect } from "react";
import "./WebContactUs.scss";
import { image } from "../../../assets";

export const WebContactUs = () => {
  useEffect(() => {
    const sinceData = document.getElementById("sinceData");
    const date = new Date();
    const year = date.getFullYear();
    sinceData.innerHTML = year;
  }, []);

  return (
    <div className="contact-section">
      <div className="item1">
        <article>
          <header
            style={{
              backgroundImage: `url(${image.authBg})`,
            }}
          >
            <div className="upper-header">
              <div className="mini-title">formulario de contacto</div>
             
            </div>
            <div className="lower-header">
             
              <h1 className="title">Gracias por contactarnos!</h1>
              <p className="subtitle">
                TRABAJAMOS PARA SU  TRANQUILIDAD
              </p>
            </div>
          </header>
        </article>
      </div>
      <div className="item2">

      </div>
    </div>
  );
};
