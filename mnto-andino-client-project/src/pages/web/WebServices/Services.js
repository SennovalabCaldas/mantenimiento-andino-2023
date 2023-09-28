import { useState } from "react";
import "./Services.scss";
import { ENV } from "../../../utils/constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { image } from "../../../assets";

export const Services = ({ categoryServices, services }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [mostrarServiciosAdicionales, setMostrarServiciosAdicionales] =
    useState(false);
  const [serviciosRelacionados, setServiciosRelacionados] = useState({});
  const baseApi = ENV.BASE_PATH;

  const [active, setActive] = useState(0);
  if (categoryServices.length === 0) {
    categoryServices = [
      {
        _id: "default1",
        nameCategoryService: "Obra civil y mantenimiento",
        descriptionCategoryService: "Descripción del Servicio Predeterminado 1",
        active: true,
        avatar: image.service1,
      },
      {
        _id: "default2",
        nameCategoryService: "Construcción y adecuación",
        descriptionCategoryService: "Descripción del Servicio Predeterminado 2",
        active: true,
        avatar: image.service1,
      },
      {
        _id: "default3",
        nameCategoryService: "Suministro e instalación",
        descriptionCategoryService: "Descripción del Servicio Predeterminado 1",
        active: true,
        avatar: image.service1,
      },
      {
        _id: "default4",
        nameCategoryService: "Construcción y adecuación",
        descriptionCategoryService: "Descripción del Servicio Predeterminado 2",
        active: true,
        avatar: image.service1,
      },
    ];
  }

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
      // Agrega otros servicios predeterminados para default1 aquí
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

  const toggleMostrarServicios = (categoryId) => {
    console.log("categoryId", categoryId);
    const serviciosFiltrados = services.filter(
      (servicio) => servicio.categoryService === categoryId
    );
    setServiciosRelacionados(serviciosFiltrados);
    setMostrarServiciosAdicionales(true);
  };

  const artists = categoryServices.map((category) => ({
    _id: category._id,
    name: category.nameCategoryService,
    description: category.descriptionCategoryService,
    spotify: category.active,
    backgroundUrl: `${baseApi}/${category.avatar}`,
  }));

  const handleSlideChange = (index) => {
    setActive(index);
  };

  const nextSlide = () => {
    if (active < artists.length - 1) {
      setActive(active + 1);
    }
  };

  const prevSlide = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="service-section">
      <ul className="artists-list">
        {artists.map((artist, i) => (
          <li
            key={i}
            className={`artist-item ${active === i ? "active" : ""}`}
            style={{ backgroundImage: `url(${artist.backgroundUrl})` }}
            onClick={() => {
              handleSlideChange(i);
              toggleMostrarServicios(artist._id);
              setShowQRCode(true);
            }}
          >
            <h3>{artist.name}</h3>
            <div className={`section-content ${active === i ? "active" : ""}`}>
              <div className="inner">
                <div className="bio">
                  <h2>{artist.name}</h2>
                  <p>{artist.description}</p>
                  <div>
                    {showQRCode && (
                      <img
                        src={image.qrServices}
                        alt="Código QR"
                        className="codigo-qr"
                      />
                    )}
                    {mostrarServiciosAdicionales && (
                      <div className="service-category-description">
                        {services.length === 0
                          ? // Si categoryServices está vacío, muestra servicios predeterminados
                            defaultServicesMap[artist._id].map(
                              (servicio, index) => (
                                <Card sx={{ maxWidth: 200 }} key={index}>
                                  <CardActionArea>
                                    {servicio.photos.map(
                                      (photo, photoIndex) => (
                                        <CardMedia
                                          component="img"
                                          height="140"
                                          image={photo}
                                          alt="green iguana"
                                          key={photoIndex}
                                        />
                                      )
                                    )}
                                    <CardContent>
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        className="service-name-typography"
                                      >
                                        {servicio.name}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              )
                            )
                          : serviciosRelacionados.map((servicio, index) => (
                              <Card sx={{ maxWidth: 345 }} key={index}>
                                <CardActionArea>
                                  {servicio.photos.map((photo, photoIndex) => (
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      image={`${baseApi}/${photo}`}
                                      alt="green iguana"
                                      key={photoIndex}
                                    />
                                  ))}
                                  <CardContent>
                                    <Typography
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {servicio.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {servicio.description}
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                              </Card>
                            ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="button-container">
        <button className="prev-button" onClick={prevSlide}>
          Anterior
        </button>
        <button className="next-button" onClick={nextSlide}>
          Siguiente
        </button>
      </div>
    </div>
  );
};
