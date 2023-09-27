import React, { useState } from "react";
import { ENV } from "../../../utils/constants";
import { Loading } from "../../../components/Shared/Loading/Loading";
import "./WebFundation.scss";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export const WebFundation = ({ foundation }) => {
  const baseApi = ENV.BASE_PATH;
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!foundation || foundation.length === 0) {
    return <Loading />;
  }

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="fundation-section">
        <div className="fundation-title">
          <h1>Fundación</h1>
        </div>
        <div className="fundation-container">
          <ul className="fundation-slides">
            {foundation.map((item, index) => (
              <li
                id={`slide${index + 1}`}
                key={`slide${index}`}
                className={index === currentSlide ? "active" : ""}
              >
                <img src={`${baseApi}/${item.avatar}`} alt="" className="large-image"/>
              </li>
            ))}
          </ul>

          <ul className="thumbnails">
            {foundation.map((item, index) => (
              <li key={`thumbnail${index}`}>
                <a
                  href={`#slide${index + 1}`}
                  onClick={() => handleSlideChange(index)}
                >
                  <img src={`${baseApi}/${item.avatar}`} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
