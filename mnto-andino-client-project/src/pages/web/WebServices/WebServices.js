import React, { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { image } from "../../../assets";
import "./WebServices.scss";

const defaultCategories = [
  {
    _id: "todos",
    nameCategoryService: "Todos los servicios",
    descriptionCategoryService: "Descripción del Servicio Predeterminado 1",
    active: true,
    evaluacion: 5,
    avatar: image.service1,
  },
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
  const [activeTab, setActiveTab] = useState(0);
  const [nameActiveTab, setNameActiveTab] = useState("Todos los servicios");

  const uniqueCategories = [
    ...new Set([
      ...defaultCategories.map((category) => category.nameCategoryService),
      ...(categoryServices || []).map(
        (category) => category.nameCategoryService
      ),
    ]),
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
    handleNameTabChange(index);
  };

  const handleNameTabChange = (index) => {
    const categoryName = mergedCategories[index].nameCategoryService;
    setNameActiveTab(categoryName);
  };

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

  return (
    <div className="content-section-services">
      <h1>CONOCE NUESTRO PORTAFOLIO DE SERVICIOS</h1>
      <div className="gallery gallery-cards">
        <div className="content panel">
          <div className="images panel">
            <div className="container">
              <div
                className="tabs"
                style={{
                  display: "flex",
                  width: "100%",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {mergedCategories.map((category, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`radio-${index + 1}`}
                      name="tabs"
                      checked={index === activeTab}
                      onChange={() => handleTabChange(index)} // Manejar el cambio de tab
                    />
                    <label className="tab" htmlFor={`radio-${index + 1}`}>
                      {category.nameCategoryService}
                    </label>
                  </div>
                ))}
                <span className="glider"></span>
              </div>
            </div>
            <div className="container-listproducts">
              <ProductList
                categoryServices={mergedCategories}
                services={services}
                activeTab={activeTab}
                nameActiveTab={nameActiveTab}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
