import React from "react";
import "./WebClients.scss";
import { image } from "../../../assets";

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
              src={testimonio.avatar}
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

  const renderClientes = (clientes) => {
    return (
      <div className="clientes-row">
        {clientes.map((cliente, index) => (
          <div
            key={index}
            className={`cliente-item ${
              cliente.national ? "nacional" : "internacional"
            }`}
          >
            <img
              src={cliente.avatar}
              alt={`Logo de ${cliente.clientName}`}
              className="cliente-logo"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="section-clients">
       <a className="title-mnto-andino" href="#">
          <span className="smaller-text">nuestros</span>clientes
        </a>
      <div className="video-client-section">
        <div className="video-container">
          <video
            className="video-style"
            autoPlay
            controls
            width="100%"
            height="auto"
          >
            <source src={image.contact} type="video/mp4" />
          </video>
          <div className="video-overlay">
            <div className="titulo-video-overlay">
              <h2>MANTENIMIENTO ANDINO SAS</h2>
            </div>
          </div>
          <div className="imagen-video-overlay">
            <img
              src={image.logomn}
              alt="Logo de la Empresa"
              className="logo-superpuesto"
            />
          </div>
          <div className="subtitulo-video-overlay">
            <p>Conoce todo lo que tenemos para ofrecerte.</p>
          </div>
        </div>
      </div>
      <div className="clientes-container">
        <div className="clientes-nacionales">
          <h2>Clientes Nacionales</h2>
          {renderClientes(
            mergedClientes.filter(
              (cliente) => cliente.active && cliente.national
            )
          )}
        </div>
        <div className="clientes-internacionales">
          <h2>Clientes Internacionales</h2>
          {renderClientes(
            mergedClientes.filter(
              (cliente) => cliente.active && !cliente.national
            )
          )}
        </div>
      </div>
      {renderTestimonios()}
    </div>
  );
};
