import React from "react";
import "./WebAliados.scss";
import { Modal, Typography } from "@mui/material";
import { image } from "../../../assets";
import { useState } from "react";
import { ENV } from "../../../utils/constants";

export const WebAliados = ({ allies }) => {
  const baseApi = ENV.BASE_PATH;
  const uniqueAllyNames = new Set();
  const [selectedAlly, setSelectedAlly] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const defaultAllies = [
    {
      avatar: image.unox,
      allyName: "UNOX",
      national: true,
    },
    {
      avatar: image.Rational,
      allyName: "Rational",
      national: true,
    },
    {
      avatar: image.ally1,
      allyName: "Katcher",
      national: true,
    },
  ];

  const defaultCertification = [
    {
      name: "Instalación y mantenimiento preventivo y correctivo de hornos",
      avatar: [image.unox, image.Rational],
    },
    {
      name: "Certificación en fallas y mantenimiento en equipos de limpieza industrial",
      avatar: [image.ally1],
    },
  ];
  defaultAllies.forEach((ally) => {
    uniqueAllyNames.add(ally.allyName);
  });
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
              Su apoyo constante ha sido fundamental para el éxito de nuestros
              proyectos.
            </h3>
          </div>
          <div className="images panel">
            <div className="certification-img">
              {defaultCertification.map((cert, index) => (
                <div key={index}>
                  <div className="column-item-cert">
                    <h1>
                      <span className="no-select">{cert.name}</span>
                    </h1>
                    <div className="column-item">
                      {cert.avatar.map((image, imageIndex) => (
                        <img
                          src={image}
                          alt={`${cert.name} ${imageIndex}`}
                          className="certification"
                          key={imageIndex}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
