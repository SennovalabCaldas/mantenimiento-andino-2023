import React from "react";
import "./WebClients.scss";
import { image } from "../../../assets";
import { Avatar, Badge, Divider, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const WebClients = ({ clients }) => {
  const defaultClientesNacionales = [
    {
      clientName: "Consorcio Farallones",
      avatar: image.consorcio,
      national: true,
      active: true,
    },
    {
      clientName: "Grupo éxito",
      avatar: image.exito,
      national: true,
      active: true,
    },
    {
      clientName: "ANI",
      avatar: image.ani,
      national: true,
      active: true,
    },
    {
      clientName: "Super inter",
      avatar: image.superinter,
      national: true,
      active: true,
    },
    {
      clientName: "Carulla",
      avatar: image.carulla,
      national: true,
      active: true,
    },
    {
      clientName: "Mercaldas",
      avatar: image.Mercaldas,
      national: true,
      active: true,
    },
    {
      clientName: "Juan Valdéz",
      avatar: image.juanvaldez,
      national: true,
      active: true,
    },
    {
      clientName: "Concesión la Pintada",
      avatar: image.concesionpintada,
      national: true,
      active: true,
    },
    {
      clientName: "Multidrogas",
      avatar: image.multidrogas,
      national: true,
      active: true,
    },
    {
      clientName: "Cafam",
      avatar: image.cafam,
      national: true,
      active: true,
    },
  ];

  const defaultClientesInternacionales = [
    {
      clientName: "UNOX",
      avatar: image.unox,
      national: false,
      active: true,
    },
    {
      clientName: "ara",
      avatar: image.ara,
      national: false,
      active: true,
    },
    {
      clientName: "Súper",
      avatar: image.superal,
      national: false,
      active: true,
    },
    {
      clientName: "Rational",
      avatar: image.Rational,
      national: false,
      active: true,
    },
  ];

  const testimonios = [
    {
      cliente: "Cliente 1",
      cargo: "Director de Operaciones",
      avatar: image.a1,
      comentario: "Excelente servicio, muy profesionales.",
      evaluacion: 5,
    },
    {
      cliente: "Cliente 2",
      cargo: "Gerente de Producción",
      avatar: image.a2,
      comentario: "Trabajo excepcional, los recomiendo totalmente.",
      evaluacion: 4,
    },
    {
      cliente: "Cliente 3",
      cargo: "Gerente de Producción",
      avatar: image.a3,
      comentario: "Trabajo excepcional, los recomiendo totalmente.",
      evaluacion: 5,
    },
    {
      cliente: "Cliente 3",
      cargo: "Gerente de Producción",
      avatar: image.a4,
      comentario: "Trabajo excepcional, los recomiendo totalmente.",
      evaluacion: 5,
    },
    // Agrega más testimonios según sea necesario
  ];

  const renderTestimonios = () => {
    return (
      <div className="testimonios-container">
        {testimonios.map((testimonio, index) => (
          <div className="e-card playing" key={index}>
            <div className="image"></div>

            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>

            <div className="infotop">
              <img
                src={testimonio.avatar}
                alt={testimonio.cliente}
                className="client-avatar"
              />
              <h2>{testimonio.cliente}</h2>
              <p>{testimonio.cargo}</p>
              <br />
              <p>{testimonio.comentario}</p>
              <div className="star-testimonie">
                {[...Array(testimonio.evaluacion)].map((star, index) => (
                  <img
                    src={image.star}
                    alt="star"
                    className="star"
                    key={index}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const mergedClientes = [
    ...new Map(
      [
        ...defaultClientesNacionales,
        ...defaultClientesInternacionales,
        ...(clients || []),
      ].map((item) => [item.clientName, item])
    ).values(),
  ];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <div className="section-clients">
        <div className="gallery gallery-cards">
          <div className="content panel">
            <div className="slide" data-order="1">
              <h2>
                <span className="no-select">NUESTROS </span>
              </h2>
              <h1>
                <span className="no-select-2">CLIENTES</span>
              </h1>
            </div>
            <div className="images panel">
              <div className="column">
                {mergedClientes.map((client, index) => (
                  <div className="column-item" key={index}>
                    <img
                      src={client.avatar}
                      alt={client.clientName}
                      className="client-avatar"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="content panel">{renderTestimonios()}</div>
        </div>
      </div>
    </>
  );
};
