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
            <span className="cliente-nombre">{cliente.clientName}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="section-bg">
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
    </div>
  );
};
