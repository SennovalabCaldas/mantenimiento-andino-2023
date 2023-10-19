import React, { useRef, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Box,
  Tabs,
  Tab,
  Avatar,
  Modal,
  AvatarGroup,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Button,
} from "@mui/material";
import "./WebServices.scss";
import { image } from "../../../assets";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Chip from "@mui/material/Chip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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

const handleWhatsAppClick = (serviceName) => {
  const mensaje = encodeURIComponent(
    `¡Hola! Estás en contacto con Mantenimiento Andino SAS. Estamos encantados de que estés interesado en nuestros servicios. Si deseas conocer más acerca de nuestro servicio *${serviceName}*, por favor, no dudes en comunicarte con nosotros. Estamos aquí para ayudarte en lo que necesites. ¡Esperamos tu mensaje!`
  );
  const whatsappLink = `https://wa.me/573103833591?text=${mensaje}`;
  window.open(whatsappLink, "_blank");
};

const handleEmailClick = (serviceNameP) => {
  const serviceName = serviceNameP; // Reemplaza esto con el nombre real del servicio
  window.location.href = `mailto:mantenimientoandino@mantenimientoandino.co?subject=Consulta%20de%20Servicio:%20${serviceName}`;
};

export const ProductList = ({ categoryServices, services }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  console.log(categoryServices);

  const allServicesCategory = {
    _id: "todos",
    nameCategoryService: "Todos los Servicios",
  };
  const updatedCategoryServices = [allServicesCategory, ...categoryServices];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const mergedServices = [
    ...(services.length === 0 ? [] : services),
    ...defaultServicesMap.default1,
    ...defaultServicesMap.default2,
    ...defaultServicesMap.default3,
    ...defaultServicesMap.default4,
  ];

  const filteredServices = mergedServices.filter((service) =>
    selectedCategory === "todos"
      ? service.name.toLowerCase().includes(searchTerm.toLowerCase())
      : service.categoryService === selectedCategory &&
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCategoryChip = selectedCategory === "todos";
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <>
      <div className="product-list-container">
        <div className="product-list">
          <div className="category-tabs">
            {/* <ButtonGroup
              value={value}
              variant="contained"
              aria-label="outlined primary button group"
              onChange={handleChange}
              className="category-toggle-buttons" // Aplicando estilos elegantes
              color="primary" // Cambia el color de los botones según tus necesidades
              exclusive
            >
              {updatedCategoryServices.map((category) => (
                <Button
                  key={category._id}
                  value={category._id}
                  className="toggle-button" // Aplicando estilos elegantes
                >
                  {category.nameCategoryService}
                </Button>
              ))}
            </ButtonGroup> */}
          </div>

          <div className="product-cards">
            <Grid container spacing={3}>
              {filteredServices.map((service) => (
                <Grid
                  key={service._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className="product-item"
                >
                  <div class="notificationCard">
                    <div
                      class="notificationCardOverlay"
                    >
                      <div className="info-product">
                        <p class="notificationHeading">{service.name}</p>
                        <div className="download-portfolio">
                          <img
                            src={image.qrServices}
                            alt="QR"
                            style={{ width: "50px" }}
                          />
                          <p class="notificationPara">{service.description}</p>
                        </div>
                      </div>
                      <div class="buttonContainer">
                        <button class="AllowBtn">VER MÁS</button>
                        <button class="NotnowBtn">CONTACTAR</button>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};
