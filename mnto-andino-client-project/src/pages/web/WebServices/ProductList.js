import React, { useRef, useState } from "react";
import { image } from "../../../assets";
import { ENV } from "../../../utils";

const defaultServicesMap = {

};

export const ProductList = ({
  categoryServices,
  services,
  activeTab,
  nameActiveTab,
}) => {
  const baseApi = ENV.BASE_PATH;
  const phoneNumber = "+573103833591";
  const videoRef = useRef(null);
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
      (key) => defaultServicesMap[key][0].categoryService === category
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

    servicesForCategory.forEach((service) => {
      if (service.photos && Array.isArray(service.photos)) {
        service.photos = service.photos.map((photo) => {
          if (!photo.startsWith(baseApi)) {
            return `${baseApi}/${photo}`;
          }else{
            return photo;
          }
        });
      }
    });

    return {
      category: category,
      services: servicesForCategory,
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
        <div className="video-container-services">
          <video
            ref={videoRef}
            preload="metadata"
            autoPlay={true}
            muted={true}
            loop={true}
          >
            <source src={image.portafolio_video} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
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
