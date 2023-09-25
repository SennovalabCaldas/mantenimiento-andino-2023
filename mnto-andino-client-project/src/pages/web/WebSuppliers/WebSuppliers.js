import React from "react";
import "./WebSuppliers.scss";
import { ENV } from "../../../utils/constants";

const WebSuppliers = ({ suppliers }) => {
  const baseApi = ENV.BASE_PATH;
  console.log(suppliers);
  const nationalSuppliers = suppliers.filter(
    (supplier) => supplier.national === true
  );
  const internationalSuppliers = suppliers.filter(
    (supplier) => supplier.national === false
  );
  console.log(nationalSuppliers);
  console.log(internationalSuppliers);

  return (
    <div className="content-web-section">
      <div className="division">
        <div className="division-title-section">
          <h1>Proveedores</h1>
        </div>
        <div className="division__item">
          {nationalSuppliers.map((supplier) => (
            <img
              src={`${baseApi}/${supplier.avatar}`}
              alt="Imagen 1"
              className="image"
            />
          ))}
        </div>
        <div className="division__item">
          {internationalSuppliers.map((supplier, index) => (
            <img
              src={`${baseApi}/${supplier.avatar}`}
              alt="Imagen 1"
              className="image"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSuppliers;
