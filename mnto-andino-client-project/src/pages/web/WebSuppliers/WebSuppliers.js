import React from "react";
import "./WebSuppliers.scss";
import { image } from "../../../assets";
const WebSuppliers = () => {
  return (
    <div className="suppliers-page">
      <div className="content-suppliers-page">
        <div className="suppliers-page__item">
          <div className="suppliers-page__item__img">
            <img src={image.logo} alt="" />
          </div>
          <div className="suppliers-page__item__info">
            <h3>Proveedor 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia voluptate quod
            </p>
            <button>Conoce más</button>
          </div>
        </div>
        <div className="suppliers-page__item">
          <div className="suppliers-page__item__img">
            <img src={image.logo} alt="" />
          </div>
          <div className="suppliers-page__item__info">
            <h3>Proveedor 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia voluptate quod
            </p>
            <button>Conoce más</button>
          </div>
        </div>
        <div className="suppliers-page__item">
          <div className="suppliers-page__item__img">
            <img src={image.logo} alt="" />
          </div>
          <div className="suppliers-page__item__info">
            <h3>Proveedor 1</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatum, quibusdam, voluptates, quia voluptate quod
            </p>
            <button>Conoce más</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSuppliers;
