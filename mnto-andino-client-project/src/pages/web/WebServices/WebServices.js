import React, { useEffect, useState } from "react";
import { image } from "../../../assets";
import "./WebServices.scss";
import Slider from "react-slick";
import { ENV } from "../../../utils";
import { Divider } from "@material-ui/core";
import { Backdrop, Fade, Modal } from "@mui/material";

export const WebServices = ({ categoryServices, services }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [nameActiveTab, setNameActiveTab] = useState("all");
  const [currentTab, setCurrentTab] = useState("all"); // Ajustar aquí para que "all" esté activo por defecto
  const phoneNumber = "+573103833591";
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const baseApi = ENV.BASE_PATH;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  console.log("services =>", services);

  useEffect(() => {
    handleNameTabChange(activeTab);
  }, [activeTab]);

  useEffect(() => {
    handleTabClick({ target: { id: "all" } });
  }, []);

  useEffect(() => {
    console.log("selectedService:", selectedService);
  }, [selectedService]);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };
  const handleNameTabChange = (index) => {
    if (categoryServices && categoryServices[index]) {
      setNameActiveTab(categoryServices[index].nameCategoryService);
    }
  };

  const handleThumbnailClick = (index, event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleCardClick = (service, event) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="content-section-services">
      <div className="slide-text" data-order="1">
        <h2>
          <span className="no-select">DESCUBRE NUESTROS </span>
        </h2>
        <h1>
          {" "}
          <span className="no-select-g">SERVICIOS</span>
        </h1>
        <div className="decoration-line"></div>
      </div>
      <div className="container">
        <div className="tabs">
          <button
            key="all"
            id="all"
            disabled={currentTab === "all"}
            onClick={handleTabClick}
          >
            Todos los servicios
          </button>
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
          {currentTab === "all" && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                width: "95%",
                margin: "auto",
              }}
            >
              <video
                controls={false}
                preload="metadata"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              >
                <source src={image.portafolio_video} type="video/mp4" />
                Tu navegador no soporta el tag de video.
              </video>
              <div>
                <a
                  href={image.portafolio}
                  download="Example-PDF-document"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="comic-button">DESCARGAR</button>
                </a>
              </div>
            </div>
          )}
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
                    width: "100%",
                  }}
                >
                  {services.map((service, i) => (
                    <div key={i}>
                      {service.categoryService === tab.nameCategoryService && (
                        <div
                          className="card"
                          onClick={(event) => handleCardClick(service, event)}
                        >
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
                                  <React.Fragment key={index}>
                                    <div
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
                                          width: "250px",
                                          objectFit: "cover",
                                          height: "95%",
                                          borderRadius: "10px",
                                          marginLeft: "10px",
                                          marginTop: "7px",
                                          marginBottom: "7px",
                                          filter: "grayScale(50%) blur(0.3px)",
                                        }}
                                      />
                                      <div className="card-footer">
                                        <h2>{service.name}</h2>
                                      </div>
                                    </div>
                                  </React.Fragment>
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
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        sx={{
          backdropFilter: "blur(5px)", // Add your backdrop styles here
        }}
      >
        <Fade in={modalOpen}>
          <div className="modal-paper">
            {selectedService && (
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    fontWeight: 600,
                  }}
                >
                  {selectedService.name}
                </h2>
                <h4
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    marginTop: "0",
                  }}
                >
                  categoría: <br/>{selectedService.categoryService}
                </h4>
                <img
                  src={`${baseApi}/${selectedService.photos[selectedImageIndex]}`}
                  alt="Selected Service"
                  className="modal-image-large"
                />
                <div className="thumbnail-container">
                  {selectedService.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`${baseApi}/${photo}`}
                      alt={`Thumbnail ${index}`}
                      className={`thumbnail ${
                        index === selectedImageIndex ? "active" : ""
                      }`}
                      onClick={(event) => handleThumbnailClick(index, event)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
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
