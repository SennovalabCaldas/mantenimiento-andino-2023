import React from "react";
import "./Client.scss";
import { image } from "../../../assets";

const imageList = [image.noAvatar];

const backgroundColors = [
  "#FF5733", // Color 1
  "#FFC300", // Color 2
  // Agrega más colores según sea necesario
];

export const ClientCard = ({ clientAvatars }) => {
  const cellElements = Array.from({ length: 12 }, (_, index) => {
    const avatarUrl = clientAvatars[index % clientAvatars.length];
    const isCellEmpty =
      avatarUrl === undefined || avatarUrl === null || avatarUrl === ""; // Verifica si la URL del avatar está vacía
      
    return (
      <div
        className={`client-cell d-${index + 1} ${
          isCellEmpty ? backgroundColors[index % backgroundColors.length] : ""
        }`}
        key={index}
      >
        {avatarUrl && (
          <img
            className="client-avatar"
            src={avatarUrl}
            alt={`Avatar ${index + 1}`}
          />
        )}
      </div>
    );
  });

  return <div className="client-loader">{cellElements}</div>;
};
