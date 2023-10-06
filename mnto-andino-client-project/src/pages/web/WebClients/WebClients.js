import React from "react";
import "./WebClients.scss";
import { image } from "../../../assets";
import { Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

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
      avatar: image.cliente1Avatar,
      comentario: "Excelente servicio, muy profesionales.",
      evaluacion: 5,
    },
    {
      cliente: "Cliente 2",
      cargo: "Gerente de Producción",
      avatar: image.cliente2Avatar,
      comentario: "Trabajo excepcional, los recomiendo totalmente.",
      evaluacion: 4,
    },
    {
      cliente: "Cliente 3",
      cargo: "Gerente de Producción",
      avatar: image.cliente2Avatar,
      comentario: "Trabajo excepcional, los recomiendo totalmente.",
      evaluacion: 5,
    },
    // Agrega más testimonios según sea necesario
  ];

  const renderTestimonios = () => {
    return (
      <div className="testimonios-container">
        {testimonios.map((testimonio, index) => (
          <div key={index} className="testimonio-item">
            <img
              src={image.logomn}
              alt={`Avatar de ${testimonio.cliente}`}
              className="testimonio-avatar"
            />
            <h3 className="testimonio-cliente">{testimonio.cliente}</h3>
            <p className="testimonio-cargo">{testimonio.cargo}</p>
            <div className="testimonio-stars">
              {[...Array(testimonio.evaluacion)].map((_, i) => (
                <span key={i} className="star">
                  &#9733;
                </span>
              ))}
            </div>
            <p className="testimonio-comentario">{testimonio.comentario}</p>
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
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const StyledBadgeInternational = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#a300b5",
      color: "#a300b5",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <div className="section-clients">
      <a className="title-mnto-andino" href="#">
        <span className="smaller-text">nuestros</span>clientes
      </a>
      <div className="video-client-section">
        <div className="video-container">
          <video className="video-style" controls width="70%" height="auto">
            <source src={image.contact} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="imagen-video-overlay">
        <img
          src={image.logomn}
          alt="Logo de la Empresa"
          className="logo-superpuesto"
        />
        <div className="clientes-container">
          <h2>Clientes Nacionales</h2>

          <div className="clientes-nacionales">
            {mergedClientes
              .filter((cliente) => cliente.active && cliente.national)
              .map((cliente, index) => (
                <StyledBadge
                  key={index}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  className="avatar-cliente"
                >
                  <Avatar
                    className="avatar-img-client"
                    alt={cliente.clientName}
                    src={cliente.avatar}
                  />
                </StyledBadge>
              ))}
          </div>
          <h2>Clientes Internacionales</h2>

          <div className="clientes-internacionales">
            {mergedClientes
              .filter((cliente) => cliente.active && cliente.national === false)
              .map((cliente, index) => (
                <StyledBadgeInternational
                  key={index}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  className="avatar-cliente"
                >
                  <Avatar
                    className="avatar-img-client"
                    alt={cliente.clientName}
                    src={cliente.avatar}
                  />
                </StyledBadgeInternational>
              ))}
          </div>
        </div>
      </div>

      {renderTestimonios()}
    </div>
  );
};
