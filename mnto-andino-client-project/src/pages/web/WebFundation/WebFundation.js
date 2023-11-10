import React from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";

export const WebFundation = ({ profiles }) => {
  console.log("profiles =>", profiles);
  return (
    <>
      <div
        style={{
          width: "25%",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.5s ease-in-out",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
          paddingLeft: "20px",
        }}
        data-order="1"
      >
        <h1>
          {" "}
          <span
            className="no-select-g"
            style={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: "30px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            TRABAJA
          </span>
        </h1>
        <br />
        <h2>
          <span
            className="no-select"
            style={{
              color: "#000000",
              fontWeight: "bold",
              fontSize: "20px",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textAlign: "center",
            }}
          >
            CON NOSOTROS
          </span>
        </h2>
        <h3>
          <strong>
            <em> Haz parte de este gran equipo</em>
          </strong>
        </h3>
        <h2>
          <span className="no-select">MANTENIMIENTO ANDINO</span>
        </h2>
      </div>
      <div
        style={{
          width: "70%",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.5s ease-in-out",
          flexDirection: "column",
          alignContent: "center",
          flexWrap: "wrap",
          paddingLeft: "20px",
        }}
      >
        {profiles.map((profile) => (
          <Card
            variant="outlined"
            style={{ padding: "20px", maxWidth: "345px", margin: "auto" }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {profile.profileName}
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body1">
                <strong>Ofrecemos:</strong>
                <ul>
                  <li>{profile.feature1}</li>
                  <li>{profile.feature2}</li>
                  <li>{profile.feature3}</li>
                  <li>{profile.feature4}</li>
                  <li>
                    Contratación directa con la empresa con prestaciones de ley
                  </li>
                </ul>
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body1">
                <strong
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Para más información sobre la vacante y los perfiles
                  requeridos, por favor contacta a:
                </strong>
                <ul>
                  <li>Número de celular:{profile.contact_telephone}</li>
                  <li>Correo Electrónico: {profile.email}</li>
                  <li>WhatsApp: {profile.contact_whatsApp}</li>
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
        ))}
      </div>
    </>
  );
};
