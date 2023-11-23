import React from "react";
import "./WebAliados.scss";
import { Modal, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useState } from "react";
import { ENV } from "../../../utils/constants";

export const WebAliados = ({ allies, certifications }) => {
  console.log("allies", allies);
  console.log("certifications", certifications);
  const baseApi = ENV.BASE_PATH;
  const uniqueAllyNames = new Set();

  allies.forEach((ally) => {
    uniqueAllyNames.add(ally.allyName);
  });
  const [likeCount, setLikeCount] = useState(123); // Initial like count
  const [dislikeCount, setDislikeCount] = useState(4); // Initial dislike count

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    console.log("likeCount", likeCount);
  };

  const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
    console.log("dislikeCount", dislikeCount);
  };
  return (
    <div className="content-allies">
      <div className="content panel">
        <div className="slide-certification">
          <h2>
            <span className="no-select">
              Nos sentimos agradecidos por contar con{" "}
            </span>
          </h2>
          <h1>
            {" "}
            <span className="no-select-g">aliados</span>
          </h1>
          <h2>
            <span className="no-select">tan comprometidos y dedicados.</span>
          </h2>
          <h3>
            <strong>
              <em>
                {" "}
                Su apoyo constante ha sido fundamental para el éxito de nuestros
                proyectos.
              </em>
            </strong>
          </h3>
        </div>
        <div className="certification-img">
          {certifications.map((cert, index) => (
            <div class="like-dislike-container">
              <div class="tool-box">
                <button class="btn-close">×</button>
              </div>
              <p class="text-content">
                {cert.certificationName}
                <br />
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "10px",
                }}
              >
                {cert.photos.map((photo, index) => (
                  <img
                    src={`${baseApi}/${photo}`}
                    alt={cert.certificationName}
                    className="certification-avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
