import React from "react";
import ServiceList from "../../../components/Admin/Servicios/ServiciosList";

export const Services = () => {
  return (
    <div>
      <h2>Servicios</h2>
      <div className="users-page">
        <ServiceList></ServiceList>
      </div>
    </div>
  );
};
