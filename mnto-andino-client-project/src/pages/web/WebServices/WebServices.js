import React, { useEffect, useState } from "react";
import { image } from "../../../assets";
import "./WebServices.scss";
import Slider from "react-slick";
import { ENV } from "../../../utils";
import { Divider } from "@material-ui/core";

export const WebServices = ({ categoryServices, services }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [nameActiveTab, setNameActiveTab] = useState("Todos los servicios");
  const [currentTab, setCurrentTab] = useState("1");
  const phoneNumber = "+573103833591";
  const baseApi = ENV.BASE_PATH;
  console.log("services =>", services);
  const handleTabChange = (index) => {
    setActiveTab(index);
    handleNameTabChange(index);
  };

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  const handleNameTabChange = (index) => {
    const categoryName = categoryServices[index].nameCategoryService;
    setNameActiveTab(categoryName);
  };

  return (
    <div className="content-section-services">
      <div className="title-service">
        <h1>
          <strong>CONOCE NUESTRO</strong>
          <br />
          PORTAFOLIO DE SERVICIOS
        </h1>
      </div>
      <div className="container">
        <div className="tabs">
          {categoryServices.map((tab, i) => (
            <button
              key={i}
              id={tab._id}
              disabled={currentTab === `${tab._id}`}
              onClick={handleTabClick}
            >
              {tab.nameCategoryService}
            </button>
          ))}
        </div>
        <div className="content">
          {categoryServices.map((tab, i) => (
            <div key={i}>
              {currentTab === `${tab._id}` && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {services.map((service, i) => (
                    <div key={i}>
                      {service.categoryService === tab.nameCategoryService && (
                        <div className="card">
                          <div className="card-header">
                            <div style={
                              {
                                display: "flex",
                                width: "60%",
                              }
                            }>
                              <h2>{service.name}</h2>
                            </div>
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
                          <Divider></Divider>
                          <div className="card-body">
                            <div className="content-card-photos-buttons">
                              <Slider
                                dots={true}
                                infinite={true}
                                speed={500}
                                slidesToShow={1}
                                slidesToScroll={1}
                                autoplay={true}
                                autoplaySpeed={2000}
                                nextArrow={<NextArrow />}
                                prevArrow={<PrevArrow />}
                              >
                                {service.photos.map((photo, index) => (
                                  <>
                                    <div
                                      key={index}
                                      style={{
                                        width: "270px",
                                        objectFit: "cover",
                                        height: "300px",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      <img
                                        src={`${baseApi}/${photo}`}
                                        alt={`Slide ${index}`}
                                        style={{
                                          width: "270px",
                                          objectFit: "cover",
                                          height: "300px",
                                          borderRadius: "10px",
                                        }}
                                      />
                                    </div>
                                  </>
                                ))}
                              </Slider>
                            </div>
                          </div>
                          
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-20px" }}
      onClick={onClick}
    ></div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-20px" }}
      onClick={onClick}
    ></div>
  );
};
