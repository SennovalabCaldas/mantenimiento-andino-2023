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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getServices } from "../../../actions/makinaAndinaActions";
import { useSelector } from "react-redux";

export const MakinaAndina = () => {
  const dispatch = useDispatch();
  const products_makina_andina = useSelector(
    (state) => state.makinaAndina.makinaAndinaServices
  );

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);
  console.log(products_makina_andina);

  return (
    <>
      <div className="title-makina-andina">
        <img src={image.logo4} alt="Logo Makina Andina" className="logo" />
        <h1>
          <strong>MAKINA ANDINA INGENIERÍA S.A.S</strong>
        </h1>
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
              <br />
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
              <br />

              <button className="buttonDownload">Download</button>
            </p>
          </Paper>
        </Grid>
      </Grid>
      <div className="back-to-mnto">
        <BackToMntoAndino
          thumbnailSrc={image.logomnbg}
          fullSrc={image.logoSennovalabNoC}
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
