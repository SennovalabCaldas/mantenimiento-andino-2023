import React from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Typography, Container, Box } from "@mui/material";
import { image } from "../../../assets";
import { BackToMntoAndino } from "../../Client/BackToMntoAndino/BackToMntoAndino";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export const NotFound = () => {
  return (
    <>
      <Container>
        <div className="back-to-mnto">
          <BackToMntoAndino
            thumbnailSrc={image.logomnbg} // Ruta de la miniatura de la imagen
            fullSrc={image.logoSennovalabNoC} // Ruta de la imagen completa
          />
        </div>
        <StyledContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" paragraph>
            Lo sentimos, página no encontrada!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Lo sentimos, no pudimos encontrar la página que buscas. Revisa la
            URL o haz click en el botón de abajo para volver a la página
            principal.
          </Typography>

          <Box
            component="img"
            src={image.errorPage}
            sx={{ height: 400, mx: "auto", my: { xs: 5, sm: 10 } }}
          />
        </StyledContent>
      </Container>
    </>
  );
};
