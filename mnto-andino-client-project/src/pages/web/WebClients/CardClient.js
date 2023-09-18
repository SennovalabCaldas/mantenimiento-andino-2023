import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { image } from "../../../assets"; // Asegúrate de importar tus imágenes
import "./CardClient.scss";
import { Grid } from "@material-ui/core";
import { Mapa } from "../../../components/GeneralLayout";
const clientData = [
  {
    id: 1,
    name: "Mercaldas",
    description: "Desde: ",
    image: image.Mercaldas, // Reemplaza con la ruta correcta a tu imagen
  },
  {
    id: 2,
    name: "Rational",
    description: "Desde",
    image: image.Rational,
  },
  {
    id: 1,
    name: "Juan Valdez",
    description: "Desde: ",
    image: image.juanvaldez, // Reemplaza con la ruta correcta a tu imagen
  },
  {
    id: 2,
    name: "Ani",
    description: "Desde",
    image: image.ani,
  },
  {
    id: 2,
    name: "Súper de Alimentos",
    description: "Desde",
    image: image.superal,
  },
  {
    id: 1,
    name: "Ara",
    description: "Desde: ",
    image: image.ara, // Reemplaza con la ruta correcta a tu imagen
  },
  {
    id: 2,
    name: "Carulla",
    description: "Desde",
    image: image.carulla,
  },
  {
    id: 1,
    name: "Consorcio",
    description: "Desde: ",
    image: image.consorcio, // Reemplaza con la ruta correcta a tu imagen
  },
  {
    id: 2,
    name: "Grupo Éxito",
    description: "Desde",
    image: image.exito,
  },
  // Agrega más datos de clientes según sea necesario
];

export const CardClient = () => {
  return (
    <div className="client-container">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="map">
            <Mapa></Mapa>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className="division">
            {/* Tarjetas de clientes aquí */}
            {clientData.map((client, index) => (
              <Card
                className="client-card"
                elevation={index + 1}
                key={client.id}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={client.image}
                  alt={client.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {client.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
