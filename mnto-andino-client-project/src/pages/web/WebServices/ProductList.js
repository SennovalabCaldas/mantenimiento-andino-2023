import React, { useRef, useState } from "react";
import { image } from "../../../assets";

const defaultServicesMap = {
  default1: [
    {
      _id: "servicedefault1",
      name: "Construcción, mantenimiento y reparación de maquinaria industrial y obras civiles.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Obra civil y mantenimiento",
      photos: [image.service1, image.service2, image.service3],
    },
  ],
  default2: [
    {
      _id: "servicedefault2",
      name: "Construcción, adecuación y mantenimiento de Cavas para Refrigeración y Congelación.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Construcción y adecuación",
      photos: [image.service1, image.service2],
    },
    {
      _id: "servicedefault3",
      name: "Mantenimiento preventivo y correctivo de equipos",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Construcción y adecuación",
      photos: [image.service1, image.service2, image.service3],
    },
  ],
  default3: [
    {
      _id: "servicedefault4",
      name: "Mantenimiento y adecuación de instalaciones eléctricas industriales.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Suministro e instalación",
      photos: [image.service1, image.service2, image.service3],
    },
    {
      _id: "servicedefault5",
      name: "Importación y venta de repuestos especializados.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Suministro e instalación",
      photos: [image.service1, image.service2],
    },
    {
      _id: "servicedefault6",
      name: "Suministro e instalación de aires acondicionados.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Suministro e instalación",
      photos: [image.service1, image.service2, image.service3],
    },
  ],
  default4: [
    {
      _id: "servicedefault7",
      name: "Redes de frío, rack, condensadores, neveras autocontenidas, islas de refrigeración y congelación.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Redes de frio y refrigeración",
      photos: [image.service1, image.service2, image.service3],
    },
    {
      _id: "servicedefault8",
      name: "Diseño, cálculo, construcción y remanufactura de muebles.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "Redes de frio y refrigeración",
      photos: [image.service1, image.service2, image.service3],
    },
  ],
};

export const ProductList = ({
  categoryServices,
  services,
  activeTab,
  nameActiveTab,
}) => {
  console.log("services =>", services);
  const phoneNumber = "573103833591";
  const categoryServiceList = useRef(
    categoryServices?.map((category) => category.nameCategoryService)
  );

  const mergedCategories = [
    ...categoryServiceList.current,
    ...(categoryServices || []).map((category) => category.nameCategoryService),
  ];

  const uniqueValuesMergedCategories = [...new Set(mergedCategories)];

  const groupedServices = uniqueValuesMergedCategories.map((category) => {
    const matchingDefaultCategory = Object.keys(defaultServicesMap).find(
      (key) => {
        return defaultServicesMap[key][0].categoryService === category;
      }
    );
    let servicesForCategory = [];

    if (category === "Todos los servicios") {
      servicesForCategory = [
        ...(defaultServicesMap[matchingDefaultCategory] || []),
        ...(services || []),
        ...(category === "Todos los servicios"
          ? defaultServicesMap[matchingDefaultCategory] || []
          : []),
      ];
    } else {
      servicesForCategory = [
        ...(defaultServicesMap[matchingDefaultCategory] || []),
        ...(services.filter(
          (service) => service.categoryService === category
        ) || []),
      ];
    }

    return {
      category: category, // Nombre de la categoría
      services: servicesForCategory, // Servicios asociados a la categoría
    };
  });

  console.log("groupedServices =>", groupedServices);
  const filteredServices =
    nameActiveTab === "Todos los servicios"
      ? groupedServices
      : groupedServices.find((category) => category.category === nameActiveTab);

  console.log(filteredServices);
  const isAllServicesActive = nameActiveTab === "Todos los servicios";
  return (
    <>
      {isAllServicesActive && (
        <div className="services-container">
          <div className="container">
            <div className="gallery-wrap">
              <div className="item item-1"></div>
              <div className="item item-2"></div>
              <div className="item item-3"></div>
              <div className="item item-4"></div>
              <div className="item item-5"></div>
            </div>
          </div>
        </div>
      )}
      {filteredServices &&
        filteredServices.services &&
        filteredServices.services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-item__image">
              <img src={service.photos[0]} alt={service.name} />
              <div className="service-buttons">
                <a
                  href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
                    `¡Hola! Estás en contacto con Mantenimiento Andino S.A.S. Estamos encantados de que estés interesado en nuestros servicios. Si deseas conocer más acerca de nuestro servicio *${service.name}*, por favor, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte en lo que necesites. ¡Esperamos tu mensaje!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="whatsapp-button">
                    <img src={image.whatsApp} alt="whatsapp" />
                  </button>
                </a>
                <a href={`tel:${phoneNumber}`}>
                  <button className="call-button">
                    <img src={image.call} alt="call" />
                  </button>
                </a>
                <a
                  href={`mailto:gerenciamantenimientoandino@gmail.com,mantenimientoandino@gmail.com?subject=Consulta de Servicios&body=${encodeURIComponent(
                    `¡Hola! Estás en contacto con Mantenimiento Andino S.A.S. Estamos encantados de que estés interesado en nuestros servicios. Si deseas conocer más acerca de nuestro servicio *Construcción, mantenimiento y reparación de maquinaria industrial y obras civiles.*, por favor, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte en lo que necesites. Una vez recibamos tu correo nos pondremos en contacto contigo. ¡Esperamos tu mensaje!`
                  )}`}
                >
                  <button className="email-button">
                    <img src={image.email} alt="email" />
                  </button>
                </a>
              </div>
            </div>
            <div className="service-item__details">
              <h2>{service.name}</h2>
            </div>
          </div>
        ))}
    </>
  );
};
