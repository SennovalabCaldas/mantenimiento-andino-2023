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
  // const cardData = [
  //   {
  //     title: "Panel de control",
  //     link: "/admin/dashboard",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Usuarios registrados",
  //     link: "/admin/users",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Sedes",
  //     link: "/admin/sedes",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Servicios",
  //     link: "/admin/services",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Noticias",
  //     link: "/admin/news",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Clientes",
  //     link: "/admin/clients",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Proveedores",
  //     link: "/admin/suppliers",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Aliados",
  //     link: "/admin/allies",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Proyectos",
  //     link: "/admin/projects",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Certificaciones",
  //     link: "/admin/certifications",
  //     background: `url(${image.background})`,
  //   },
  //   {
  //     title: "Fundación",
  //     link: "/admin/foundation",
  //     background: `url(${image.background})`,
  //   },
  // ];

  return (

    <div
      style={{
        display: "flex",
        paddingRight: "15px",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Grid container spacing={2} >
        <Grid item xs={6} md={8}>
          <div
            style={{
              backgroundImage: `url(${image.menu1})`,
              backgroundSize: "cover",
              width: "100%",
             
              height: "150px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                padding: "30px",
                borderRadius: "10px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              <h5>
                ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
              </h5>
              <Chip
                style={{ backgroundColor: "#ffffffc2" }}
                avatar={
                  <Avatar
                    alt={userAuth.firstname}
                    src={`${baseApi}/${userAuth.avatar}`}
                  />
                }
                label={`Rol ${userAuth.role}`}
              />
            </div>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu2})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu3})`,
                  backgroundSize: "cover",
                  
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu4})`,
                  backgroundSize: "cover",
                  
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={4}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              backgroundImage: `url(${image.menu5})`,
              backgroundSize: "cover",
            }}
          >
            <div
              style={{
                background: "#00000040",
                borderRadius: "10px",
                display: "flex",
                padding: "30px",
              }}
            >
              <div
                style={{
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "30px",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={image.logoSennovalabNoC}
                  style={{ width: "100px", height: "100px" }}
                />
                <Typography
                  variant="h8"
                  style={{ color: "black", textAlign: "center" }}
                >
                  <p>SENNOVALAB</p>
                </Typography>
                <Typography
                  style={{ color: "black", textAlign: "center", fontSize: 12 }}
                >
                  <p>Linea de desarrollo de Software</p>
                </Typography>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ margin: "15px" }}>
        <Grid item xs={6} md={4}>
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              backgroundImage: `url(${image.menu5})`,
              backgroundSize: "cover",
            }}
          >
            <div
              style={{
                background: "#00000040",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid container spacing={2} >
                <Grid item xs={6} md={4}>
                  <img
                    src={image.logoSennovalabNoC}
                    alt="Logo Sennovalab"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <img
                    src={image.logoSennovalabNoC}
                    alt="Logo Sennovalab"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item xs={6} md={4}>
                  <img
                    src={image.logoSennovalabNoC}
                    alt="Logo Sennovalab"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <img
                    src={image.logoSennovalabNoC}
                    alt="Logo Sennovalab"
                    style={{ width: "100px", height: "100px" }}
                  />
                </Grid>
              </Grid>
             
            </div>
          </Card>
          
        </Grid>
        <Grid item xs={6} md={8}>
          <Grid container spacing={2} style={{ marginBottom: "10px" }}>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu6})`,
                  backgroundSize: "cover",
                  
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu7})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu8})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu5})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu4})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={4}>
              <div
                style={{
                  width: "100%",
                  backgroundImage: `url(${image.menu3})`,
                  backgroundSize: "cover",
                 
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <div
                  style={{
                    padding: "30px",
                    borderRadius: "10px",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  <h5>
                    ¡Bienvenido {userAuth.firstname} {userAuth.lastname}!
                  </h5>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
