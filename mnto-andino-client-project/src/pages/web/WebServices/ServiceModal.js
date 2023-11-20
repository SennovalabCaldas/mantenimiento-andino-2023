import React from "react";
import "./ServiceModal.scss";
export const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{service.name}</h2>
        <p>{service.description}</p>
        {/* Otros detalles del servicio */}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};
