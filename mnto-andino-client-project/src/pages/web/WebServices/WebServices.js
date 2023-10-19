import React, { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { image } from "../../../assets";
import "./WebServices.scss";
import { Autocomplete, Grid, Stack, TextField } from "@mui/material";
import { Projects } from "../WebProjects/Projects";

const defaultCategories = [
  {
    _id: "default1",
    nameCategoryService: "Obra civil y mantenimiento",
    descriptionCategoryService: "Descripción del Servicio Predeterminado 1",
    active: true,
    evaluacion: 5,
    avatar: image.service1,
  },
  {
    _id: "default2",
    nameCategoryService: "Construcción y adecuación",
    descriptionCategoryService: "Descripción del Servicio Predeterminado 2",
    active: true,
    evaluacion: 5,
    avatar: image.service1,
  },
  {
    _id: "default3",
    nameCategoryService: "Suministro e instalación",
    descriptionCategoryService: "Descripción del Servicio Predeterminado 3",
    active: true,
    evaluacion: 5,
    avatar: image.service1,
  },
  {
    _id: "default4",
    nameCategoryService: "Redes de frio y refrigeración",
    descriptionCategoryService: "Descripción del Servicio Predeterminado 4",
    active: true,
    evaluacion: 5,
    avatar: image.service1,
  },
];

export const WebServices = ({ categoryServices, services }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const uniqueCategories = [
    ...new Set([
      ...defaultCategories.map((category) => category.nameCategoryService),
      ...(categoryServices || []).map(
        (category) => category.nameCategoryService
      ),
    ]),
  ];

  const mergedCategories = uniqueCategories
    .map((categoryName) => {
      const category =
        categoryServices?.find(
          (category) => category.nameCategoryService === categoryName
        ) ||
        defaultCategories.find(
          (category) => category.nameCategoryService === categoryName
        );

      return category;
    })
    .filter((category) => category);

  const handleDownloadClick = () => {
    const pdfUrl = image.portafolio;
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="content-section-services">
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="slide" data-order="1">
            <h2>
              <span className="no-select">
                conoce nuestro portafolio de servicios
              </span>
            </h2>
            <a className="button" href="#">
              <span className="no-select">ESCANEA EL CÓDIGO QR</span>
            </a>
          </div>
          <div className="images panel">
           <ProductList categoryServices={mergedCategories} services={services} />
          </div>
        </div>
      </div>
    </div>
  );
};
