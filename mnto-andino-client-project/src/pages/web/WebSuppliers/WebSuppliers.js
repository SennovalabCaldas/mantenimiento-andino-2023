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
        <span className="smaller-text">proveedores</span>nacionales e internacionales
      </a>
      <div className="division">
        <div className="division__item">
          {internationalSuppliers.map((supplier, index) => (
            <article>
              <header
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80')`,
                }}
              >
                <div className="lower-header">
                  <h1 className="title">{supplier.supplierName}</h1>
                </div>
              </header>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            imperdiet ut quam sit amet vehicula. Donec vel nunc eget dolor
            vestibulum ultricies. Sed euismod, est nec ornare ultrices, urna
            magna consectetur nunc, eu ultricies nunc dolor ac nisi. Nulla
            facilisi. Nulla facilisi. Morbi eget nunc non enim semper
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            imperdiet ut quam sit amet vehicula. Donec vel nunc eget dolor
            vestibulum ultricies. Sed euismod, est nec ornare ultrices, urna
            magna consectetur nunc, eu ultricies nunc dolor ac nisi. Nulla
            facilisi. Nulla facilisi. Morbi eget nunc non enim semper
          </Typography>
        </div>
        <div className="division__item">
          {nationalSuppliers.map((supplier, index) => (
            <article>
              <header
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80')`,
                }}
              >
                <div className="lower-header">
                  <h1 className="title">{supplier.supplierName}</h1>
                </div>
              </header>
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
