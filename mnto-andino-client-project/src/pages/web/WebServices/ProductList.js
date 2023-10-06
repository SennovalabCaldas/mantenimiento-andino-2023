import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import "./WebServices.scss";
import { image } from "../../../assets";

const defaultServicesMap = {
  default1: [
    {
      _id: "servicedefault1",
      name: "Construcción, mantenimiento y reparación de maquinaria industrial y obras civiles.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default1",
      photos: [image.service1],
    },
  ],
  default2: [
    {
      _id: "servicedefault2",
      name: "Construcción, adecuación y mantenimiento de Cavas para Refrigeración y Congelación.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default2",
      photos: [image.service1],
    },
    {
      _id: "servicedefault3",
      name: "Mantenimiento preventivo y correctivo de equipos",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default2",
      photos: [image.service1],
    },
  ],
  default3: [
    {
      _id: "servicedefault4",
      name: "Mantenimiento y adecuación de instalaciones eléctricas industriales.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default3",
      photos: [image.service1],
    },
    {
      _id: "servicedefault5",
      name: "Importación y venta de repuestos especializados.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default3",
      photos: [image.service1],
    },
    {
      _id: "servicedefault6",
      name: "Suministro e instalación de aires acondicionados.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default3",
      photos: [image.service1],
    },
  ],
  default4: [
    {
      _id: "servicedefault7",
      name: "Redes de frío, rack, condensadores, neveras autocontenidas, islas de refrigeración y congelación.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default4",
      photos: [image.service1],
    },
    {
      _id: "servicedefault8",
      name: "Diseño, cálculo, construcción y remanufactura de muebles.",
      description: "Descripción del Servicio Predeterminado 1",
      active: true,
      categoryService: "default4",
      photos: [image.service1],
    },
  ],
};

const handleDownloadClick = () => {
  const pdfUrl = image.portafolio;
  window.open(pdfUrl, "_blank");
};

export const ProductList = ({ categoryServices, services }) => {
  console.log(categoryServices);
  const allServicesCategory = {
    _id: "todos",
    nameCategoryService: "Todos los Servicios",
  };
  const updatedCategoryServices = [allServicesCategory, ...categoryServices];

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProductsByCategory = categoryServices.filter(
    (categoryService) =>
      categoryService.nameCategoryService
        .toLowerCase()
        .includes(selectedCategory.toLowerCase())
  );

  const mergedServices = [
    ...(services.length === 0 ? [] : services),
    ...defaultServicesMap.default1,
    ...defaultServicesMap.default2,
    ...defaultServicesMap.default3,
    ...defaultServicesMap.default4,
  ];

  const filteredServices = mergedServices.filter((service) =>
    selectedCategory
      ? service.categoryService === selectedCategory &&
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      : service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  return (
    <div className="product-list-container">
      <div className="productlist-mnto-adino">
        <a className="title-mnto-andino" href="#">
          <span className="smaller-text">portafolio</span>de servicios
        </a>
        <div className="item-tabs-horizontal">
          <Box
            sx={{ bgcolor: "background.paper", width: "100%" }}
            className="box-tabs-container"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              className="tabs-horizontal"
            >
              {updatedCategoryServices.map((categoryService, index) => (
                <Tab
                  key={categoryService._id}
                  label={categoryService.nameCategoryService}
                  onClick={() => {
                    if (categoryService._id === "todos") {
                      setSelectedCategory("");
                    } else {
                      handleCategoryClick(categoryService._id);
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </div>

        <div className="services-list-bycategory-section">
          <div className="services-list-bycategory-section-1">
            <Grid container spacing={3}>
              {filteredServices.map((service) => (
                <Grid
                  key={service._id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className="product-item"
                >
                  <img src={service.photos[0]} alt={service.name} />
                  <div
                    className={`status-avatar ${
                      service.active ? "available" : "unavailable"
                    }`}
                  >
                    {service.active ? "Disponible" : "No Disponible"}
                  </div>
                  <h3>{service.name}</h3>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="services-list-bycategory-section-2">
            <div className="productlist-search">
              <input
                type="text"
                placeholder="Buscar servicio por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="download-portfolio">
              <div>
                <p>
                  <strong>Portafolio de servicios</strong>
                </p>
              </div>
              <div>
                <button
                  className="buttonDownload"
                  onClick={handleDownloadClick}
                >
                  Descargar
                </button>
              </div>
            </div>
            <div className="download-portfolio">
              <img src={image.qrServices} alt="QR" style={{ width: "100px" }} />
            </div>
            <div className="download-portfolio">
              <img
                src={image.img1services}
                alt="Logo"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
