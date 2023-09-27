import React from "react";
import { Carousel } from "react-responsive-carousel";
import { image } from "../../../assets";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa los estilos del carrusel
import { ENV } from "../../../utils";
import { Avatar, Stack } from "@mui/material";
import { Mapa } from "../../../components/GeneralLayout";

export const CardClient = ({ clients }) => {
  console.log(clients);
  const baseApi = ENV.BASE_PATH;

  const imageStyle = {
    maxWidth: "150px",
    maxHeight: "100px",
  };

  return (
    <div className="division">
        {clients.map((client, index) => {
          // Imprime la ruta de la imagen en la consola
          console.log("Ruta de la imagen:", `${baseApi}/${client.avatar}`);
          return (
            <div key={index}>
              <img
                src={`${baseApi}/${client.avatar}`}
                alt={`Imagen ${index + 1}`}
                style={imageStyle}
              />
            </div>
          );
        })}
    </div>
  );
};
