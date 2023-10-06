import React, { useState } from "react";
import "./WebSuppliers.scss";
import { ENV } from "../../../utils/constants";
import { Modal, Typography } from "@mui/material";
import { image } from "../../../assets";
import { WebAliados } from "../WebAliados/WebAliados";

const WebSuppliers = ({ suppliers, allies }) => {
  const baseApi = ENV.BASE_PATH;
  const nationalSuppliers = suppliers.filter(
    (supplier) => supplier.national === true
  );
  const internationalSuppliers = suppliers.filter(
    (supplier) => supplier.national === false
  );

  return (
    <div className="content-web-supplier">
      <a className="title-mnto-andino" href="#">
        <span className="smaller-text">proveedores</span>nacionales e
        internacionales
      </a>
      <div className="division">
        <div className="division__item">
          {internationalSuppliers.map((supplier, index) => (
            <article>
              <header
                style={{
                  backgroundImage: `url(${image.logomn})`,
                }}
              ></header>
            </article>
          ))}
        </div>
        <div className="division__description-item">
          <Typography
            variant="h5"
            component="h3"
            className="division__description-item__title"
          >
            Proveedores Nacionales
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="division__description-item__text"
          >
            Lorem 
          </Typography>
        </div>
      </div>
      <div className="division">
        <div className="division__description-item">
          <Typography
            variant="h5"
            component="h3"
            className="division__description-item__title"
          >
            Proveedores Nacionales
          </Typography>
          <Typography
            variant="body1"
            component="p"
            className="division__description-item__text"
          >
            Lorem 
          </Typography>
        </div>
        <div className="division__item">
          {nationalSuppliers.map((supplier, index) => (
            <article>
              <header
                style={{
                  backgroundImage: `url(${image.logomn})`,
                }}
              ></header>
            </article>
          ))}
        </div>
      </div>
      <div className="division">
        <WebAliados allies={allies}></WebAliados>
      </div>
    </div>
  );
};

export default WebSuppliers;
