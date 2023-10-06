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
    <div className="ally-division">
      <a className="title-mnto-andino" href="#">
        <span className="smaller-text">conoce quienes son nuestros</span>aliados
      </a>
      <div className="ally-list">
        <div className="main">
          {mergedAllies.map((ally, index) => (
            <div
              key={index}
              className="card"
              onMouseOver={() => openModal(ally)} // Abre el modal cuando el mouse pasa sobre el aliado
            >
              <img
                src={
                  allies.find((a) => a.allyName === ally.allyName)
                    ? `${baseApi}/${ally.avatar}`
                    : ally.avatar
                }
                alt={ally.allyName}
                style={{ width: "90px", height: "100px" }}
              />
            </div>
          ))}
        </div>
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content-allies ">
            <h2>Certificaciones</h2>

            <Typography>{selectedAlly.allyName}</Typography>
          </div>
        </Modal>
      </div>
    </div>
  );
};
