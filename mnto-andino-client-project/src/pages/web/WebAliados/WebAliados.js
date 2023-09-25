import React from "react";
import "./WebAliados.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { image } from "../../../assets";
import { useRef, useState } from "react";
import { ENV } from "../../../utils/constants";

export const WebAliados = ({ allies }) => {
  const baseApi = ENV.BASE_PATH;
  const [rating, setRating] = useState(0);
  return (
    <div className="content-section-aliados">
      <h2>Aliados</h2>
      <div className="wrapper">
        {allies.map((ally) => (
          <div className="card">
            <div className="poster">
              <img src={`${baseApi}/${ally.avatar}`} alt="Location Unknown" />
            </div>
            <div className="details">
              <h1>{ally.allyName}</h1>
              <h2>2023</h2>

              {/* <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={star <= rating ? solidStar : regularStar}
                    onClick={() => setRating(star)} // Actualiza la calificación al hacer clic
                  />
                ))}
                <span>{rating}/5</span>
              </div> */}
              <div className="tags">
                <span className="tag">
                  {ally.national ? "Nacional" : "Internacional"}
                </span>
                <span className="tag">
                  {ally.active ? "Activo" : "Inactivo"}
                </span>
              </div>

              <div className="cast">
                <ul>
                  <li>
                    <img
                      src={`${baseApi}/${ally.avatar}`}
                      alt={ally.allyName}
                      title={ally.allyName}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
