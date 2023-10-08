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

      <div className="division">
        <WebAliados allies={allies}></WebAliados>
      </div>
    </div>
  );
};

export default WebSuppliers;
