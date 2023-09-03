import React from "react";
import { image } from "../../../assets/";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación
import "./Home.scss";

export const Home = () => {
  const cardData = [
    { title: "Home", link: "/admin/home", background: `url(${image.background})` },
    { title: "Menú", link: "/admin/menu", background: `url(${image.background})` },
    {
      title: "Empleados",
      link: "/admin/users",
      background: `url(${image.background})`,
    },
    {
      title: "Sedes",
      link: "/admin/sedes",
      background: `url(${image.background})`,
    },
    {
      title: "Servicios",
      link: "/admin/services",
      background: `url(${image.background})`,
    },
    {
      title: "Clientes",
      link: "/admin/clients",
      background: `url(${image.background})`,
    },
    {
      title: "Proveedores",
      link: "/admin/providers",
      background: `url(${image.background})`,
    },
    {
      title: "Noticias",
      link: "/admin/news",
      background: `url(${image.background})`,
    },
    {
      title: "Certificaciones",
      link: "/admin/certifications",
      background: `url(${image.background})`,
    },
  ];

  return (
    <div className="users-page">
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {cardData.map((card) => (
            <Grid item xs={12} md={4} key={card.title}>
              <Card
                className="dashboard-card"
                style={{
                  backgroundImage: card.background,
                }}
              >
                <CardContent>
                  <Typography variant="h6" className="card-title">
                    {card.title}
                  </Typography>
                  <Button
                    component={Link}
                    to={card.link}
                    variant="contained"
                    color="primary"
                    className="card-button"
                  >
                    Ir a {card.title}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
