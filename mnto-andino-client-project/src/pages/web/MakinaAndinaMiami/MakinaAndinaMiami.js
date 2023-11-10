import React, { useEffect } from "react";
import "./MakinaAndinaMiami.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BackToMntoAndino } from "../../../components/Client/BackToMntoAndino/BackToMntoAndino";
import { image } from "../../../assets";
import Footer from "../../../components/Shared/Footer/Footer";
import { ProductListMakinaAndinaMiami } from "./ProductListMakinaAndinaMiami";
import { CubeOtherCompany } from "../LaMartina/CubeOtherCompany";
import { Divider, Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getServicesMakinaMiami } from "../../../actions/makinaAndinaMiamiActions";

export const MakinaAndinaMiami = () => {
  const dispatch = useDispatch();
  const products_makina_andina_miami = useSelector(
    (state) => state.makinaAndinaMiami.makinaAndinaMiamiServices
  );

  useEffect(() => {
    dispatch(getServicesMakinaMiami());
  }, [dispatch]);
  console.log(products_makina_andina_miami);
  return (
    <>
      <div className="title-makina-andina">
        <img src={image.logo3} alt="Logo Makina Andina" className="logo" />
        <h1>MAKINA ANDINA MIAMI S.A.S</h1>
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
      <ProductListMakinaAndinaMiami
        products_makina_andina_miami={products_makina_andina_miami}
      ></ProductListMakinaAndinaMiami>
      <CubeOtherCompany></CubeOtherCompany>
      <Footer></Footer>
    </>
  );
};
