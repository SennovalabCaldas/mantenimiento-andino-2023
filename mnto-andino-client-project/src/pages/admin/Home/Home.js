import React, { useEffect } from "react";
import { image } from "../../../assets/";
import { Grid, Card, Typography, Avatar, Chip } from "@mui/material";
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación
import "./Home.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ENV } from "../../../utils";

export const Home = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth.user);
  console.log(userAuth);
  const baseApi = ENV.BASE_PATH;
  const cardData = [
    {
      title: "Panel de control",
      link: "/admin/dashboard",
      background: `url(${image.background})`,
    },
    {
      title: "Usuarios registrados",
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
      title: "Noticias",
      link: "/admin/news",
      background: `url(${image.background})`,
    },
    {
      title: "Clientes",
      link: "/admin/clients",
      background: `url(${image.background})`,
    },
    {
      title: "Proveedores",
      link: "/admin/suppliers",
      background: `url(${image.background})`,
    },
    {
      title: "Aliados",
      link: "/admin/allies",
      background: `url(${image.background})`,
    },
    {
      title: "Proyectos",
      link: "/admin/projects",
      background: `url(${image.background})`,
    },
    {
      title: "Certificaciones",
      link: "/admin/certifications",
      background: `url(${image.background})`,
    },
    {
      title: "Fundación",
      link: "/admin/foundation",
      background: `url(${image.background})`,
    },
  ];

  return (
    <div className="home">
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link to={card.link}>
              <Card
                className="card"
                style={{
                  backgroundImage: card.background,
                }}
              >
                <Typography variant="h6" className="card-title">
                  {card.title}
                </Typography>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
