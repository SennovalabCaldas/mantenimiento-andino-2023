import React from "react";
import "./MakinaAndina.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";
import Footer from "../../../components/Shared/Footer/Footer";
import { ProductList } from "./ProductList";
import "./MakinaAndina.scss";
import { CubeOtherCompany } from "../LaMartina/CubeOtherCompany";
import { Divider, Grid, Paper } from "@mui/material";

export const MakinaAndina = () => {
  const products_makina_andina = [
    {
      id: 1,
      name: "Conexiones hidráulicas",
      cover: image.logo4,
      status: true,
    },
    {
      id: 2,
      name: "Grafadora hidraulica",
      cover: image.logo4,
      status: false,
    },
    {
      id: 3,
      name: "Comprensores para refrigeración",
      cover: image.logo4,
      status: true,
    },
    {
      id: 4,
      name: "Mangueras hidraulicas",
      cover: image.logo4,
      status: true,
    },
    {
      id: 5,
      name: "Adaptadores hidraulicas",
      cover: image.logo4,
      status: true,
    },
    {
      id: 6,
      name: "Todo tipo de repuestos para linea de refrigeración",
      cover: image.logo4,
      status: true,
    },
    {
      id: 7,
      name: "Correas y bandas",
      cover: image.logo4,
      status: true,
    },
    {
      id: 8,
      name: "Linea de refrigeración",
      cover: image.logo4,
      status: true,
    },
    {
      id: 9,
      name: "Todo tipo de repuesto para linea de procesamiento y sistemas de ventilación, aires acondicionados",
      cover: image.logo4,
      status: true,
    },
  ];
  return (
    <>
      <div className="title-makina-andina">
        <img src={image.logo4} alt="Logo Makina Andina" className="logo" />
        <h1>Makina Andina Ingeniería SAS</h1>
      </div>
      <Divider />
      <Grid
        container
        spacing={3}
        style={{ padding: "20px", justifyContent: "center" }}
      >
        <Grid item xs={6} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "20px 20px 20px 50px", textAlign: "center" }}
          >
            <p>
              Makina Andina Ingeniería SAS. Sociedad por Acciones Simplificada.
            </p>
            <p>
              <strong>Dirección: </strong>Calle 76A # 21 - 8. Manizales, Caldas.{" "}
              <strong>Correo contacto:</strong> makinaandinasas@gmail.com
            </p>
          </Paper>
        </Grid>
        <Grid item xs={3} md={3}>
          <Paper
            elevation={5}
            style={{ padding: "20px 20px 20px 50px", textAlign: "center" }}
          >
            <p>
              <strong>Descarga el portafolio de servicios </strong>
              <button className="buttonDownload">Download</button>
            </p>
          </Paper>
        </Grid>
      </Grid>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg} // Ruta de la miniatura de la imagen
          fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
        />
      </div>
      <ProductList
        products_makina_andina={products_makina_andina}
      ></ProductList>
      <CubeOtherCompany></CubeOtherCompany>
      <Footer></Footer>
    </>
  );
};
