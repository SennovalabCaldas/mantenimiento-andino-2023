import React from "react";
import "./WebClients.scss";
import { image } from "../../../assets";
import { ENV } from "../../../utils";

export const WebClients = ({ clients, testimonies }) => {
  const baseApi = ENV.BASE_PATH;
  console.log("testimonies que llegan a webclients", testimonies);
  const renderTestimonios = () => {
    return (
      <div className="testimonios-container">
        {testimonies.map((testimony, index) => (
          <div className="e-card playing" key={index}>
            <div className="image"></div>
            <div className="infotop">
              <img
                src={`${baseApi}/${testimony.avatar}`}
                alt={testimony.client}
                className="client-avatar"
              />
              <h2>{testimony.client}</h2>
              <div className="client-avatar-testimonie">
                <p>
                  <strong>{testimony.role}</strong>
                </p>
              </div>
              <p>{testimony.comment}</p>
              <div
                className="star-testimonie"
                style={{
                  zIndex: "9999",
                }}
              >
                {[...Array(testimony.evaluation)].map((star, index) => (
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

  return (
    <>
      <div className="section-clients">
        <div className="gallery gallery-cards">
          <div className="content panel">
            <div className="title-service">
              <h1>
                <strong>GRACIAS</strong>
                <br />
                A NUESTROS CLIENTES
              </h1>
            </div>
            <div className="images panel">
              <div className="column">
                {clients.map((client, index) => (
                  <div className="column-item" key={index}>
                    <img
                      src={`${baseApi}/${client.avatar}`}
                      alt={client.clientName}
                      className="client-avatar"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1>
              <span className="no-select-g">Testimonios</span>
            </h1>
          </div>
          <div className="content panel">{renderTestimonios()}</div>
        </div>
      </div>
    </>
  );
};
