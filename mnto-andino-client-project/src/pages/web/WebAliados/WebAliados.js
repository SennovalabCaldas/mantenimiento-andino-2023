import React from "react";
import "./WebAliados.scss";
import { Modal, Typography, Card, CardContent, CardMedia } from "@mui/material";

import { image } from "../../../assets";
import { useState } from "react";
import { ENV } from "../../../utils/constants";

export const WebAliados = ({ allies, certifications }) => {
  console.log("allies", allies);
  console.log("certifications", certifications);
  const baseApi = ENV.BASE_PATH;
  const uniqueAllyNames = new Set();
  const [selectedAlly, setSelectedAlly] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  allies.forEach((ally) => {
    uniqueAllyNames.add(ally.allyName);
  });
  const mergedAllies = Array.from(uniqueAllyNames).map((allyName) => {
    const foundAlly =
      defaultAllies.find((ally) => ally.allyName === allyName) ||
      allies.find((ally) => ally.allyName === allyName);

    return foundAlly;
  });

  const openModal = (ally) => {
    setSelectedAlly(ally);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAlly({});
    setModalIsOpen(false);
  };
  console.log(mergedAllies);
  return (
    <div className="content-allies">
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="slide" data-order="1">
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
                  Su apoyo constante ha sido fundamental para el éxito de
                  nuestros proyectos.
                </em>
              </strong>
            </h3>
          </div>
          <div className="images panel">
            <div className="certification-img">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="certification-card"
                  onClick={() => openModal(cert)}
                >
                  {cert.photos.map((logo, logoIndex) => (
                    <CardMedia
                      key={logoIndex}
                      component="img"
                      alt={cert.name}
                      height="140"
                      image={`${baseApi}/${logo}`}
                    />
                  ))}
                  <CardContent>
                    <Typography
                      component="div"
                      style={{
                        userSelect: "none",
                        textTransform: "uppercase",
                      }}
                    >
                      {cert.certificationName}
                    </Typography>

                    <Typography
                      component="div"
                      style={{
                        userSelect: "none",
                        textTransform: "uppercase",
                      }}
                    >
                      {cert.national}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
