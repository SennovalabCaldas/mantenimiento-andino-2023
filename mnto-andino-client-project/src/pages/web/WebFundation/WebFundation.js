import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

export const WebFundation = () => {
  return (
    <>
      <div className="upper-header">
        <div className="mini-title">CONTÁCTANOS</div>
      </div>
      <Card
        variant="outlined"
        style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Vacante: Tecnologo en Mantenimiento
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Typography variant="body1">
            <strong>Ofrecemos:</strong>
            <ul>
              <li>Estabilidad laboral</li>
              <li>Nuevos conocimientos</li>
              <li>Excelente ambiente laboral</li>
              <li>
                Contratación directa con la empresa con prestaciones de ley
              </li>
            </ul>
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Typography variant="body1">
            Para más información sobre la vacante y los perfiles requeridos, por
            favor contacta a:
            <ul>
              <li>Número de celular: 300 842 6136</li>
              <li>Correo Electrónico: gerenciamantenimientoandino@gmail.com</li>
              <li>WhatsApp: 300 842 6136</li>
            </ul>
          </Typography>
          <Divider style={{ margin: "10px 0" }} />
          <Grid container justifyContent="center">
            <Button variant="contained" color="primary">
              Solicitar más información
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
