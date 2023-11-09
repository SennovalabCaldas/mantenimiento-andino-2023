import React, { useEffect, useState } from "react";
import { ProductList } from "./ProductList";
import { image } from "../../../assets";
import "./WebServices.scss";


export const WebServices = ({ categoryServices, services }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [nameActiveTab, setNameActiveTab] = useState("Todos los servicios");

  const handleTabChange = (index) => {
    setActiveTab(index);
    handleNameTabChange(index);
  };

  const handleNameTabChange = (index) => {
    const categoryName = categoryServices[index].nameCategoryService;
    setNameActiveTab(categoryName);
  };



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
                {categoryServices.map((category, index) => (
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
                categoryServices={categoryServices}
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
